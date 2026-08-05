"use client";

import { useEffect, useId, useRef, useState, useCallback } from "react";
import { Check, RotateCcw, ArrowRight, Pencil, X, Lightbulb } from "lucide-react";
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
      e.stopPropagation();
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
    <div ref={containerRef} className="w-full animate-quiz-fade">
      <h4
        id={`${id}-question`}
        className="font-poppins font-bold text-lg md:text-xl mb-5 leading-snug"
        style={{ color: 'var(--ink)' }}
      >
        <InlineMarkdown content={data.pergunta} />
      </h4>

      <div
        role={isMultiple ? "group" : "radiogroup"}
        aria-labelledby={`${id}-question`}
        className="space-y-3"
      >
        {data.opcoes.map((opcao, i) => {
          const isSelected = selected.includes(i);
          const status = getStatus(i, opcao.correta);
          const isElevated = isSelected;

          const containerClass =
            status === "correct" || status === "missed"
              ? "bg-[var(--mint-soft)] border-2 border-[var(--mint-deep)] text-[var(--ink)]"
              : status === "incorrect"
                ? "bg-red-50 dark:bg-red-950/20 border-2 border-red-500 text-red-700 dark:text-red-400"
                : isElevated
                  ? "bg-[var(--electric-soft)] border-2 border-[var(--electric)] text-[var(--ink)]"
                  : "bg-[var(--paper)] hover:bg-[var(--paper-2)] hover:border-[var(--rule)] border-2 border-transparent text-[var(--ink)]";

          let iconNode: React.ReactNode;
          if (!submitted) {
            if (isSelected) {
              iconNode = (
                <span className="w-5 h-5 rounded-full border-2 border-[var(--electric)] flex items-center justify-center bg-[var(--paper)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--electric)] animate-scale-in" />
                </span>
              );
            } else {
              iconNode = (
                <span className="w-5 h-5 rounded-full border-[1.5px] border-[var(--ink-muted)]/50 group-hover:border-[var(--electric)] block transition-colors duration-150" />
              );
            }
          } else {
            // Submitted
            if (isSelected || status === "missed") {
              const isCorrectOrMissed = status === "correct" || status === "missed";
              const iconBg = isCorrectOrMissed ? "bg-[var(--mint-deep)]" : "bg-red-500";
              iconNode = (
                <span className={`w-5 h-5 rounded-full flex items-center justify-center ${iconBg}`}>
                  {isCorrectOrMissed ? (
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3.5} />
                  ) : (
                    <X className="w-3 h-3 text-white" strokeWidth={3.5} />
                  )}
                </span>
              );
            } else {
              iconNode = (
                <span className="w-5 h-5 rounded-full border-[1.5px] border-[var(--ink-muted)]/40 block" />
              );
            }
          }

          let label: React.ReactNode = null;
          if (status === "correct") {
            label = <span className="text-sm font-semibold text-[var(--mint-deep)]">Correto</span>;
          } else if (status === "incorrect") {
            label = <span className="text-sm font-semibold text-red-600 dark:text-red-400">Incorreto</span>;
          } else if (status === "missed") {
            label = (
              <span className="text-sm font-semibold text-[var(--mint-deep)]">
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
                className={`w-full text-left rounded-2xl px-6 py-4 flex items-center gap-4 transition-all duration-150 group ${containerClass} ${submitted ? "cursor-default" : "cursor-pointer"
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--electric)]/40`}
              >
                <span className="shrink-0">{iconNode}</span>
                <span
                  className={`flex-1 text-[15.5px] font-sans font-medium ${status === "incorrect" ? "text-red-700 dark:text-red-400" : ""}`}
                  style={{ lineHeight: "1.5" }}
                >
                  <InlineMarkdown content={opcao.texto} inline />
                </span>
                {label && <span className="shrink-0 ml-2">{label}</span>}
              </button>

              {/* Explicação da alternativa clicada (correta ou incorreta) */}
              {(status === "correct" || status === "incorrect") && opcao.explicacao && (
                <div
                  className="mt-1.5 ml-9 mr-4 mb-1 text-[14px] font-sans text-[var(--ink-soft)]"
                  style={{ lineHeight: "1.6", fontWeight: 400 }}
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
            className="mt-5 p-5 bg-[var(--paper)] border border-[var(--rule)] rounded-2xl flex gap-3.5 items-start animate-quiz-fade shadow-sm"
          >
            <Lightbulb className="w-5 h-5 text-[var(--mint-deep)] shrink-0 mt-0.5" />
            <div className="text-[14.5px] font-sans leading-relaxed text-[var(--ink)]">
              <span className="font-bold text-[var(--ink)] block mb-1">Dica de Fixação</span>
              <InlineMarkdown content={texto} />
            </div>
          </div>
        );
      })()}

      <div className="mt-6 flex items-center gap-4">
        {!submitted ? (
          <>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="btn btn--mint px-6 py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
            >
              Enviar
            </button>
            {canSubmit && (
              <span className="text-[13px] font-mono text-[var(--ink-soft)]">
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

  const [animatedPct, setAnimatedPct] = useState(0);
  const clipId = useId().replace(/[^a-zA-Z0-9-]/g, "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPct(pct);
    }, 100);
    return () => clearTimeout(timer);
  }, [pct]);

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

  const clipHeight = (animatedPct / 100) * 133; // altura do logo (133px)

  return (
    <div className="my-4 bg-[var(--paper)] border border-[var(--rule)] rounded-2xl p-6 md:p-8 shadow-[0_1px_3px_rgba(26,24,21,0.05)] max-w-xl mx-auto animate-quiz-fade">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Circular Progress Ring */}
          <svg width="144" height="144" className="absolute -rotate-90">
            <circle cx="72" cy="72" r="64" fill="none" stroke="var(--rule-soft)" strokeWidth="4" />
            <circle cx="72" cy="72" r="64" fill="none" stroke="var(--mint)" strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 64 * (animatedPct / 100)} ${2 * Math.PI * 64}`} strokeLinecap="round"
              style={{ transition: "stroke-dasharray .8s cubic-bezier(.4,0,.2,1)" }} />
          </svg>

          {/* Mountain Logo Badge */}
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-white to-[var(--paper)] border border-[var(--rule)] flex items-center justify-center shadow-[0_2px_8px_rgba(26,24,21,0.08)] overflow-hidden">
            <svg width="76" height="66" viewBox="0 0 190 133" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id={clipId}>
                  <path d="M79.0322 117.334C74.8533 116.788 71.1692 116.602 67.2595 115.857C65.9 115.672 64.6977 115.418 63.5726 115.222C52.3462 113.175 41.3551 109.998 30.7669 105.74C28.1938 104.754 25.649 103.696 23.1352 102.567C22.1504 102.123 21.1596 101.685 20.2172 101.156C19.7569 100.898 19.5848 100.425 19.8954 99.9583C21.5845 97.418 23.2997 94.8868 25.0364 92.3783L34.2781 78.9783L62.4291 37.8913C62.9012 37.2001 63.3859 36.5085 63.8793 35.8328C65.815 33.182 66.6314 29.8284 70.2743 30.4834C73.9172 31.1385 79.8741 42.2729 82.4636 45.9215L89.3934 55.8141C93.1304 61.1611 97.1153 66.3599 96.537 73.3445C95.7434 82.9296 83.6433 82.1837 78.7174 88.3629C77.6273 89.7301 76.8562 92.0145 77.1518 93.7864C80.0871 107.56 95.929 112.649 108.278 113.62C114.249 113.949 124.555 112.91 126.127 112.677C127.7 112.445 126.898 112.476 131.144 111.838C135.39 111.2 145.735 109.311 152.882 107.581C154.07 107.293 155.244 107.054 156.43 106.757C157.353 106.525 158.737 106.03 159.106 105.956C159.647 105.76 163.167 104.922 163.536 104.922C163.905 104.922 163.758 105.144 163.758 105.144C163.78 105.395 163.167 105.653 160.905 106.525C158.368 107.508 155.884 108.339 153.181 109.133C146.731 111.089 140.19 112.734 133.58 114.061C130.67 114.67 128.317 115.212 125.328 115.527C122.48 115.828 119.501 116.566 116.613 116.775C113.732 117.05 108.291 117.893 105.561 117.648C104.609 117.415 101.334 117.536 100.131 117.541C96.1185 117.555 92.0252 117.533 88.0293 117.532C86.3672 117.532 80.0694 117.47 79.0322 117.334Z" />
                  <path d="M107.397 18.973C108.767 18.773 111.218 20.484 112.316 22.0228C114.742 25.423 117.039 28.9162 119.391 32.3638L137.945 59.8854C142.184 66.1223 146.585 72.0885 150.978 78.1961L157.606 87.5246C158.909 89.3301 166.48 99.3578 166.84 100.721C166.533 102.664 164.71 102.391 163.121 102.865C157.154 104.613 151.081 105.984 144.942 106.968C141.631 107.491 137.962 107.881 134.619 108.301C133.39 108.455 132.062 108.419 130.785 108.572C128.453 108.553 125.918 108.864 123.696 108.805C120.865 108.729 117.256 108.639 114.508 108.316C106.221 107.341 97.1262 104.97 92.1586 97.6656C89.1343 93.2185 89.7537 87.6725 94.4101 84.6291C97.1507 82.8303 99.9615 81.2017 102.768 79.4794C105.231 77.9674 105.929 75.0376 105.271 72.3715C104.983 71.205 103.75 68.821 103.1 67.7906C99.2703 61.7158 94.496 56.2221 90.0365 50.6059C88.905 49.1791 87.5171 47.7603 86.5282 46.2745C87.4598 44.1411 89.5067 41.4306 90.9052 39.4673L97.7583 29.962L101.868 24.2301C102.807 22.9149 103.841 21.4586 104.914 20.251C105.403 19.7004 106.028 19.1731 107.397 18.973Z" />
                  <path d="M79.0326 117.334C80.1605 116.933 86.3676 117.532 88.0297 117.532C92.0255 117.533 96.1188 117.555 100.131 117.541C101.335 117.536 104.609 117.415 105.561 117.648C103.171 117.975 98.9743 117.834 96.4028 117.84C90.6953 117.853 84.7069 117.879 79.0326 117.334Z" />
                </clipPath>
              </defs>
              {/* Background - unfilled */}
              <path d="M79.0322 117.334C74.8533 116.788 71.1692 116.602 67.2595 115.857C65.9 115.672 64.6977 115.418 63.5726 115.222C52.3462 113.175 41.3551 109.998 30.7669 105.74C28.1938 104.754 25.649 103.696 23.1352 102.567C22.1504 102.123 21.1596 101.685 20.2172 101.156C19.7569 100.898 19.5848 100.425 19.8954 99.9583C21.5845 97.418 23.2997 94.8868 25.0364 92.3783L34.2781 78.9783L62.4291 37.8913C62.9012 37.2001 63.3859 36.5085 63.8793 35.8328C65.815 33.182 66.6314 29.8284 70.2743 30.4834C73.9172 31.1385 79.8741 42.2729 82.4636 45.9215L89.3934 55.8141C93.1304 61.1611 97.1153 66.3599 96.537 73.3445C95.7434 82.9296 83.6433 82.1837 78.7174 88.3629C77.6273 89.7301 76.8562 92.0145 77.1518 93.7864C80.0871 107.56 95.929 112.649 108.278 113.62C114.249 113.949 124.555 112.91 126.127 112.677C127.7 112.445 126.898 112.476 131.144 111.838C135.39 111.2 145.735 109.311 152.882 107.581C154.07 107.293 155.244 107.054 156.43 106.757C157.353 106.525 158.737 106.03 159.106 105.956C159.647 105.76 163.167 104.922 163.536 104.922C163.905 104.922 163.758 105.144 163.758 105.144C163.78 105.395 163.167 105.653 160.905 106.525C158.368 107.508 155.884 108.339 153.181 109.133C146.731 111.089 140.19 112.734 133.58 114.061C130.67 114.67 128.317 115.212 125.328 115.527C122.48 115.828 119.501 116.566 116.613 116.775C113.732 117.05 108.291 117.893 105.561 117.648C104.609 117.415 101.334 117.536 100.131 117.541C96.1185 117.555 92.0252 117.533 88.0293 117.532C86.3672 117.532 80.0694 117.47 79.0322 117.334Z" fill="var(--ink)" opacity="0.15" />
              <path d="M107.397 18.973C108.767 18.773 111.218 20.484 112.316 22.0228C114.742 25.423 117.039 28.9162 119.391 32.3638L137.945 59.8854C142.184 66.1223 146.585 72.0885 150.978 78.1961L157.606 87.5246C158.909 89.3301 166.48 99.3578 166.84 100.721C166.533 102.664 164.71 102.391 163.121 102.865C157.154 104.613 151.081 105.984 144.942 106.968C141.631 107.491 137.962 107.881 134.619 108.301C133.39 108.455 132.062 108.419 130.785 108.572C128.453 108.553 125.918 108.864 123.696 108.805C120.865 108.729 117.256 108.639 114.508 108.316C106.221 107.341 97.1262 104.97 92.1586 97.6656C89.1343 93.2185 89.7537 87.6725 94.4101 84.6291C97.1507 82.8303 99.9615 81.2017 102.768 79.4794C105.231 77.9674 105.929 75.0376 105.271 72.3715C104.983 71.205 103.75 68.821 103.1 67.7906C99.2703 61.7158 94.496 56.2221 90.0365 50.6059C88.905 49.1791 87.5171 47.7603 86.5282 46.2745C87.4598 44.1411 89.5067 41.4306 90.9052 39.4673L97.7583 29.962L101.868 24.2301C102.807 22.9149 103.841 21.4586 104.914 20.251C105.403 19.7004 106.028 19.1731 107.397 18.973Z" fill="var(--ink)" opacity="0.15" />
              <path d="M79.0326 117.334C80.1605 116.933 86.3676 117.532 88.0297 117.532C92.0255 117.533 96.1188 117.555 100.131 117.541C101.335 117.536 104.609 117.415 105.561 117.648C103.171 117.975 98.9743 117.834 96.4028 117.84C90.6953 117.853 84.7069 117.879 79.0326 117.334Z" fill="var(--ink)" opacity="0.15" />

              {/* Filled wave - clipped to the mountain shape */}
              <g clipPath={`url(#${clipId})`}>
                <g transform={`translate(0, ${133 - clipHeight})`} style={{ transition: "transform .8s cubic-bezier(.4,0,.2,1)" }}>
                  <path
                    d="M 0 10 Q 23.75 3, 47.5 10 T 95 10 T 142.5 10 T 190 10 T 237.5 10 T 285 10 L 285 200 L 0 200 Z"
                    fill="var(--mint)"
                    className="animate-wave"
                    style={{ transition: "fill .6s cubic-bezier(.4,0,.2,1)" }}
                  />
                </g>
              </g>
            </svg>
          </div>

          {/* Celebration Sparkles */}
          {isGreat && (
            <>
              {/* Sparkle 1 */}
              <svg className="absolute top-2 left-2 w-4 h-4 text-amber-500 animate-sparkle" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: "0s" }}>
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
              {/* Sparkle 2 */}
              <svg className="absolute bottom-2 right-2 w-5 h-5 text-amber-500 animate-sparkle" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: "0.5s" }}>
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
              {/* Sparkle 3 */}
              <svg className="absolute top-6 right-1 w-3.5 h-3.5 text-amber-400 animate-sparkle" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: "1s" }}>
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
              {/* Sparkle 4 */}
              <svg className="absolute bottom-4 left-0 w-4 h-4 text-amber-400 animate-sparkle" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: "1.5s" }}>
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
            </>
          )}
        </div>

        <div className="text-center">
          <p className="font-poppins font-semibold text-xl" style={{ color: 'var(--ink)' }}>{title}</p>
          <p className="text-[15px] font-sans mt-0.5 max-w-xs" style={{ color: 'var(--ink-soft)' }}>{desc}</p>
        </div>

        <div className="flex gap-2 justify-center">
          <span className="text-xs font-semibold font-sans px-3 py-1 rounded-full bg-[var(--mint-soft)] text-[var(--mint-deep)] border border-[var(--mint-deep)]/10">
            {score} corretas
          </span>
          <span className="text-xs font-semibold font-sans px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50">
            {total - score} erradas
          </span>
        </div>
      </div>

      <div className="border-t border-[var(--rule)] pt-5 mt-5 space-y-3">
        {questions.map((q, i) => {
          const r = results[i];
          return (
            <div key={i} className="flex items-start gap-3 text-sm font-sans">
              <span className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${
                r.correct
                  ? "bg-[var(--mint-soft)] text-[var(--mint-deep)] border border-[var(--mint-deep)]/10"
                  : "bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50"
              }`}>
                {r.correct ? (
                  <Check className="w-3 h-3" strokeWidth={3.5} />
                ) : (
                  <X className="w-3 h-3" strokeWidth={3.5} />
                )}
              </span>
              <span className="text-[var(--ink)] flex-1 leading-relaxed" style={{ fontWeight: 450, fontSize: '14.5px' }}>
                <InlineMarkdown content={q.pergunta} />
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 btn btn--ghost px-5 py-2.5 text-sm"
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
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-[var(--rule)]" />
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold font-mono bg-[var(--midnight)] text-[var(--cream)] shadow-sm">
          <Pencil className="w-3.5 h-3.5 text-[var(--mint)]" aria-hidden="true" />
          Exercícios
        </span>
        <div className="flex-1 h-px bg-[var(--rule)]" />
      </div>

      <div className="bg-transparent px-6 pb-6 pt-1 md:px-8 md:pb-8 md:pt-2 rounded-xl">
        {isSingle ? (
          <>
            <h3 className="font-poppins font-bold text-xl md:text-2xl mb-1 border-b border-[var(--rule)] pb-3 opacity-95 text-center" style={{ color: 'var(--ink)' }}>
              Teste seu Conhecimento
            </h3>
            <p className="text-[15px] font-sans mb-6 text-center" style={{ fontWeight: 450, color: 'var(--ink-soft)' }}>
              Responda as questões para fixar o conteúdo da aula.
            </p>
            <SingleQuiz data={questions[0]} onSubmit={() => { }} />
          </>
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

  const handleNext = useCallback(() => {
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
  }, [pendingResult, results, isLast]);

  useEffect(() => {
    if (!pendingResult) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pendingResult, handleNext]);

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
  const R = 20; // raio para caber no círculo
  const circ = 2 * Math.PI * R;
  const dash = circ * (pct / 100);

  return (
    <div key={key} className="w-full">
      <h3 className="font-poppins font-bold text-xl md:text-2xl mb-1 border-b border-[var(--rule)] pb-3 opacity-95 text-center" style={{ color: 'var(--ink)' }}>
        Teste seu Conhecimento
      </h3>
      <p className="text-[15px] font-sans mb-6 text-center" style={{ fontWeight: 450, color: 'var(--ink-soft)' }}>
        Responda as questões para fixar o conteúdo da aula.
      </p>

      <div className="flex items-center gap-4 mb-8 w-full">
        {/* Custom styled circle indicator with SVG progress ring */}
        <div className="relative w-12 h-12 shrink-0">
          <svg width="48" height="48" viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
            {/* Background thin circle */}
            <circle cx="24" cy="24" r={R} fill="none" stroke="var(--rule-soft)" strokeWidth="3" />
            
            {/* Animated green progress ring */}
            <circle cx="24" cy="24" r={R} fill="none" stroke="var(--mint)" strokeWidth="3.5"
              strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
              style={{ transition: "stroke-dasharray .6s cubic-bezier(.4,0,.2,1)" }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[13px] font-bold font-sans" style={{ color: 'var(--ink)' }}>
              {cur + 1}/{questions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar next to it */}
        <div className="flex-1 h-[6px] bg-[var(--paper-2)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--mint)] rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="w-full">
        <SingleQuiz key={cur} data={questions[cur]} onSubmit={handleSubmit} />

        {pendingResult && (
          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 btn btn--mint px-6 py-3 text-sm animate-quiz-fade"
            >
              {isLast ? "Ver resultado" : "Próxima"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[13px] font-mono text-[var(--ink-soft)] animate-quiz-fade">
              ou pressione Enter
            </span>
          </div>
        )}
      </div>
    </div>
  );
}