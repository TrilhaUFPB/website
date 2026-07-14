"use client";

import { useState } from "react";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import { Check, Copy, RotateCcw, Play } from "lucide-react";

hljs.registerLanguage("python", python);

// Carrega o Pyodide só uma vez e reaproveita em todos os blocos da página.
let pyodidePromise: Promise<any> | null = null;

function getPyodide(): Promise<any> {
  if (!pyodidePromise) {
    pyodidePromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
      script.onload = async () => {
        try {
          // @ts-expect-error - loadPyodide vem do script global carregado acima
          const pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
          });
          resolve(pyodide);
        } catch (err) {
          reject(err);
        }
      };
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }
  return pyodidePromise;
}

type Status = "idle" | "loading" | "running" | "done" | "error";

interface PyRunnerProps {
  code: string;
}

export default function PyRunner({ code: initialCode }: PyRunnerProps) {
  const [code, setCode] = useState(initialCode.trim());
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  async function handleRun() {
    setStatus("loading");
    setOutput("");
    try {
      const pyodide = await getPyodide();
      setStatus("running");

      pyodide.setStdout({
        batched: (text: string) => setOutput((prev) => prev + text + "\n"),
      });
      pyodide.setStderr({
        batched: (text: string) => setOutput((prev) => prev + text + "\n"),
      });

      await pyodide.runPythonAsync(code);
      setStatus("done");
    } catch (err) {
      setOutput((prev) => prev + "\n" + (err as Error).message);
      setStatus("error");
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setCode(initialCode.trim());
    setOutput("");
    setStatus("idle");
  }

  const isBusy = status === "loading" || status === "running";

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-slate-700/40 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/95 border-b border-slate-800/80">
        <span className="text-xs font-mono text-slate-400 select-none">
          Python
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="p-1 px-2.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors duration-150 flex items-center gap-1.5 font-sans text-[11px] font-medium"
            aria-label="Copiar código"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="p-1 px-2.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors duration-150 flex items-center gap-1.5 font-sans text-[11px] font-medium"
            aria-label="Restaurar código original"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resetar</span>
          </button>
          <button
            onClick={handleRun}
            disabled={isBusy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-transparent hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold font-sans transition-colors duration-150"
          >
            {status === "loading" ? (
              "Carregando..."
            ) : status === "running" ? (
              "Rodando..."
            ) : (
              <>
                <Play className="w-3.5 h-3.5" fill="currentColor" />
                <span>Run</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-slate-900/90 dark:bg-slate-950">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(c) => hljs.highlight(c, { language: "python" }).value}
          padding={16}
          textareaClassName="focus:outline-none"
          style={{
            fontFamily: "monospace",
            fontSize: 14,
            lineHeight: 1.6,
            color: "#e2e8f0", // cor base pra texto sem highlight (ex: chamadas de função)
          }}
        />
      </div>

      <div className="px-4 py-3 bg-[#f0ead6] dark:bg-[#f0ead6] border-t border-slate-800/80 rounded-b-xl">
        <div className="text-[11px] uppercase tracking-wider text-green-600 mb-1.5 select-none font-semibold">
          Saída
        </div>
        <pre
          className="font-mono text-[var(--ink,#1c1917)] whitespace-pre-wrap min-h-[1.5em]"
          style={{ fontSize: 14, lineHeight: 1.6 }}
        >
          {output || " "}
        </pre>
      </div>
    </div>
  );
}