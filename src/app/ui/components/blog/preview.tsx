import { getBlogPosts } from "@/app/blog/utils";
import { CustomMDX } from "../mdx";
import { BlogDate, Tags } from "../utils";
import Link from "next/link";

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

export async function LatestBlogs() {
  const posts = await getBlogPosts();
  return (
    <div className="grid grid-cols-1 gap-16 divide-y divide-slate-800">
      {posts.map(({ slug, frontmatter }) => (
        <PreviewCard key={slug} {...frontmatter} slug={slug} />
      ))}
    </div>
  );
}
