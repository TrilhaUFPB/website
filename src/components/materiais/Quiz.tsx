"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { parseQuiz, type QuizData } from "@/lib/quizParser";
import InlineMarkdown from "./InlineMarkdown";

type OptionStatus = "correct" | "incorrect" | "missed" | null;

function Quiz({ data }: { data: QuizData }) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const isMultiple = data.tipo === "multiple";

  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = selected.length > 0 && !submitted;

  const toggleOption = (index: number) => {
    if (submitted) return;
    setSelected((prev) => {
      if (isMultiple) {
        return prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index];
      }
      return [index];
    });
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelected([]);
    setSubmitted(false);
  };

  // Press Enter to submit while focus is inside the quiz
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      if (submitted) return;
      if (selected.length === 0) return;
      e.preventDefault();
      setSubmitted(true);
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [selected, submitted]);

  const getStatus = (index: number, correta: boolean | undefined): OptionStatus => {
    if (!submitted) return null;
    const wasPicked = selected.includes(index);
    if (wasPicked && correta) return "correct";
    if (wasPicked && !correta) return "incorrect";
    if (!wasPicked && correta) return "missed";
    return null;
  };

  return (
    <div ref={containerRef} className="my-8">
      {/* Question */}
      <h4
        id={`${id}-question`}
        className="font-poppins font-semibold text-base md:text-[17px] text-AzulMeiaNoite dark:text-white mb-4 leading-snug"
      >
        <InlineMarkdown content={data.pergunta} />
      </h4>

      {/* Options */}
      <div
        role={isMultiple ? "group" : "radiogroup"}
        aria-labelledby={`${id}-question`}
        className="space-y-2"
      >
        {data.opcoes.map((opcao, i) => {
          const isSelected = selected.includes(i);
          const status = getStatus(i, opcao.correta);
          const showExplanation = !!status && !!opcao.explicacao;

          // Container styles: white card for selected/correct/incorrect, gray for everything else
          const isElevated = isSelected || status === "correct" || status === "incorrect";

          const containerClass = isElevated
            ? "bg-white dark:bg-slate-800 shadow-[0_1px_3px_rgba(15,23,42,0.08)] ring-1 ring-black/5 dark:ring-white/5"
            : "bg-gray-100/70 dark:bg-slate-800/40 hover:bg-gray-100 dark:hover:bg-slate-800/60";

          // Icon styles
          let iconNode: React.ReactNode;
          if (isSelected) {
            const iconBg =
              status === "correct"
                ? "bg-VerdeMenta"
                : status === "incorrect"
                  ? "bg-red-500"
                  : "bg-AzulMeiaNoite dark:bg-white";
            const iconStroke =
              status === "correct" || status === "incorrect"
                ? "text-white"
                : "text-white dark:text-AzulMeiaNoite";
            iconNode = (
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center ${iconBg}`}
              >
                <Check className={`w-3 h-3 ${iconStroke}`} strokeWidth={3.5} />
              </span>
            );
          } else {
            iconNode = (
              <span className="w-5 h-5 rounded-full border-[1.5px] border-gray-300 dark:border-slate-600 block" />
            );
          }

          // Right-hand status label
          let label: React.ReactNode = null;
          if (status === "correct") {
            label = (
              <span className="text-sm font-semibold text-VerdeMenta">
                Correto
              </span>
            );
          } else if (status === "incorrect") {
            label = (
              <span className="text-sm font-semibold text-red-500">
                Incorreto
              </span>
            );
          } else if (status === "missed") {
            label = (
              <span className="text-sm font-semibold text-AzulMeiaNoite/70 dark:text-white/70">
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
                  className="flex-1 text-[15px] text-AzulMeiaNoite dark:text-white font-inter"
                  style={{ fontWeight: 450, lineHeight: "1.5" }}
                >
                  <InlineMarkdown content={opcao.texto} inline />
                </span>

                {label && <span className="shrink-0 ml-2">{label}</span>}
              </button>

              {showExplanation && (
                <div
                  className="mt-1.5 ml-9 mr-4 mb-1 text-[13.5px] font-inter text-gray-600 dark:text-gray-300"
                  style={{ lineHeight: "1.6", fontWeight: 450 }}
                >
                  <InlineMarkdown content={opcao.explicacao!} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action row */}
      <div className="mt-5 flex items-center gap-3">
        {!submitted ? (
          <>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="px-3.5 py-1.5 rounded-md bg-AzulMeiaNoite text-white text-sm font-semibold font-inter shadow-sm hover:bg-AzulMeiaNoite/90 disabled:bg-gray-200 dark:disabled:bg-slate-700 disabled:text-gray-400 dark:disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed transition-colors"
            >
              Enviar
            </button>
            {canSubmit && (
              <span className="text-xs text-gray-500 dark:text-gray-400 font-inter">
                ou pressione Enter
              </span>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold font-inter text-AzulMeiaNoite dark:text-white border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
}

export function QuizBlock({ rawYaml }: { rawYaml: string }) {
  const result = parseQuiz(rawYaml);

  if (!result.success) {
    return (
      <div className="my-6 border-2 border-red-400 dark:border-red-600 rounded-xl p-4 bg-red-50 dark:bg-red-950/20">
        <p className="font-semibold text-red-700 dark:text-red-400 text-sm mb-1">
          Erro no quiz
        </p>
        <p className="text-red-600 dark:text-red-300 text-sm">
          {result.error}
        </p>
        <pre className="mt-2 text-xs bg-red-100 dark:bg-red-900/30 p-2 rounded overflow-x-auto text-red-800 dark:text-red-200">
          {rawYaml}
        </pre>
      </div>
    );
  }

  return <Quiz data={result.data} />;
}