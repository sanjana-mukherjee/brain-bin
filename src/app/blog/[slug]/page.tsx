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
    <main className="mx-16 my-12">
      <CustomMDX source={content} />
    </main>
  );
}
