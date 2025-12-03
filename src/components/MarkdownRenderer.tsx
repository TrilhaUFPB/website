"use client";

import ReactMarkdown from "react-markdown";
import type { Element } from "hast";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import Image from "next/image";
import { useEffect, useRef } from "react";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
  onHeadingsChange?: (headings: Heading[]) => void;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

// Custom component for attention boxes
const AttentionBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-4 p-4 bg-yellow-100 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-lg">
      <div className="flex items-start">
        <span className="text-yellow-600 dark:text-yellow-400 font-bold mr-2">⚠️ ATENÇÃO</span>
        <div className="flex-1 text-yellow-800 dark:text-yellow-200">{children}</div>
      </div>
    </div>
  );
};

// Custom component for YouTube videos
const YouTubeEmbed = ({ url }: { url: string }) => {
  const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
  
  if (!videoId) return <p className="text-red-500">Invalid YouTube URL: {url}</p>;
  
  return (
    <div className="my-6 aspect-video w-full" style={{ position: 'relative', zIndex: 1 }}>
      <iframe
        className="w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ 
          position: 'relative',
          zIndex: 1,
          willChange: 'auto'
        }}
      />
    </div>
  );
};

export default function MarkdownRenderer({ content, onHeadingsChange }: MarkdownRendererProps) {
  const headingsRef = useRef<Heading[]>([]);
  const contentRef = useRef<string>("");

  useEffect(() => {
    // Only extract headings if content has changed
    if (contentRef.current === content) {
      return;
    }
    
    contentRef.current = content;
    
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

      headings.push({ id, text, level });
    }

    // Only call onHeadingsChange if headings actually changed
    const headingsChanged = 
      headings.length !== headingsRef.current.length ||
      headings.some((h, i) => {
        const old = headingsRef.current[i];
        return !old || h.id !== old.id || h.text !== old.text || h.level !== old.level;
      });

    if (headingsChanged) {
      headingsRef.current = headings;
      if (onHeadingsChange) {
        onHeadingsChange(headings);
      }
    }
  }, [content, onHeadingsChange]);

  // Process content to handle attention boxes
  const processContent = (text: string): string => {
    let processed = text;
    
    // Replace [!ATENTION]\n> pattern with HTML div
    // Matches [!ATENTION] followed by newline and blockquote content until next blank line or heading
    processed = processed.replace(
      /\[!ATENTION\]\s*\n(>\s*[^\n]+(?:\n>\s*[^\n]+)*)/gm,
      (match, content) => {
        const cleanContent = content.replace(/^>\s*/gm, '').trim();
        return `<div class="attention-box">${cleanContent}</div>`;
      }
    );
    
    return processed;
  };

  const processedContent = processContent(content);

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // Custom heading renderer with IDs
          h1: ({ children, ...props }) => {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-")
              .trim();
            return (
              <h1 id={id} className="scroll-mt-20 font-poppins font-bold text-3xl mt-8 mb-4 text-AzulMeiaNoite" {...props}>
                {children}
              </h1>
            );
          },
          h2: ({ children, ...props }) => {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-")
              .trim();
            return (
              <h2 id={id} className="scroll-mt-20 font-poppins font-semibold text-2xl mt-6 mb-3 text-AzulMeiaNoite" {...props}>
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-")
              .trim();
            return (
              <h3 id={id} className="scroll-mt-20 font-poppins font-semibold text-xl mt-5 mb-2 text-AzulMeiaNoite" {...props}>
                {children}
              </h3>
            );
          },
          h4: ({ children, ...props }) => {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-")
              .trim();
            return (
              <h4 id={id} className="scroll-mt-20 font-poppins font-medium text-lg mt-4 mb-2 text-AzulMeiaNoite" {...props}>
                {children}
              </h4>
            );
          },
          // Custom image renderer for local images
          img: ({ src, alt, ...props }: React.ComponentPropsWithoutRef<'img'>) => {
            if (src?.startsWith("http")) {
              // eslint-disable-next-line @next/next/no-img-element
              return <img src={src} alt={alt} className="rounded-lg my-4" {...props} />;
            }
            // Filter out width and height from props to avoid conflicts
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { width: _, height: __, ...imageProps } = props;
            return (
              <Image
                src={src || ""}
                alt={alt || ""}
                width={800}
                height={600}
                className="rounded-lg my-4"
                unoptimized
                {...imageProps}
              />
            );
          },
          // Custom paragraph renderer - check if it only contains a YouTube link
          p: (props: React.ComponentPropsWithoutRef<'p'>) => {
            const { children, ...rest } = props;
            // Check if paragraph only contains a single link that's a YouTube URL
            const childArray = Array.isArray(children) ? children : [children];
            if (childArray.length === 1) {
              const child = childArray[0] as { props?: { href?: string; url?: string }; type?: { name?: string } };
              // Check if it's a link with YouTube URL or already a YouTubeEmbed component
              if (child?.props?.href && /youtube\.com\/watch\?v=|youtu\.be\//.test(child.props.href)) {
                // Return just the embed without paragraph wrapper to avoid invalid HTML nesting
                return <YouTubeEmbed url={child.props.href} />;
              }
              // Check if child is already a YouTubeEmbed (from link renderer)
              if (child?.type?.name === 'YouTubeEmbed' || child?.props?.url) {
                return child as React.ReactElement;
              }
            }
            return <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...rest}>{children}</p>;
          },
          // Custom link renderer - if href is a YouTube URL, render embed instead
          a: (props: React.ComponentPropsWithoutRef<"a">) => {
            const { href, children, ...rest } = props;
            if (href && /youtube\.com\/watch\?v=|youtu\.be\//.test(href)) {
              // Return embed - parent paragraph will handle removing the <p> wrapper
              return <YouTubeEmbed url={href} />;
            }
            return (
              <a
                className="text-AzulEletrico hover:text-AzulCeu underline"
                href={href}
                {...rest}
              >
                {children}
              </a>
            );
          },
          // Custom div renderer for attention boxes
          div: (props: React.ComponentPropsWithoutRef<"div"> & { node?: Element }) => {
            const { node, children, className, ...rest } = props;
            const nodeClassName = (node?.properties?.className as string | string[] | undefined) || className || "";
            const classList = Array.isArray(nodeClassName) ? nodeClassName : [nodeClassName];
            const hasAttentionBox = classList.some((cls) => String(cls).includes("attention-box"));
            
            if (hasAttentionBox) {
              return <AttentionBox>{children}</AttentionBox>;
            }
            return <div className={typeof className === "string" ? className : undefined} {...rest}>{children}</div>;
          },
          // Custom blockquote renderer - check if it follows [!ATENTION]
          blockquote: (props: React.ComponentPropsWithoutRef<"blockquote"> & { node?: Element }) => {
            const { node, children, ...rest } = props;
            // Check if previous sibling or parent contains [!ATENTION]
            const parent = node && "parent" in node ? (node.parent as Element & { children?: Element[] }) : undefined;
            if (parent?.children && node) {
              const siblings = parent.children;
              const currentIndex = siblings.findIndex((child) => child === node);
              if (currentIndex > 0) {
                const prevSibling = siblings[currentIndex - 1];
                if (prevSibling?.type === "element" && 
                    "tagName" in prevSibling &&
                    prevSibling.tagName === "p" &&
                    prevSibling.children && 
                    Array.isArray(prevSibling.children) &&
                    prevSibling.children[0] &&
                    "value" in prevSibling.children[0] &&
                    String(prevSibling.children[0].value || "").includes("[!ATENTION]")) {
                  return <AttentionBox>{children}</AttentionBox>;
                }
              }
            }
            return (
              <blockquote className="border-l-4 border-AzulCeu pl-4 my-4 italic text-gray-600 dark:text-gray-400" {...rest}>
                {children}
              </blockquote>
            );
          },
          // Code block styling
          pre: (props: React.ComponentPropsWithoutRef<"pre">) => {
            const { children, ...rest } = props;
            return (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...rest}>
                {children}
              </pre>
            );
          },
          code: (props: React.ComponentPropsWithoutRef<"code"> & { inline?: boolean }) => {
            const { inline, className, children, ...rest } = props;
            return inline ? (
              <code
                className={`bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm ${className || ""}`}
                {...rest}
              >
                {children}
              </code>
            ) : (
              <code className={className || ""} {...rest}>
                {children}
              </code>
            );
          },
          // List styling
          ul: (props: React.ComponentPropsWithoutRef<"ul">) => {
            const { children, ...rest } = props;
            return <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300" {...rest}>{children}</ul>;
          },
          ol: (props: React.ComponentPropsWithoutRef<"ol">) => {
            const { children, ...rest } = props;
            return <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300" {...rest}>{children}</ol>;
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
      <style jsx global>{`
        .hljs {
          background: #1e1e1e;
          color: #d4d4d4;
        }
      `}</style>
    </div>
  );
}

