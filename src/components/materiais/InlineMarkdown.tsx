"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface InlineMarkdownProps {
  content: string;
  /** When true, paragraph tags are stripped to avoid invalid DOM nesting inside <button> */
  inline?: boolean;
}

export default function InlineMarkdown({ content, inline = false }: InlineMarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) =>
          inline ? (
            <>{children}</>
          ) : (
            <span className="block mb-1 last:mb-0">{children}</span>
          ),
        code: ({ children }) => (
          <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-AzulEletrico dark:text-AzulCeu font-mono text-sm">
            {children}
          </code>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-AzulEletrico dark:text-AzulCeu hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-AzulMeiaNoite dark:text-white">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
