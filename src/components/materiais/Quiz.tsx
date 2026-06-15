"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, RotateCcw, ArrowRight, Pencil } from "lucide-react";
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

  // Verifica se o aluno errou (submeteu e não acertou)
  const answeredWrong =
    submitted &&
    selected.length > 0 &&
    !data.opcoes[selected[0]]?.correta;

  return (
    <div ref={containerRef}>
      <h4
        id={`${id}-question`}
        className="font-poppins font-semibold md:text-[18.9px] text-[16.8px] mb-4 leading-snug"
        style={{ color: '#0f2744' }}
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
          const isElevated = isSelected;

          const containerClass =
            status === "missed"
              ? "bg-VerdeMenta/10 ring-1 ring-VerdeMenta/30"
              : status === "incorrect"
                ? "bg-red-500/10 ring-1 ring-red-500/30"
                : isElevated
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
              <span className="text-sm font-semibold text-VerdeMenta">
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
                className={`w-full text-left rounded-xl px-4 py-3.5 flex items-center gap-3.5 transition-all duration-150 ${containerClass} ${submitted ? "cursor-default" : "cursor-pointer"
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-AzulEletrico/40`}
              >
                <span className="shrink-0">{iconNode}</span>
                <span
                  className={`flex-1 text-[16px] font-inter ${status === "incorrect" ? "text-red-400" : ""}`}
                  style={{ fontWeight: 450, lineHeight: "1.5", color: status === "incorrect" ? "" : isSelected ? '#c6d8ee' : '#0f2744' }}
                >
                  <InlineMarkdown content={opcao.texto} inline />
                </span>
                {label && <span className="shrink-0 ml-2">{label}</span>}
              </button>

              {/* Explicação da alternativa clicada (correta ou incorreta) */}
              {(status === "correct" || status === "incorrect") && opcao.explicacao && (
                <div
                  className="mt-1.5 ml-9 mr-4 mb-1 text-[14px] font-inter"
                  style={{ lineHeight: "1.6", fontWeight: 450, color: '#0f2744' }}
                >
                  <InlineMarkdown content={opcao.explicacao} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bloco 💡 — fora do loop, aparece só quando errou */}
      {answeredWrong && (() => {
        const correta = data.opcoes.find((o) => o.correta && (o.explicacao_erro || o.explicacao));
        if (!correta) return null;
        const texto = correta.explicacao_erro ?? correta.explicacao!;
        return (
          <div
            className="mt-4 text-[14px] font-inter flex gap-2"
            style={{ lineHeight: "1.6", fontWeight: 450, color: '#0f2744' }}
          >
            <span className="shrink-0">💡</span>
            <span><InlineMarkdown content={texto} /></span>
          </div>
        );
      })()}

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
              <span className="text-xs font-inter" style={{ color: '#0f2744', fontSize: '13px' }}>
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

  const clipHeight = (pct / 100) * 133; // altura do logo (133px)

  return (
    <div className="my-2">
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg width="152" height="133" viewBox="0 0 190 133" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute">
            <defs>
              <clipPath id="logoClip">
                <rect x="0" y={133 - clipHeight} width="190" height={clipHeight} />
              </clipPath>
            </defs>
            {/* Background - unfilled */}
            <path d="M79.0322 117.334C74.8533 116.788 71.1692 116.602 67.2595 115.857C65.9 115.672 64.6977 115.418 63.5726 115.222C52.3462 113.175 41.3551 109.998 30.7669 105.74C28.1938 104.754 25.649 103.696 23.1352 102.567C22.1504 102.123 21.1596 101.685 20.2172 101.156C19.7569 100.898 19.5848 100.425 19.8954 99.9583C21.5845 97.418 23.2997 94.8868 25.0364 92.3783L34.2781 78.9783L62.4291 37.8913C62.9012 37.2001 63.3859 36.5085 63.8793 35.8328C65.815 33.182 66.6314 29.8284 70.2743 30.4834C73.9172 31.1385 79.8741 42.2729 82.4636 45.9215L89.3934 55.8141C93.1304 61.1611 97.1153 66.3599 96.537 73.3445C95.7434 82.9296 83.6433 82.1837 78.7174 88.3629C77.6273 89.7301 76.8562 92.0145 77.1518 93.7864C80.0871 107.56 95.929 112.649 108.278 113.62C114.249 113.949 124.555 112.91 126.127 112.677C127.7 112.445 126.898 112.476 131.144 111.838C135.39 111.2 145.735 109.311 152.882 107.581C154.07 107.293 155.244 107.054 156.43 106.757C157.353 106.525 158.737 106.03 159.106 105.956C159.647 105.76 163.167 104.922 163.536 104.922C163.905 104.922 163.758 105.144 163.758 105.144C163.78 105.395 163.167 105.653 160.905 106.525C158.368 107.508 155.884 108.339 153.181 109.133C146.731 111.089 140.19 112.734 133.58 114.061C130.67 114.67 128.317 115.212 125.328 115.527C122.48 115.828 119.501 116.566 116.613 116.775C113.732 117.05 108.291 117.893 105.561 117.648C104.609 117.415 101.334 117.536 100.131 117.541C96.1185 117.555 92.0252 117.533 88.0293 117.532C86.3672 117.532 80.0694 117.47 79.0322 117.334Z" fill="#334155" opacity="0.3" />
            <path d="M107.397 18.973C108.767 18.773 111.218 20.484 112.316 22.0228C114.742 25.423 117.039 28.9162 119.391 32.3638L137.945 59.8854C142.184 66.1223 146.585 72.0885 150.978 78.1961L157.606 87.5246C158.909 89.3301 166.48 99.3578 166.84 100.721C166.533 102.664 164.71 102.391 163.121 102.865C157.154 104.613 151.081 105.984 144.942 106.968C141.631 107.491 137.962 107.881 134.619 108.301C133.39 108.455 132.062 108.419 130.785 108.572C128.453 108.553 125.918 108.864 123.696 108.805C120.865 108.729 117.256 108.639 114.508 108.316C106.221 107.341 97.1262 104.97 92.1586 97.6656C89.1343 93.2185 89.7537 87.6725 94.4101 84.6291C97.1507 82.8303 99.9615 81.2017 102.768 79.4794C105.231 77.9674 105.929 75.0376 105.271 72.3715C104.983 71.205 103.75 68.821 103.1 67.7906C99.2703 61.7158 94.496 56.2221 90.0365 50.6059C88.905 49.1791 87.5171 47.7603 86.5282 46.2745C87.4598 44.1411 89.5067 41.4306 90.9052 39.4673L97.7583 29.962L101.868 24.2301C102.807 22.9149 103.841 21.4586 104.914 20.251C105.403 19.7004 106.028 19.1731 107.397 18.973Z" fill="#334155" opacity="0.3" />
            <path d="M79.0326 117.334C80.1605 116.933 86.3676 117.532 88.0297 117.532C92.0255 117.533 96.1188 117.555 100.131 117.541C101.335 117.536 104.609 117.415 105.561 117.648C103.171 117.975 98.9743 117.834 96.4028 117.84C90.6953 117.853 84.7069 117.879 79.0326 117.334Z" fill="#334155" opacity="0.3" />

            {/* Filled - com clip */}
            <g clipPath="url(#logoClip)">
              <path d="M79.0322 117.334C74.8533 116.788 71.1692 116.602 67.2595 115.857C65.9 115.672 64.6977 115.418 63.5726 115.222C52.3462 113.175 41.3551 109.998 30.7669 105.74C28.1938 104.754 25.649 103.696 23.1352 102.567C22.1504 102.123 21.1596 101.685 20.2172 101.156C19.7569 100.898 19.5848 100.425 19.8954 99.9583C21.5845 97.418 23.2997 94.8868 25.0364 92.3783L34.2781 78.9783L62.4291 37.8913C62.9012 37.2001 63.3859 36.5085 63.8793 35.8328C65.815 33.182 66.6314 29.8284 70.2743 30.4834C73.9172 31.1385 79.8741 42.2729 82.4636 45.9215L89.3934 55.8141C93.1304 61.1611 97.1153 66.3599 96.537 73.3445C95.7434 82.9296 83.6433 82.1837 78.7174 88.3629C77.6273 89.7301 76.8562 92.0145 77.1518 93.7864C80.0871 107.56 95.929 112.649 108.278 113.62C114.249 113.949 124.555 112.91 126.127 112.677C127.7 112.445 126.898 112.476 131.144 111.838C135.39 111.2 145.735 109.311 152.882 107.581C154.07 107.293 155.244 107.054 156.43 106.757C157.353 106.525 158.737 106.03 159.106 105.956C159.647 105.76 163.167 104.922 163.536 104.922C163.905 104.922 163.758 105.144 163.758 105.144C163.78 105.395 163.167 105.653 160.905 106.525C158.368 107.508 155.884 108.339 153.181 109.133C146.731 111.089 140.19 112.734 133.58 114.061C130.67 114.67 128.317 115.212 125.328 115.527C122.48 115.828 119.501 116.566 116.613 116.775C113.732 117.05 108.291 117.893 105.561 117.648C104.609 117.415 101.334 117.536 100.131 117.541C96.1185 117.555 92.0252 117.533 88.0293 117.532C86.3672 117.532 80.0694 117.47 79.0322 117.334Z" fill="#22c55e" style={{ transition: "fill .6s cubic-bezier(.4,0,.2,1)" }} />
              <path d="M107.397 18.973C108.767 18.773 111.218 20.484 112.316 22.0228C114.742 25.423 117.039 28.9162 119.391 32.3638L137.945 59.8854C142.184 66.1223 146.585 72.0885 150.978 78.1961L157.606 87.5246C158.909 89.3301 166.48 99.3578 166.84 100.721C166.533 102.664 164.71 102.391 163.121 102.865C157.154 104.613 151.081 105.984 144.942 106.968C141.631 107.491 137.962 107.881 134.619 108.301C133.39 108.455 132.062 108.419 130.785 108.572C128.453 108.553 125.918 108.864 123.696 108.805C120.865 108.729 117.256 108.639 114.508 108.316C106.221 107.341 97.1262 104.97 92.1586 97.6656C89.1343 93.2185 89.7537 87.6725 94.4101 84.6291C97.1507 82.8303 99.9615 81.2017 102.768 79.4794C105.231 77.9674 105.929 75.0376 105.271 72.3715C104.983 71.205 103.75 68.821 103.1 67.7906C99.2703 61.7158 94.496 56.2221 90.0365 50.6059C88.905 49.1791 87.5171 47.7603 86.5282 46.2745C87.4598 44.1411 89.5067 41.4306 90.9052 39.4673L97.7583 29.962L101.868 24.2301C102.807 22.9149 103.841 21.4586 104.914 20.251C105.403 19.7004 106.028 19.1731 107.397 18.973Z" fill="#22c55e" style={{ transition: "fill .6s cubic-bezier(.4,0,.2,1)" }} />
              <path d="M79.0326 117.334C80.1605 116.933 86.3676 117.532 88.0297 117.532C92.0255 117.533 96.1188 117.555 100.131 117.541C101.335 117.536 104.609 117.415 105.561 117.648C103.171 117.975 98.9743 117.834 96.4028 117.84C90.6953 117.853 84.7069 117.879 79.0326 117.334Z" fill="#22c55e" style={{ transition: "fill .6s cubic-bezier(.4,0,.2,1)" }} />
            </g>
            <style>{`
              .text-azul-darker {
                color: #0f2744;
              }
            `}</style>
          </svg>
        </div>

        <div className="text-center">
          <p className="font-poppins font-semibold text-xl" style={{ color: '#0f2744' }}>{title}</p>
          <p className="text-[15px] font-inter mt-0.5 max-w-xs" style={{ color: '#0f2744' }}>{desc}</p>
        </div>

        <div className="flex gap-2">
          <span className="text-xs font-semibold font-inter px-3 py-1 rounded-full bg-green-800/30 text-green-700 border border-green-900/50">
            {score} corretas
          </span>
          <span className="text-xs font-semibold font-inter px-3 py-1 rounded-full bg-red-800/30 text-red-700 border border-red-900/50">
            {total - score} erradas
          </span>
        </div>
      </div>

      <div className="border-t border-slate-700 pt-4 space-y-2">
        {questions.map((q, i) => {
          const r = results[i];
          return (
            <div key={i} className="flex items-start gap-2.5 text-sm font-inter">
              <span
                className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${r.correct ? "bg-green-500" : "bg-red-400"
                  }`}
              />
              <span className="text-azul-darker" style={{ fontWeight: 450, color: '#0f2744', fontSize: '14px' }}>
                {q.pergunta}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold font-inter border border-slate-700 hover:bg-slate-800 transition-colors"
          style={{ color: '#0f2744' }}
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
    <div id="exercicios" className="my-8 scroll-mt-28">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold font-inter bg-transparent" style={{ color: '#0f2744' }}>
          <Pencil className="w-3 h-3" aria-hidden="true" />
          Exercícios
        </span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
      </div>

      <div className="bg-transparent p-6 md:p-8 rounded-xl" style={{ backgroundColor: '#f3efe000' }}>
        <h3 className="font-poppins font-bold text-xl md:text-2xl mb-1 border-b border-slate-700 pb-3 opacity-95 text-center" style={{ color: '#0f2744' }}>
          Teste seu Conhecimento
        </h3>
        <p className="text-[15px] font-inter mb-6" style={{ fontWeight: 450, color: '#0f2744' }}>
          Responda as questões para fixar o conteúdo da aula.
        </p>

        {isSingle ? (
          <SingleQuiz data={questions[0]} onSubmit={() => { }} />
        ) : (
          <MultiQuiz questions={questions} />
        )}
      </div>
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
  const R = 24;
  const circ = 2 * Math.PI * R;
  const dash = circ * (pct / 100);

  return (
    <div key={key}>
      <div className="flex items-center gap-3 mb-5">
        <div className="relative w-14 h-14 shrink-0">
          <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
            <circle cx="28" cy="28" r={R} fill="none" stroke="currentColor"
              className="text-slate-700" strokeWidth="6" />
            <circle cx="28" cy="28" r={R} fill="none" stroke="#22c55e" strokeWidth="6"
              strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
              style={{ transition: "stroke-dasharray .6s cubic-bezier(.4,0,.2,1)" }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-bold font-poppins" style={{ color: '#0e1f33' }}>
              {cur + 1}/{questions.length}
            </span>
          </div>
        </div>
        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-VerdeMenta rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <SingleQuiz key={cur} data={questions[cur]} onSubmit={handleSubmit} />

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