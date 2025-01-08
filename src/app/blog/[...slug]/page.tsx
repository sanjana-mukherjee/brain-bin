import { RenderMDX } from "@/app/ui/components/mdx";
import { getBlogPost } from "../utils";
import { BlogDate, Breadcrumbs, Tags } from "@/app/ui/components/utils";
import Structure from "@/app/ui/components/structure";
import { LatestBlogs } from "@/app/ui/components/blog/preview";

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await props.params;
  const blog = await getBlogPost(slug);
  if (!blog) {
    return (
      <div className="flex flex-col gap-6">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Blog", path: "blog" },
            ...slug.map((dir) => ({ label: dir })),
          ]}
        />
        <Structure slug={slug} />
      </div>
    );
  }
  const { content, frontmatter, subDirs } = blog;

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Blog", path: "blog" },
          ...slug.map((dir) => ({ label: dir })),
        ]}
      />
      <div className="grid grid-cols-1 gap-y-3 lg:grid-cols-[minmax(0,2.5fr)_1fr] lg:gap-x-10 xl:gap-x-16">
        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <Tags tags={frontmatter.tags} />
          <BlogDate date={frontmatter.date} />
          <div className="my-10 border-y border-slate-800 py-10">
            <Structure slug={subDirs} />
          </div>
          <div className="hidden lg:block">
            <LatestBlogs type="preview" />
          </div>
        </div>
        <RenderMDX content={content} />
      </div>
    </div>
  );
}
