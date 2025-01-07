import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { components } from "../ui/components/mdx";

function getAllMDXFiles(
  dir: string,
  subDirs: string[] = [],
): { fileName: string; subDirs: string[] }[] {
  const entries = fs.readdirSync(path.join(dir, ...subDirs), {
    withFileTypes: true,
  });

  const mdxFiles = entries
    .filter((entry) => entry.isFile() && path.extname(entry.name) === ".mdx")
    .map((file) => ({ fileName: file.name, subDirs }));

  const subDirFiles = entries
    .filter((entry) => entry.isDirectory())
    .flatMap((subDir) => getAllMDXFiles(dir, [...subDirs, subDir.name]));

  return [...mdxFiles, ...subDirFiles];
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
  const mdxFiles = getAllMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async ({ fileName, subDirs }) => {
      const rawContent = readMDXFile(path.join(dir, ...subDirs, fileName));
      const { frontmatter, content } = await getMDXData(rawContent);
      const fileNameWOExt = path.basename(fileName, path.extname(fileName));
      const slug = [...subDirs, fileNameWOExt].join("/");

      return { slug, frontmatter, content, subDirs };
    }),
  );
}

const BLOG_DIR = path.join(process.cwd(), "src", "app", "blog", "_posts");

export async function getBlogPosts() {
  const blogPosts = await fetchPosts(BLOG_DIR);
  return blogPosts;
}

export async function getBlogPost(slugs: string[]) {
  const blogPosts = await getBlogPosts();
  const slug = slugs.join("/");
  return blogPosts.find((blog) => blog.slug === slug);
}

export interface DirStructure {
  [x: string]: {
    files: string[];
    folders: DirStructure[];
  };
}

function getSubDirStructure(dir: string): DirStructure {
  const dirName = path.basename(dir);

  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  const mdxFiles = entries
    .filter((entry) => entry.isFile() && path.extname(entry.name) === ".mdx")
    .map((file) => file.name);

  const subDirStructure = entries
    .filter((entry) => entry.isDirectory())
    .map((subDir) => getSubDirStructure(path.join(dir, subDir.name)));

  return { [dirName]: { files: mdxFiles, folders: subDirStructure } };
}

export function getDirStructure(slug: string[]) {
  const pathName = path.join(BLOG_DIR, ...slug);
  return getSubDirStructure(pathName);
}
