import { RenderMDX } from "@/app/ui/components/mdx";
import { getBlogPost } from "../utils";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/app/ui/components/utils";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const blog = await getBlogPost(slug);
  if (!blog) {
    notFound();
  }
  const { content, frontmatter, subDirs } = blog;

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Blog", path: "blog" },
          ...subDirs.map((dir) => ({ label: dir })),
        ]}
      />
      <div className="grid grid-cols-1 gap-y-3 lg:grid-cols-[minmax(0,2.5fr)_1fr] lg:gap-x-10 xl:gap-x-16">
        <RenderMDX content={content} frontmatter={frontmatter} />
      </div>
    </div>
  );
}
