import { MDXRemote } from "next-mdx-remote/rsc";
import { JSXElementConstructor, ReactElement } from "react";
import { codeComponents } from "@/app/ui/components/markdown/code";
import { dividerComponents } from "@/app/ui/components/markdown/divider";
import { headingComponents } from "@/app/ui/components/markdown/heading";
import { linkComponents } from "@/app/ui/components/markdown/link";
import { listComponents } from "@/app/ui/components/markdown/list";
import { typographyComponents } from "@/app/ui/components/markdown/typography";

export const components = {
  ...codeComponents,
  ...dividerComponents,
  ...headingComponents,
  ...linkComponents,
  ...listComponents,
  ...typographyComponents,
};

export function CustomMDX({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}

export async function RenderMDX({
  content,
}: {
  content: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
}) {
  return (
    <div className="order-2 font-thin leading-relaxed lg:order-1">
      {content}
    </div>
  );
}
