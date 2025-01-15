import { CustomMDX } from "@/app/ui/components/blog/markdown/index";
import BlogDate from "@/app/ui/components/blog/date";
import Link from "next/link";

export default function PreviewCard({
  slug,
  title,
  date,
  code,
  summary,
}: {
  slug: string;
  title: string;
  tags: string[];
  date: string;
  code: string;
  summary: string;
}) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group h-full grayscale transition hover:grayscale-0"
    >
      <div className="flex h-full flex-col rounded-md border-2 border-slate-800/50 [&>pre]:mt-0">
        <div className="[&>pre]:my-0 [&>pre]:h-36 [&>pre]:overflow-hidden [&_code]:inline-block [&_code]:-translate-x-6 [&_code]:-translate-y-16 [&_code]:-rotate-12 [&_code]:opacity-70 [&_pre]:rounded-b-none">
          <CustomMDX source={code} />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="line-clamp-2 text-xl font-semibold italic text-teal-200/90">
            {title}
          </h3>
          <BlogDate date={date} />
          <div className="my-4 line-clamp-3 text-sm font-thin text-slate-400 [&_code]:mx-0 [&_code]:text-xs [&_ul]:m-0 [&_ul]:p-0">
            <CustomMDX source={summary} />
          </div>
          {/* <div className="mt-auto">
            <Tags tags={tags} variant={"small"} />
          </div> */}
        </div>
      </div>
    </Link>
  );
}
