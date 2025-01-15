import { slugify } from "@/lib/utils";
import Link from "next/link";

function BlogH1({ children }: { children: React.ReactNode }) {
  const slug = slugify(children?.toString() || "");

  return (
    <h1
      className="mb-4 text-5xl font-bold text-yellow-100/90 [&_code]:text-inherit [&_code]:[font-size:inherit]"
      id={slug}
    >
      {children}
      <BlogHeadingLink slug={slug} />
    </h1>
  );
}

function BlogH2({ children }: { children: React.ReactNode }) {
  const slug = slugify(children?.toString() || "");

  return (
    <h2
      className="mt-10 text-3xl font-bold italic text-lime-200/90 [&_code]:italic [&_code]:text-inherit [&_code]:[font-size:inherit]"
      id={slug}
    >
      {children}
      <BlogHeadingLink slug={slug} />
    </h2>
  );
}

function BlogH3({ children }: { children: React.ReactNode }) {
  const slug = slugify(children?.toString() || "");

  return (
    <h3
      className="mt-8 text-2xl font-semibold italic text-teal-200/90 [&_code]:italic [&_code]:text-inherit [&_code]:[font-size:inherit]"
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
      className="mt-7 text-xl font-medium italic text-purple-300/90 [&_code]:italic [&_code]:text-inherit [&_code]:[font-size:inherit]"
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
      className="mt-6 text-lg font-normal italic text-orange-200/90 [&_code]:italic [&_code]:text-inherit [&_code]:[font-size:inherit]"
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
    <h6
      className="mt-6 text-base font-normal italic text-pink-400 [&_code]:italic [&_code]:text-inherit [&_code]:[font-size:inherit]"
      id={slug}
    >
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

export const headingComponents = {
  h1: BlogH1,
  h2: BlogH2,
  h3: BlogH3,
  h4: BlogH4,
  h5: BlogH5,
  h6: BlogH6,
};
