import { DirStructure, getDirStructure } from "@/app/blog/utils";
import { DocumentIcon, FolderIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

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
  const dirHasIndexMdx =
    folder.files.findIndex((file) => file === "index") !== -1;
  const dirOnlyHasIndexMdx =
    folder.folders.length === 0 &&
    folder.files.length === 1 &&
    folder.files[0] === "index";

  return (
    <div>
      <Link
        href={path}
        className={`mt-2 flex items-center gap-2 rounded px-2 py-1 hover:bg-slate-800/60 ${dirHasIndexMdx ? "text-slate-300" : "text-slate-400"} ${!dirOnlyHasIndexMdx ? "bg-slate-800/40" : ""}`}
      >
        {!dirHasIndexMdx ? (
          <FolderIcon className="h-4 w-4" />
        ) : (
          <DocumentIcon className="h-4 w-4 text-lime-200/90" />
        )}
        {folder.name.startsWith("_") ? "Blog" : folder.name}
      </Link>
      <ul
        className={`border-l-2 ${!dirOnlyHasIndexMdx ? "border-lime-200/40" : "border-transparent"} ml-3 pl-2`}
      >
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
  let dirStructure = getDirStructure(slug);
  let path = "/blog/" + slug.join("/");

  const hasOnlyIndexMdx =
    dirStructure.folders.length === 0 &&
    dirStructure.files.length === 1 &&
    dirStructure.files[0] === "index";

  if (hasOnlyIndexMdx) {
    const parentSlug = slug.slice(0, slug.length - 1);
    dirStructure = getDirStructure(parentSlug);
    path = "/blog/" + parentSlug.join("/");
  }

  return (
    <div className="rounded border-2 border-slate-800/40 p-2 pt-0">
      <Folder folder={dirStructure} path={path} />
    </div>
  );
}
