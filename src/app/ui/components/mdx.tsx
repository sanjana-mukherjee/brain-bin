import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import hljs from "highlight.js";
import "highlight.js/styles/night-owl.css";
// import "highlight.js/styles/tokyo-night-dark.css";
// import "highlight.js/styles/rose-pine.css";

import React from "react";
import { space_mono } from "../fonts";

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function BlogH1({ children }: { children: React.ReactNode }) {
  const slug = slugify(children?.toString() || "");

  return (
    <h1 className="mt-12 text-5xl font-bold text-yellow-100/90" id={slug}>
      {children}
      <BlogHeadingLink slug={slug} />
    </h1>
  );
}

function BlogH2({ children }: { children: React.ReactNode }) {
  const slug = slugify(children?.toString() || "");

  return (
    <h2 className="mt-10 text-3xl font-bold italic text-lime-200/90" id={slug}>
      {children}
      <BlogHeadingLink slug={slug} />
    </h2>
  );
}

function BlogH3({ children }: { children: React.ReactNode }) {
  const slug = slugify(children?.toString() || "");

  return (
    <h3
      className="mt-8 text-2xl font-semibold italic text-teal-200/90"
      id={slug}
    >
      {children}
      <BlogHeadingLink slug={slug} />
    </h3>
  );
}

function BlogH4({ children }: { children: React.ReactNode }) {
  const slug = slugify(children?.toString() || "");

  return (
    <h4
      className="mt-7 text-xl font-medium italic text-purple-300/90"
      id={slug}
    >
      {children}
      <BlogHeadingLink slug={slug} />
    </h4>
  );
}

function BlogH5({ children }: { children: React.ReactNode }) {
  const slug = slugify(children?.toString() || "");

  return (
    <h5
      className="mt-6 text-lg font-normal italic text-orange-200/90"
      id={slug}
    >
      {children}
      <BlogHeadingLink slug={slug} />
    </h5>
  );
}

function BlogH6({ children }: { children: React.ReactNode }) {
  const slug = slugify(children?.toString() || "");

  return (
    <h6 className="mt-6 text-base font-normal italic text-pink-400" id={slug}>
      {children}
      <BlogHeadingLink slug={slug} />
    </h6>
  );
}

function BlogHeadingLink({ slug }: { slug: React.ReactNode }) {
  return (
    <Link
      href={`#${slug}`}
      className="ml-[0.5em] inline-block translate-y-px font-bold italic text-slate-500/50 hover:text-slate-500/70"
    >
      #
    </Link>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="mt-3">{children}</p>;
}

function CodeBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const language = className?.replace("language-", "") || "";
  const highlighted = hljs.highlightAuto(
    children?.toString() || "",
    language ? [language] : undefined,
  ).value;

  return (
    <code
      className={`${space_mono.className} ${className} mx-0.5 rounded bg-slate-700/50 px-2 text-sm`}
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}

function Pre({ children }: { children: React.ReactNode }) {
  return (
    <pre className="relative my-4 rounded-md bg-slate-800/50 px-8 py-4 text-sm [&>code]:rounded-none [&>code]:bg-transparent [&>code]:px-0">
      {children}
    </pre>
  );
}

function Divider() {
  return <hr className="my-7 border-2 border-slate-800/60" />;
}

function UnorderedList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-3 list-[revert] pl-8 marker:text-lime-300">{children}</ul>
  );
}

function OrderedList({ children }: { children: React.ReactNode }) {
  return (
    <ol className="my-3 list-[revert] pl-8 marker:text-lime-300 [&>li]:pl-2">
      {children}
    </ol>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return <li className="">{children}</li>;
}

function Strong({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-purple-300/90">{children}</strong>
  );
}

function Em({ children }: { children: React.ReactNode }) {
  return <em className="italics text-orange-300">{children}</em>;
}

function CustomLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const className =
    "underline focus:outline focus:outline-2 focus:outline-blue-400/10 [text-underline-offset:2.5px] text-blue-400 hover:text-sky-400/80";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={className}
    >
      {children}
    </a>
  );
}

function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="relative my-4 rounded-md bg-slate-800/50 px-8 py-4 text-sm italic text-yellow-100/90 [&>p:nth-of-type(1)]:mt-0">
      <span className="absolute bottom-2 left-3 top-2 w-1 bg-slate-400/60" />
      {children}
    </blockquote>
  );
}

const components = {
  h1: BlogH1,
  h2: BlogH2,
  h3: BlogH3,
  h4: BlogH4,
  h5: BlogH5,
  h6: BlogH6,
  p: Paragraph,
  a: CustomLink,
  code: CodeBlock,
  pre: Pre,
  hr: Divider,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  strong: Strong,
  em: Em,
  blockquote: Blockquote,
};

export function CustomMDX(props: { source: string }) {
  return (
    <div className="max-w-4xl font-thin leading-relaxed">
      <MDXRemote {...props} components={components} />
    </div>
  );
}
