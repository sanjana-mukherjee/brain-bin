import Link from "next/link";

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

export const linkComponents = {
  a: CustomLink,
};
