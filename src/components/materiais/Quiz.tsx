"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, RotateCcw, ArrowRight } from "lucide-react";
import { parseQuiz, type QuizData } from "@/lib/quizParser";
import InlineMarkdown from "./InlineMarkdown";

type OptionStatus = "correct" | "incorrect" | "missed" | null;

interface QuestionResult {
  correct: boolean;
  chosen: number[];
}

function SingleQuiz({
  data,
  onSubmit,
}: {
  data: QuizData;
  onSubmit: (result: QuestionResult) => void;
}) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const isMultiple = data.tipo === "multiple";

  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = selected.length > 0 && !submitted;

  const toggleOption = (index: number) => {
    if (submitted) return;
    setSelected((prev) =>
      isMultiple
        ? prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
        : [index]
    );
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    const correctIndices = data.opcoes
      .map((o, i) => (o.correta ? i : -1))
      .filter((i) => i !== -1);
    const isCorrect =
      correctIndices.length === selected.length &&
      correctIndices.every((i) => selected.includes(i));
    onSubmit({ correct: isCorrect, chosen: selected });
  };

  // Enter para enviar
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || submitted || selected.length === 0) return;
      e.preventDefault();
      if (!canSubmit) return;
      setSubmitted(true);
      const correctIndices = data.opcoes
        .map((o, i) => (o.correta ? i : -1))
        .filter((i) => i !== -1);
      const isCorrect =
        correctIndices.length === selected.length &&
        correctIndices.every((i) => selected.includes(i));
      onSubmit({ correct: isCorrect, chosen: selected });
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [selected, submitted, canSubmit, data.opcoes, onSubmit]);

  const getStatus = (index: number, correta: boolean | undefined): OptionStatus => {
    if (!submitted) return null;
    const wasPicked = selected.includes(index);
    if (wasPicked && correta) return "correct";
    if (wasPicked && !correta) return "incorrect";
    if (!wasPicked && correta) return "missed";
    return null;
  };

  return (
    <div ref={containerRef}>
      <h4
        id={`${id}-question`}
        className="font-poppins font-semibold text-base md:text-[17px] text-white mb-4 leading-snug"
      >
        <InlineMarkdown content={data.pergunta} />
      </h4>

      <div
        role={isMultiple ? "group" : "radiogroup"}
        aria-labelledby={`${id}-question`}
        className="space-y-2"
      >
        {data.opcoes.map((opcao, i) => {
          const isSelected = selected.includes(i);
          const status = getStatus(i, opcao.correta);
          const showExplanation = !!status && !!opcao.explicacao;
          const isElevated = isSelected || status === "correct" || status === "incorrect";

          const containerClass = isElevated
            ? "bg-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.3)] ring-1 ring-white/10"
            : "bg-slate-800/40 hover:bg-slate-800/60";

          let iconNode: React.ReactNode;
          if (isSelected) {
            const iconBg =
              status === "correct"
                ? "bg-VerdeMenta"
                : status === "incorrect"
                  ? "bg-red-500"
                  : "bg-white";
            const iconStroke =
              status === "correct" || status === "incorrect"
                ? "text-white"
                : "text-AzulMeiaNoite";
            iconNode = (
              <span className={`w-5 h-5 rounded-full flex items-center justify-center ${iconBg}`}>
                <Check className={`w-3 h-3 ${iconStroke}`} strokeWidth={3.5} />
              </span>
            );
          } else {
            iconNode = (
              <span className="w-5 h-5 rounded-full border-[1.5px] border-slate-500 block" />
            );
          }

          let label: React.ReactNode = null;
          if (status === "correct") {
            label = <span className="text-sm font-semibold text-VerdeMenta">Correto</span>;
          } else if (status === "incorrect") {
            label = <span className="text-sm font-semibold text-red-400">Incorreto</span>;
          } else if (status === "missed") {
            label = (
              <span className="text-sm font-semibold text-slate-400">
                Resposta correta
              </span>
            );
          }

          return (
            <div key={i}>
              <button
                type="button"
                role={isMultiple ? "checkbox" : "radio"}
                aria-checked={isSelected}
                onClick={() => toggleOption(i)}
                disabled={submitted}
                className={`w-full text-left rounded-xl px-4 py-3.5 flex items-center gap-3.5 transition-all duration-150 ${containerClass} ${
                  submitted ? "cursor-default" : "cursor-pointer"
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-AzulEletrico/40`}
              >
                <span className="shrink-0">{iconNode}</span>
                <span
                  className="flex-1 text-[15px] text-slate-100 font-inter"
                  style={{ fontWeight: 450, lineHeight: "1.5" }}
                >
                  <InlineMarkdown content={opcao.texto} inline />
                </span>
                {label && <span className="shrink-0 ml-2">{label}</span>}
              </button>

              {showExplanation && (
                <div
                  className="mt-1.5 ml-9 mr-4 mb-1 text-[13.5px] font-inter text-slate-300"
                  style={{ lineHeight: "1.6", fontWeight: 450 }}
                >
                  <InlineMarkdown content={opcao.explicacao!} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-3">
        {!submitted ? (
          <>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="px-3.5 py-1.5 rounded-md bg-white text-AzulMeiaNoite text-sm font-semibold font-inter shadow-sm hover:bg-slate-100 disabled:bg-slate-700 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed transition-colors"
            >
              Enviar
            </button>
            {canSubmit && (
              <span className="text-xs text-slate-400 font-inter">
                ou pressione Enter
              </span>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

function ResultScreen({
  questions,
  results,
  onRetry,
}: {
  questions: QuizData[];
  results: QuestionResult[];
  onRetry: () => void;
}) {
  const score = results.filter((r) => r.correct).length;
  const total = questions.length;
  const pct = Math.round((score / total) * 100);

  const isGreat = pct === 100;
  const isGood = pct >= 70;
  const title = isGreat ? "Perfeito!" : isGood ? "Muito bom!" : pct >= 40 ? "Continue praticando" : "Revise o conteúdo";
  const desc = isGreat
    ? "Você acertou tudo. Está pronto para avançar!"
    : isGood
      ? "Ótimo desempenho! Revise as questões erradas antes de continuar."
      : pct >= 40
        ? "Você está no caminho certo. Releia o conteúdo e tente novamente."
        : "Recomendamos rever a aula antes de continuar.";
        
  const R = 36;
  const circ = 2 * Math.PI * R;
  const dash = circ * (pct / 100);
  const ringColor = isGreat ? "#22c55e" : isGood ? "#3b82f6" : pct >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <div className="my-2">
      {/* Score ring */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="relative w-24 h-24">
          <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
            <circle cx="48" cy="48" r={R} fill="none" stroke="currentColor"
              className="text-slate-700" strokeWidth="8" />
            <circle cx="48" cy="48" r={R} fill="none" stroke={ringColor} strokeWidth="8"
              strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
              style={{ transition: "stroke-dasharray .6s cubic-bezier(.4,0,.2,1)" }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Ajustado de text-2xl para text-[20px] para melhor proporção interna */}
            <span className="text-[20px] font-bold text-white font-poppins leading-none">
              {pct}%
            </span>
            {/* Diminuído levemente o contador para harmonizar o espaço */}
            <span className="text-[10px] text-slate-400 font-inter mt-0.5">
              {score}/{total}
            </span>
          </div>
        </div>

        <div className="text-center">
          <p className="font-poppins font-semibold text-lg text-white">
            {title}
          </p>
          <p className="text-sm font-inter text-slate-400 mt-0.5 max-w-xs">
            {desc}
          </p>
        </div>

        <div className="flex gap-2">
          <span className="text-xs font-semibold font-inter px-3 py-1 rounded-full bg-green-950/40 text-green-400 border border-green-900/50">
            {score} corretas
          </span>
          <span className="text-xs font-semibold font-inter px-3 py-1 rounded-full bg-red-950/40 text-red-400 border border-red-900/50">
            {total - score} erradas
          </span>
        </div>
      </div>

      {/* Revisão por questão */}
      <div className="border-t border-slate-700 pt-4 space-y-2">
        {questions.map((q, i) => {
          const r = results[i];
          return (
            <div key={i} className="flex items-start gap-2.5 text-sm font-inter">
              <span
                className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                  r.correct ? "bg-green-500" : "bg-red-400"
                }`}
              />
              <span className="text-slate-300" style={{ fontWeight: 450 }}>
                {q.pergunta}
              </span>
            </div>
          );
        })}
      </div>

      {/* Refazer */}
      <div className="mt-5">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold font-inter text-slate-200 border border-slate-700 hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Refazer quiz
        </button>
      </div>
    </div>
  );
}

export function QuizBlock({ rawYaml }: { rawYaml: string }) {
  const result = parseQuiz(rawYaml);

  if (!result.success) {
    return (
      <div className="my-6 border-2 border-red-400 dark:border-red-600 rounded-xl p-4 bg-red-50 dark:bg-red-950/20">
        <p className="font-semibold text-red-700 dark:text-red-400 text-sm mb-1">Erro no quiz</p>
        <p className="text-red-600 dark:text-red-300 text-sm">{result.error}</p>
        <pre className="mt-2 text-xs bg-red-100 dark:bg-red-900/30 p-2 rounded overflow-x-auto text-red-800 dark:text-red-200">
          {rawYaml}
        </pre>
      </div>
    );
  }

  const questions = result.data;
  const isSingle = questions.length === 1;

  return (
    <div className="my-8 bg-[#0B1230] p-6 md:p-8 rounded-xl shadow-md border border-slate-800 text-white">
      {/* Título integrado diretamente dentro do container destacado */}
      <h3 className="font-poppins font-bold text-lg md:text-xl text-white mb-6 border-b border-slate-800 pb-3 opacity-95">
        Teste seu Conhecimento
      </h3>
      
      {isSingle ? (
        <SingleQuiz data={questions[0]} onSubmit={() => {}} />
      ) : (
        <MultiQuiz questions={questions} />
      )}
    </div>
  );
}

function MultiQuiz({ questions }: { questions: QuizData[] }) {
  const [cur, setCur] = useState(0);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [pendingResult, setPendingResult] = useState<QuestionResult | null>(null);
  const [done, setDone] = useState(false);
  const [key, setKey] = useState(0);

  const isLast = cur === questions.length - 1;

  const handleSubmit = (result: QuestionResult) => {
    setPendingResult(result);
  };

  const handleNext = () => {
    if (!pendingResult) return;
    const newResults = [...results, pendingResult];
    setPendingResult(null);
    if (isLast) {
      setResults(newResults);
      setDone(true);
    } else {
      setResults(newResults);
      setCur((c) => c + 1);
    }
  };

  const handleRetry = () => {
    setCur(0);
    setResults([]);
    setPendingResult(null);
    setDone(false);
    setKey((k) => k + 1);
  };

  if (done) {
    return <ResultScreen questions={questions} results={results} onRetry={handleRetry} />;
  }

  const pct = Math.round((cur / questions.length) * 100);

  return (
    <div key={key}>
      {/* Barra de progresso */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xs font-semibold font-inter text-slate-400 shrink-0">
          {cur + 1} / {questions.length}
        </span>
        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-AzulEletrico rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Pergunta atual */}
      <SingleQuiz
        key={cur}
        data={questions[cur]}
        onSubmit={handleSubmit}
      />

      {/* Botão avançar */}
      {pendingResult && (
        <button
          type="button"
          onClick={handleNext}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-white text-AzulMeiaNoite text-sm font-semibold font-inter shadow-sm hover:bg-slate-100 transition-colors"
        >
          {isLast ? "Ver resultado" : "Próxima"}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}