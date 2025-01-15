import { CustomMDX } from "@/app/ui/components/blog/markdown/index";
import Tags from "@/app/ui/components/blog/tags";
import BlogDate from "@/app/ui/components/blog/date";
import Link from "next/link";

export default function PreviewDisplay({
  slug,
  title,
  tags,
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
    <div className="pt-16">
      <Link href={`/blog/${slug}`} className="group">
        <div className="relative grid grid-cols-[1.8fr_1fr] gap-x-10 gap-y-5 rounded-sm">
          <h3 className="col-span-2 line-clamp-2 text-2xl font-semibold italic text-teal-200/90">
            {title}
          </h3>
          <div className="group-hover:scale-110 [&>pre]:my-0 [&>pre_code]:text-xs">
            <CustomMDX source={code} />
          </div>
          <div className="">
            <p className="text-xs text-slate-400">We talk about: </p>
            <div className="text-sm [&_code]:text-xs">
              <CustomMDX source={summary} />
            </div>
          </div>
          <Tags tags={tags} variant={"small"} />
          <div className="text-right">
            <BlogDate date={date} />
          </div>
        </div>
      </Link>
    </div>
  );
}
