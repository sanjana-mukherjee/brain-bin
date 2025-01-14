function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="mt-3">{children}</p>;
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-orange-300">{children}</strong>;
}

function Em({ children }: { children: React.ReactNode }) {
  return <em className="italics text-purple-300/90">{children}</em>;
}

function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="relative my-4 rounded-md bg-slate-800/50 px-8 py-4 text-sm italic text-yellow-100/90 [&>p:nth-of-type(1)]:mt-0">
      <span className="absolute bottom-2 left-3 top-2 w-1 bg-slate-400/60" />
      {children}
    </blockquote>
  );
}

export const typographyComponents = {
  p: Paragraph,
  strong: Strong,
  em: Em,
  blockquote: Blockquote,
};
