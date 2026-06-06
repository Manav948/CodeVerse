"use client";

import React, { useState } from "react";
import { Copy, Check, FileCode } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  text: string;
}

interface ParsedBlock {
  type: "text" | "code-block";
  content: string;
  language?: string;
}

interface ParsedInline {
  type: "text" | "inline-code";
  content: string;
}

export const FormattedContent = ({ text }: Props) => {
  if (!text) return null;

  // Split by code blocks: ```, ***, or lines of slashes/asterisks on separate lines
  const blockRegex = /(?:^|\n)(?:```|[*]{3,}|[*/]{3,}|[-]{3,})[^\n]*\n([\s\S]*?)\n(?:```|[*]{3,}|[*/]{3,}|[-]{3,})[^\n]*(?:\n|$)/g;
  const blocks: ParsedBlock[] = [];
  let currentIndex = 0;
  let match;

  while ((match = blockRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    const matchLength = match[0].length;
    const codeContent = match[1];

    // Text before the block
    if (matchIndex > currentIndex) {
      blocks.push({
        type: "text",
        content: text.slice(currentIndex, matchIndex),
      });
    }

    // Try to parse language from code block (e.g. ```javascript\n...)
    let displayCode = codeContent;
    let language = "";
    const firstLineEnd = codeContent.indexOf("\n");
    if (firstLineEnd !== -1) {
      const firstLine = codeContent.substring(0, firstLineEnd).trim();
      if (firstLine && /^[a-zA-Z0-9+#-]+$/.test(firstLine) && firstLine.length < 15) {
        language = firstLine;
        displayCode = codeContent.substring(firstLineEnd + 1);
      }
    }

    blocks.push({
      type: "code-block",
      content: displayCode,
      language: language,
    });

    currentIndex = matchIndex + matchLength;
  }

  if (currentIndex < text.length) {
    blocks.push({
      type: "text",
      content: text.slice(currentIndex),
    });
  }

  const renderInlineStyles = (rawText: string) => {
    if (!rawText) return "";

    const parts = [];
    const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(rawText)) !== null) {
      const matchIndex = match.index;
      const matchedText = match[0];

      if (matchIndex > lastIndex) {
        parts.push(rawText.slice(lastIndex, matchIndex));
      }

      if (matchedText.startsWith("`") && matchedText.endsWith("`")) {
        parts.push(
          <code
            key={matchIndex}
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
            className="mx-1 px-1.5 py-0.5 rounded bg-white/8 text-white/95 text-[12px] border border-white/4"
          >
            {matchedText.slice(1, -1)}
          </code>
        );
      } else if (matchedText.startsWith("**") && matchedText.endsWith("**")) {
        parts.push(
          <strong key={matchIndex} className="font-semibold text-white/95">
            {matchedText.slice(2, -2)}
          </strong>
        );
      }

      lastIndex = matchIndex + matchedText.length;
    }

    if (lastIndex < rawText.length) {
      parts.push(rawText.slice(lastIndex));
    }

    return parts.length > 0 ? parts : rawText;
  };

  const renderFormattedLine = (line: string, lineKey: string | number) => {
    if (line.startsWith("# ")) {
      return (
        <h1 key={lineKey} className="text-[17px] sm:text-[18px] font-bold text-white mt-4 mb-2 first:mt-1">
          {renderInlineStyles(line.slice(2))}
        </h1>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h2 key={lineKey} className="text-[15px] sm:text-[16px] font-bold text-white/95 mt-3 mb-1.5 first:mt-1">
          {renderInlineStyles(line.slice(3))}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      return (
        <h3 key={lineKey} className="text-[14px] sm:text-[14.5px] font-semibold text-white/90 mt-2.5 mb-1 first:mt-1">
          {renderInlineStyles(line.slice(4))}
        </h3>
      );
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      return (
        <li key={lineKey} className="list-disc list-inside ml-2.5 text-white/75 my-1 leading-relaxed">
          {renderInlineStyles(line.slice(2))}
        </li>
      );
    }

    return (
      <div key={lineKey} className="min-h-[1.2rem] whitespace-pre-wrap wrap-break-words leading-relaxed text-white/75">
        {renderInlineStyles(line)}
      </div>
    );
  };

  return (
    <div className="space-y-3.5 text-[13.5px] sm:text-[14px] text-white/75">
      {blocks.map((block, bIdx) => {
        if (block.type === "code-block") {
          return (
            <CodeBlock
              key={bIdx}
              code={block.content}
              language={block.language}
            />
          );
        }

        const lines = block.content.split("\n");
        return (
          <div key={bIdx} className="space-y-1.5">
            {lines.map((line, lIdx) => renderFormattedLine(line, `${bIdx}-${lIdx}`))}
          </div>
        );
      })}
    </div>
  );
};

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Code copied");
  };

  return (
    <div className="rounded-lg overflow-hidden border border-white/6 bg-[#070708] my-3">
      {/* Code window header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/1">
        <div className="flex items-center gap-2">
          {/* Red, Yellow, Green mock dots */}
          <div className="flex gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/60"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/60"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/60"></span>
          </div>
          <FileCode size={13} className="text-white/30" />
          <span className="text-[11px] font-mono text-white/40 font-medium">
            {language || "code"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/4 hover:bg-white/8 border border-white/6 text-[11px] text-white/50 hover:text-white transition-all active:scale-95 cursor-pointer"
        >
          {copied ? (
            <Check size={12} className="text-emerald-400" />
          ) : (
            <Copy size={12} />
          )}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>

      {/* Code contents */}
      <pre
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
        className="p-4 text-[12.5px] overflow-x-auto text-white/80 leading-relaxed whitespace-pre bg-white/10"
      >
        <code style={{ fontFamily: 'inherit' }}>{code.trim()}</code>
      </pre>
    </div>
  );
};
