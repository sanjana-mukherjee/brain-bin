import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { components } from "../ui/components/mdx";

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return rawContent;
}

async function getMDXData(rawContent: string) {
  const { frontmatter, content } = await compileMDX<{
    title: string;
    date: string;
    tags: string[];
    code: string;
    summary: string;
  }>({ source: rawContent, options: { parseFrontmatter: true }, components });
  return { frontmatter, content };
}

async function fetchPosts(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (fileName) => {
      const rawContent = readMDXFile(path.join(dir, fileName));
      const { frontmatter, content } = await getMDXData(rawContent);
      const slug = path.basename(fileName, path.extname(fileName));

      return { slug, frontmatter, content };
    }),
  );
}

export async function getBlogPosts() {
  const blogDir = path.join(process.cwd(), "src", "app", "blog", "_posts");
  const blogPosts = await fetchPosts(blogDir);
  return blogPosts;
}

export async function getBlogPost(slug: string) {
  const blogPosts = await getBlogPosts();
  return blogPosts.find((blog) => blog.slug === slug);
}
