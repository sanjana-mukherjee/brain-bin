import { RenderMDX } from "@/app/ui/components/blog/markdown/index";
import { getBlogPost } from "../utils";
import Breadcrumbs from "@/app/ui/components/utils/breadcrumbs";
import Tags from "@/app/ui/components/blog/tags";
import BlogDate from "@/app/ui/components/blog/date";
import Structure from "@/app/ui/components/utils/structure";
import LatestBlogs from "@/app/ui/components/blog/preview/latest";

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
        <div className="order-1 flex flex-col gap-14 lg:order-2">
          <div>
            <Tags tags={frontmatter.tags} />
            <div className="mt-2">
              <BlogDate date={frontmatter.date} />
            </div>
          </div>
          <Structure slug={subDirs} />
          <div className="hidden lg:block">
            <LatestBlogs type="preview" />
          </div>
        </div>
        <RenderMDX content={content} />
      </div>
    </div>
  );
}
