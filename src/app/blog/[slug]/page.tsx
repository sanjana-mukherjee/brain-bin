import { CustomMDX } from "@/app/ui/components/mdx";
import { getBlogPost } from "../utils";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const blog = getBlogPost(slug);
  if (!blog) {
    notFound();
  }
  const { rawContent: content } = blog;

  return (
    <div className="mx-16 my-12">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3.25fr)_1fr] lg:gap-x-10 xl:gap-x-24">
        <CustomMDX source={content} />
      </div>
    </div>
  );
}
