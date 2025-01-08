import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const TAG_COLORS = [
  "text-lime-200/90  bg-lime-200/10",
  "text-teal-200/90  bg-teal-200/10",
  "text-purple-300/90  bg-purple-300/10",
  "text-orange-200/90  bg-orange-200/10",
  "text-pink-400 bg-pink-400/10",
];

export function Tags({
  tags,
  variant = "normal",
}: {
  tags: string[];
  variant?: "small" | "normal";
}) {
  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-3">
      {tags.map((tag, i) => (
        <li
          key={i}
          className={`rounded-full px-4 py-1 ${variant === "small" ? "text-xs" : "text-sm"} font-thin ${TAG_COLORS[i % TAG_COLORS["length"]]}`}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export function BlogDate({ date }: { date: string }) {
  const istDate = new Date(date + " GMT+0530");
  const elapsedTime = formatDistanceToNow(istDate, { addSuffix: true });

  return (
    <p className="text-xs font-thin italic text-slate-300">
      <span className="text-slate-400">Created:</span>{" "}
      {elapsedTime.charAt(0).toUpperCase() + elapsedTime.slice(1)}
    </p>
  );
}

export function Breadcrumbs({
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
