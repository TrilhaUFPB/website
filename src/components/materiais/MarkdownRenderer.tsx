"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
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
      className="absolute top-3 right-3 p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100"
      aria-label="Copiar código"
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Função para criar IDs para os headings
  const createHeadingId = (text: string) => {
    return text
      .toLowerCase()
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
                className="text-lg md:text-xl font-bold text-AzulMeiaNoite dark:text-white mt-6 mb-2 scroll-mt-28 leading-tight"
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
                className="text-base md:text-lg font-bold text-AzulMeiaNoite dark:text-white mt-6 mb-2 scroll-mt-28 border-b border-gray-200 dark:border-slate-700 pb-1 leading-tight"
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
                className="text-sm md:text-base font-semibold text-AzulMeiaNoite dark:text-white mt-5 mb-2 scroll-mt-28 leading-snug"
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
                className="text-xs md:text-sm font-semibold text-AzulMeiaNoite dark:text-white mt-4 mb-2 scroll-mt-28 leading-snug"
                {...props}
              >
                {children}
              </h4>
            );
          },
          // Parágrafos - SUPER COMPACTOS
          p: ({ children, ...props }) => (
            <p
              className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-2 max-w-[180ch]"
              style={{ lineHeight: '1.4' }}
              {...props}
            >
              {children}
            </p>
          ),
          // Listas - SUPER COMPACTAS
          ul: ({ children, ...props }) => (
            <ul
              className="list-disc space-y-1 mb-3 text-xs text-gray-700 dark:text-gray-300 ml-6"
              style={{ lineHeight: '1.4' }}
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol
              className="list-decimal space-y-1 mb-3 text-xs text-gray-700 dark:text-gray-300 ml-6"
              style={{ lineHeight: '1.4' }}
              {...props}
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="leading-relaxed pl-2" {...props}>
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
                className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-AzulEletrico dark:text-AzulCeu font-mono text-xs"
                {...props}
              >
                {children}
              </code>
            );
          },
          // Bloco de código - SUPER COMPACTO
          pre: ({ children, ...props }) => {
            // Extrai o conteúdo do código de forma segura
            let codeContent = "";
            if (children && typeof children === "object" && "props" in children) {
              const childProps = children.props as { children?: React.ReactNode };
              codeContent = String(childProps.children || "");
            }
            
            return (
              <div className="relative group my-4">
                <pre
                  className="overflow-x-auto rounded-lg bg-slate-900 dark:bg-slate-950 p-2.5 text-xs leading-relaxed"
                  {...props}
                >
                  {children}
                </pre>
                <CopyButton code={codeContent} />
              </div>
            );
          },
          // Blockquote - SUPER COMPACTO
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-AzulCeu pl-4 py-2 my-4 bg-AzulCeu/5 dark:bg-AzulCeu/10 rounded-r-lg text-xs italic text-gray-700 dark:text-gray-300"
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
                className="text-AzulEletrico dark:text-AzulCeu hover:underline transition-colors duration-200 font-medium"
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
              className="px-2 py-1 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="px-2 py-1 text-xs text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-slate-700"
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
            <hr className="my-5 border-gray-200 dark:border-slate-700" />
          ),
          // Strong/Bold
          strong: ({ children, ...props }) => (
            <strong className="font-bold text-AzulMeiaNoite dark:text-white" {...props}>
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
