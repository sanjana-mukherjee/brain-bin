const TAG_COLORS = [
  "text-lime-200/90  bg-lime-200/10",
  "text-teal-200/90  bg-teal-200/10",
  "text-purple-300/90  bg-purple-300/10",
  "text-orange-200/90  bg-orange-200/10",
  "text-pink-400 bg-pink-400/10",
];

export default function Tags({
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
