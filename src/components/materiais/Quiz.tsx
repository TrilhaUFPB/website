"use client";

import { useId, useState } from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { parseQuiz, type QuizData } from "@/lib/quizParser";
import InlineMarkdown from "./InlineMarkdown";

type OptionState = "idle" | "wrong" | "correct";

function Quiz({ data }: { data: QuizData }) {
  const id = useId();
  const [states, setStates] = useState<OptionState[]>(
    data.opcoes.map(() => "idle")
  );

  const isCompleted = data.opcoes.every(
    (opt, i) => !opt.correta || states[i] === "correct"
  );

  const handleOptionClick = (index: number) => {
    if (states[index] === "correct") return;
    const isCorrect = data.opcoes[index].correta ?? false;
    setStates((prev) => {
      const next = [...prev];
      next[index] = isCorrect ? "correct" : "wrong";
      return next;
    });
  };

  const handleReset = () => {
    setStates(data.opcoes.map(() => "idle"));
  };

  return (
    <div className="my-6 border border-AzulCeu/30 dark:border-AzulCeu/20 rounded-xl p-5 bg-white dark:bg-slate-900/50">
      {/* Badge */}
      <div className="mb-3">
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-AzulEletrico/10 dark:bg-AzulCeu/10 text-AzulEletrico dark:text-AzulCeu">
          {data.tipo === "multiple" ? "Múltipla escolha" : "Questão"}
        </span>
      </div>

      {/* Question */}
      <div
        id={`${id}-question`}
        className="font-poppins font-semibold text-base text-AzulMeiaNoite dark:text-white mb-4"
      >
        <InlineMarkdown content={data.pergunta} />
      </div>

      {/* Options */}
      <div
        role={data.tipo === "single" ? "radiogroup" : "group"}
        aria-labelledby={`${id}-question`}
        className="space-y-2"
      >
        {data.opcoes.map((opcao, i) => {
          const state = states[i];

          let borderClass =
            "border-gray-200 dark:border-slate-700 hover:border-AzulCeu/50 dark:hover:border-AzulCeu/50";
          let bgClass = "";
          if (state === "correct") {
            borderClass = "border-VerdeMenta dark:border-VerdeMenta";
            bgClass = "bg-VerdeMenta/5 dark:bg-VerdeMenta/10";
          } else if (state === "wrong") {
            borderClass = "border-red-400 dark:border-red-500";
            bgClass = "bg-red-50 dark:bg-red-950/20";
          }

          return (
            <div key={i}>
              <button
                role={data.tipo === "single" ? "radio" : "checkbox"}
                aria-checked={state === "correct"}
                onClick={() => handleOptionClick(i)}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 flex items-center gap-3 ${borderClass} ${bgClass} ${
                  state === "correct" ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <span className="shrink-0 w-4 h-4 flex items-center justify-center">
                  {state === "correct" && (
                    <CheckCircle className="w-4 h-4 text-VerdeMenta" />
                  )}
                  {state === "wrong" && (
                    <XCircle className="w-4 h-4 text-red-400 dark:text-red-500" />
                  )}
                  {state === "idle" && (
                    <span className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-slate-500 block" />
                  )}
                </span>
                <span
                  className="text-sm text-AzulMeiaNoite dark:text-white font-inter"
                  style={{ fontWeight: 450, lineHeight: "1.5" }}
                >
                  <InlineMarkdown content={opcao.texto} inline />
                </span>
              </button>

              {state !== "idle" && opcao.explicacao && (
                <div
                  className={`mt-1 ml-3 pl-3 py-1.5 border-l-2 text-sm font-inter ${
                    state === "correct"
                      ? "border-VerdeMenta text-green-700 dark:text-green-300"
                      : "border-red-400 text-red-700 dark:text-red-300"
                  }`}
                  style={{ lineHeight: "1.6", fontWeight: 450 }}
                >
                  <InlineMarkdown content={opcao.explicacao} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completed banner */}
      {isCompleted && (
        <div className="mt-4 flex items-center justify-between p-2.5 bg-VerdeMenta/10 dark:bg-VerdeMenta/5 rounded-lg border border-VerdeMenta/20">
          <span className="text-sm font-semibold text-VerdeMenta">
            ✓ Correto!
          </span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-AzulEletrico dark:hover:text-AzulCeu transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Tentar novamente
          </button>
        </div>
      )}
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
