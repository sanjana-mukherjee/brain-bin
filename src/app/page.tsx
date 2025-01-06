import Link from "next/link";

export default function Page() {
  return (
    <Link href="/blog" className="text-sky-400 hover:underline">
      Blogs
    </Link>
  );
}
