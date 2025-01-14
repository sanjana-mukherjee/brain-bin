import hljs from "highlight.js";
import "highlight.js/styles/night-owl.css";
// import "highlight.js/styles/tokyo-night-dark.css";
// import "highlight.js/styles/rose-pine.css";

function CodeBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const language = className?.replace("language-", "") || "text";
  const highlighted = hljs.highlightAuto(children?.toString() || "", [
    language,
  ]).value;

  return (
    <code
      className={`${className} mx-0.5 rounded bg-slate-700/50 px-2 font-mono text-sm ${language === "text" ? "text-yellow-100/90" : ""}`}
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}

function Pre({ children }: { children: React.ReactNode }) {
  return (
    <pre className="relative my-4 overflow-x-auto rounded-md bg-slate-800/50 px-8 py-4 text-sm scrollbar-thin scrollbar-track-slate-800/50 scrollbar-thumb-slate-700/80 [&_code]:rounded-none [&_code]:bg-transparent [&_code]:px-0">
      {children}
    </pre>
  );
}

export const codeComponents = {
  code: CodeBlock,
  pre: Pre,
};
