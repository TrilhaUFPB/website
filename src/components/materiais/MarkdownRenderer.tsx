"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { QuizBlock } from "./Quiz";
import PyRunner from "./PyRunner";

interface MarkdownRendererProps {
  content: string;
}

function extractTextFromNode(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractTextFromNode).join("");
  if (typeof node === "object" && "props" in (node as object)) {
    const el = node as { props: { children?: React.ReactNode } };
    return extractTextFromNode(el.props.children);
  }
  return "";
}

// Componente para botão de copiar código
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
  );
}

// Mapeamento amigável para nomes de linguagens de programação
const getLanguageLabel = (lang: string) => {
  if (!lang) return "Código";
  const mapping: Record<string, string> = {
    python: "Python",
    py: "Python",
    bash: "Terminal",
    sh: "Terminal",
    shell: "Terminal",
    yaml: "YAML",
    yml: "YAML",
    json: "JSON",
    html: "HTML",
    css: "CSS",
    javascript: "JavaScript",
    js: "JavaScript",
    typescript: "TypeScript",
    ts: "TypeScript",
    sql: "SQL",
  };
  return mapping[lang.toLowerCase()] || lang.toUpperCase();
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Função para criar IDs para os headings
  const createHeadingId = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  if (!mounted) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-6" />
        <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-full mb-4" />
        <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-5/6 mb-4" />
        <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-4/6" />
      </div>
    );
  }

  return (
    <article className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // Headers com IDs para ancoragem - MAIS ESPAÇOSOS
          h1: ({ children, ...props }) => {
            const text = String(children);
            const id = createHeadingId(text);
            return (
              <h1
                id={id}
                className="text-2xl md:text-3xl font-bold font-poppins text-[var(--ink)] dark:text-white mt-10 mb-4 border-b border-[var(--rule)] pb-2 scroll-mt-28 leading-tight"
                {...props}
              >
                {children}
              </h1>
            );
          },
          h2: ({ children, ...props }) => {
            const text = String(children);
            const id = createHeadingId(text);
            return (
              <h2
                id={id}
                className="text-xl md:text-2xl font-bold font-poppins text-[var(--ink)] dark:text-white mt-8 mb-3.5 scroll-mt-28 leading-tight"
                {...props}
              >
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const text = String(children);
            const id = createHeadingId(text);
            return (
              <h3
                id={id}
                className="text-lg md:text-xl font-semibold font-poppins text-[var(--ink-soft)] dark:text-gray-200 mt-6 mb-3 scroll-mt-28 leading-snug"
                {...props}
              >
                {children}
              </h3>
            );
          },
          h4: ({ children, ...props }) => {
            const text = String(children);
            const id = createHeadingId(text);
            return (
              <h4
                id={id}
                className="text-base md:text-lg font-semibold font-poppins text-[var(--ink-soft)] dark:text-gray-300 mt-5 mb-2.5 scroll-mt-28 leading-snug"
                {...props}
              >
                {children}
              </h4>
            );
          },
          // Parágrafos - com detecção de elementos block para evitar hydration error
          p: ({ children, ...props }) => {
            const childArray = Array.isArray(children) ? children : [children];

            // Filtra itens vazios/whitespace
            const meaningful = childArray.filter((child) => {
              if (child === null || child === undefined) return false;
              if (typeof child === "string" && child.trim() === "") return false;
              return true;
            });

            // Se contém algum elemento React que renderiza block-level (figure, div, iframe)
            const hasBlockChild = meaningful.some((child) => {
              if (!child || typeof child !== "object" || !("type" in child)) return false;
              const type = (child as React.ReactElement).type;
              // Componentes customizados (figura de imagem, div do YouTube) são funções/objetos
              if (typeof type === "function") return true;
              if (typeof type === "string" && ["figure", "div", "iframe"].includes(type)) return true;
              return false;
            });

            if (hasBlockChild) {
              return (
                <div
                  className="font-sans text-[16px] md:text-[17px] text-[var(--ink)] dark:text-[var(--cream)] mb-4 max-w-[180ch]"
                  style={{ lineHeight: '1.65', fontWeight: 400 }}
                >
                  {children}
                </div>
              );
            }

            return (
              <p
                className="font-sans text-[16px] md:text-[17px] text-[var(--ink)] dark:text-[var(--cream)] mb-4 max-w-[180ch]"
                style={{ lineHeight: '1.65', fontWeight: 400 }}
                {...props}
              >
                {children}
              </p>
            );
          },
          // Listas - SUPER COMPACTAS
          ul: ({ children, ...props }) => (
            <ul
              className="list-disc space-y-2 mb-4 text-[16px] md:text-[17px] text-[var(--ink)] dark:text-[var(--cream)] ml-6"
              style={{ lineHeight: '1.65', fontWeight: 400 }}
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol
              className="list-decimal space-y-2 mb-4 text-[16px] md:text-[17px] text-[var(--ink)] dark:text-[var(--cream)] ml-6"
              style={{ lineHeight: '1.65', fontWeight: 400 }}
              {...props}
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="leading-relaxed pl-1" {...props}>
              {children}
            </li>
          ),
          // Código inline
          code: ({ className, children, ...props }) => {
            const isBlock = className?.includes("hljs") || className?.includes("language-");
            
            if (isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            
            return (
              <code
                className="px-1.5 py-0.5 rounded bg-[var(--paper-2)] border border-[var(--rule-soft)] dark:bg-slate-800 text-[var(--electric)] dark:text-AzulCeu font-mono text-[14px]"
                {...props}
              >
                {children}
              </code>
            );
          },
          // Bloco de código - SUPER COMPACTO
          pre: ({ children, ...props }) => {
            if (children && typeof children === "object" && "props" in children) {
              const childProps = children.props as {
                className?: string;
                children?: React.ReactNode;
              };
              if (childProps.className?.includes("language-quiz")) {
                const rawYaml = String(childProps.children || "").trimEnd();
                return <QuizBlock rawYaml={rawYaml} />;
              }
              // Detect runnable python blocks
              if (childProps.className?.includes("language-python-run")) {
                const rawCode = extractTextFromNode(childProps.children).trimEnd();
                return <PyRunner code={rawCode} />;
              }
          }

            // Extrai o conteúdo do código de forma segura
            let codeContent = "";
            let lang = "";
            if (children && typeof children === "object" && "props" in children) {
              const childProps = children.props as { className?: string; children?: React.ReactNode };
              codeContent = extractTextFromNode(childProps.children);
              const match = /language-(\w+)/.exec(childProps.className || "");
              lang = match ? match[1] : "";
            }

            const languageLabel = getLanguageLabel(lang);

            return (
              <div className="relative group my-6 rounded-xl overflow-hidden border border-slate-700/40 shadow-sm">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-950/95 border-b border-slate-800/80 text-xs font-mono text-slate-400 select-none">
                  <span>{languageLabel}</span>
                  <CopyButton code={codeContent} />
                </div>
                <pre
                  className="overflow-x-auto bg-slate-900/90 dark:bg-slate-950 p-4 text-[14px] leading-relaxed font-mono"
                  {...props}
                >
                  {children}
                </pre>
              </div>
            );
          },
          // Blockquote - SUPER COMPACTO
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-[var(--electric)] pl-5 py-3 my-6 bg-[var(--electric-soft)]/20 dark:bg-slate-800/40 rounded-r-xl text-[16px] italic text-[var(--ink)] dark:text-white"
              style={{ lineHeight: '1.65', fontWeight: 400 }}
              {...props}
            >
              {children}
            </blockquote>
          ),
          // Links - com detecção de YouTube
          a: ({ children, href, ...props }) => {
            // Detecta URLs do YouTube
            const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            const match = href?.match(youtubeRegex);
            
            if (match) {
              const videoId = match[1];
              return (
                <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="480"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full"
                  />
                </div>
              );
            }
            
            return (
              <a
                href={href}
                className="text-[var(--electric)] dark:text-AzulCeu hover:underline transition-colors duration-200 font-medium"
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
          // Tabelas - SUPER COMPACTAS
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-gray-50 dark:bg-slate-800" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th
              className="px-3 py-1.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="font-sans px-3 py-2 text-sm text-[var(--ink)] dark:text-white border-t border-gray-200 dark:border-slate-700"
              style={{ lineHeight: '1.65', fontWeight: 450 }}
              {...props}
            >
              {children}
            </td>
          ),
          // Imagens - usando img nativo para suportar URLs externas de markdown
          img: ({ src, alt, ...props }) => (
            <figure className="my-4">
              {/* Usando img para suportar URLs de markdown */}
              <img
                src={src}
                alt={alt || "Imagem do material"}
                className="rounded-lg shadow-lg max-w-full h-auto mx-auto"
                loading="lazy"
                {...props}
              />
              {alt && (
                <figcaption className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                  {alt}
                </figcaption>
              )}
            </figure>
          ),
          // Horizontal rule - SUPER COMPACTO
          hr: () => (
            <hr className="my-5 border-[var(--rule)]" />
          ),
          // Strong/Bold
          strong: ({ children, ...props }) => (
            <strong className="font-bold text-[var(--ink)] dark:text-white" {...props}>
              {children}
            </strong>
          ),
          // Emphasis/Italic
          em: ({ children, ...props }) => (
            <em className="italic" {...props}>
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}