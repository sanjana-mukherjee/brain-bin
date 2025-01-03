import { LatestBlogs } from "./ui/components/blog/preview";

export default function Home() {
  return (
    <main>
      <h2 className="text-5xl font-bold text-yellow-100/90">Latest Blogs</h2>
      <div className="mt-12">
        <LatestBlogs />
      </div>
    </main>
  );
}
