import { formatDistanceToNow } from "date-fns";

const TAG_COLORS = [
  "text-lime-200/90  bg-lime-200/10",
  "text-teal-200/90  bg-teal-200/10",
  "text-purple-300/90  bg-purple-300/10",
  "text-orange-200/90  bg-orange-200/10",
  "text-pink-400 bg-pink-400/10",
];

export function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <li
          key={i}
          className={`rounded-full px-4 py-1 text-sm font-thin ${TAG_COLORS[i % TAG_COLORS["length"]]}`}
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
