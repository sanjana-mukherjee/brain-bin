import { getBlogPosts } from "@/app/blog/utils";
import PreviewDisplay from "@/app/ui/components/blog/preview/display";
import PreviewCard from "@/app/ui/components/blog/preview/card";

export default async function LatestBlogs({
  type = "display",
}: {
  type?: "display" | "preview";
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
