import { formatDistanceToNow } from "date-fns";

export default function BlogDate({ date }: { date: string }) {
  const istDate = new Date(date + " GMT+0530");
  const elapsedTime = formatDistanceToNow(istDate, { addSuffix: true });

  return (
    <p className="text-xs font-thin italic text-slate-300">
      <span className="text-slate-400">Created:</span>{" "}
      {elapsedTime.charAt(0).toUpperCase() + elapsedTime.slice(1)}
    </p>
  );
}
