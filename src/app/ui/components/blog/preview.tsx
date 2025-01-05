import { getBlogPosts } from "@/app/blog/utils";
import { CustomMDX } from "../mdx";
import { BlogDate, Tags } from "../utils";
import Link from "next/link";

export function PreviewDisplay({
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

export function PreviewCard({
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
    <Link
      href={`/blog/${slug}`}
      className="group h-full grayscale transition hover:grayscale-0"
    >
      <div className="flex h-full flex-col rounded-md border-2 border-slate-800/50 [&>pre]:mt-0">
        <div className="[&>pre]:my-0 [&>pre]:h-56 [&>pre]:overflow-hidden [&_code]:inline-block [&_code]:-translate-x-10 [&_code]:-translate-y-10 [&_code]:-rotate-12 [&_code]:opacity-70 [&_pre]:rounded-b-none">
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
          <div className="mt-auto">
            <Tags tags={tags} variant={"small"} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export async function LatestBlogs({
  type = "display",
}: {
  type: "display" | "preview";
}) {
  const posts = await getBlogPosts();

  if (type === "display") {
    return (
      <div className="grid grid-cols-1 gap-16 divide-y divide-slate-800">
        {posts.map(({ slug, frontmatter }) => (
          <PreviewDisplay key={slug} {...frontmatter} slug={slug} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5">
      {posts.map(({ slug, frontmatter }) => (
        <PreviewCard key={slug} {...frontmatter} slug={slug} />
      ))}
    </div>
  );
}
