import { getDirStructure } from "@/app/blog/utils";

export default function Structure({ slug }: { slug: string[] }) {
  const dirStructure = getDirStructure(slug);

  return (
    <>
      <p>Current pathname: {slug.join("/")}</p>
      <p>dirStructure: {JSON.stringify(dirStructure)}</p>
    </>
  );
}
