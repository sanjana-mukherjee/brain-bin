import { DirStructure, getDirStructure } from "@/app/blog/utils";
import { DocumentIcon, FolderIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Breadcrumbs } from "./utils";

function File({ fileName, path }: { fileName: string; path: string }) {
  if (fileName === "index") return;
  return (
    <Link
      href={path}
      className={`mt-2 flex items-center gap-2 rounded px-2 py-1 text-slate-300 hover:bg-slate-800/60`}
    >
      <DocumentIcon className="h-4 w-4 text-lime-200/90" />
      {fileName}
    </Link>
  );
}

function Folder({ folder, path }: { folder: DirStructure; path: string }) {
  const hasIndexMdxDir =
    folder.files.findIndex((file) => file === "index") !== -1;
  const hasOnlyIndexMdxDir =
    folder.files.length === 1 && folder.files[0] === "index";

  return (
    <div
      className={`border-l-2 ${!hasOnlyIndexMdxDir ? "border-lime-200/40" : "border-transparent"}`}
    >
      <Link
        href={path}
        className={`mt-2 flex items-center gap-2 rounded px-2 py-1 hover:bg-slate-800/60 ${hasIndexMdxDir ? "text-slate-300" : "text-slate-400"} ${!hasOnlyIndexMdxDir ? "bg-slate-800/40" : ""}`}
      >
        {!hasIndexMdxDir ? (
          <FolderIcon className="h-4 w-4" />
        ) : (
          <DocumentIcon className="h-4 w-4 text-lime-200/90" />
        )}
        {folder.name}
      </Link>
      <ul className="pl-10">
        {folder.folders.map((fld) => (
          <li key={fld.name}>
            <Folder folder={fld} path={path + "/" + fld.name} />
          </li>
        ))}
        {folder.files.map((file) => (
          <li key={file}>
            <File fileName={file} path={path + "/" + file} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Structure({ slug }: { slug: string[] }) {
  const dirStructure = getDirStructure(slug);
  const path = "/blog/" + slug.join("/");

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Blog", path: "blog" },
          ...slug.map((dir) => ({ label: dir })),
        ]}
      />
      <div>
        <Folder folder={dirStructure} path={path} />
      </div>
    </div>
  );
}
