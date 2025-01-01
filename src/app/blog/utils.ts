import fs from "fs";
import path from "path";

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return rawContent;
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((fileName) => {
    const rawContent = readMDXFile(path.join(dir, fileName));
    const slug = path.basename(fileName, path.extname(fileName));

    return { slug, rawContent };
  });
}

export function getBlogPosts() {
  const blogDir = path.join(process.cwd(), "src", "app", "blog", "_posts");
  const blogPosts = getMDXData(blogDir);
  return blogPosts;
}

export function getBlogPost(slug: string) {
  const blogPosts = getBlogPosts();
  return blogPosts.find((blog) => blog.slug === slug);
}
