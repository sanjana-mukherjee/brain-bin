import Link from "next/link";

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: { label: string; path?: string; active?: boolean }[];
}) {
  const activeIndex = breadcrumbs.findIndex(({ active }, i) =>
    active === true ? active : i === breadcrumbs["length"] - 1,
  );

  const breadcrumbsWithHref = breadcrumbs.reduce(
    (crumbs, { label, path, active }, index) => [
      ...crumbs,
      {
        label: decodeURIComponent(label),
        href:
          (crumbs[crumbs["length"] - 1]?.href || "") +
          "/" +
          (path ? path : label),
        active: active || index === activeIndex,
      },
    ],
    [] as Array<{ label: string; href: string; active: boolean }>,
  );

  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className="flex text-sm">
        {breadcrumbsWithHref.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={breadcrumb.active ? "text-slate-200" : "text-slate-400"}
          >
            <Link href={breadcrumb.href} className="hover:underline">
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
