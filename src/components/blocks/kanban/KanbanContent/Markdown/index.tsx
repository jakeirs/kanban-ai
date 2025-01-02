"use client";

import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  content: string | undefined;
}

export const Markdown = ({ content }: MarkdownProps) => {
  if (!content) {
    return null;
  }

  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
        ),
        code: ({ children }) => (
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {children}
          </code>
        ),
        blockquote: ({ children }) => (
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
