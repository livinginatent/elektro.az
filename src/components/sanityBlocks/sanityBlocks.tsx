/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

export const sanityBlocks = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={value.url || "/placeholder.svg"}
          alt={value.alt || "Blog image"}
          className="w-full h-auto border border-slate-200"
        />
        {value.caption && (
          <p className="text-center text-slate-600 mt-3 text-sm">
            {value.caption}
          </p>
        )}
      </div>
    ),
    code: ({ value }: any) => (
      <pre className="bg-slate-900 text-slate-100 p-6 overflow-x-auto my-6 font-mono text-sm">
        <code>{value.code}</code>
      </pre>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-slate-900 mb-6 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-slate-700 leading-relaxed mb-4 text-base">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-slate-900 pl-6 py-2 my-6 bg-slate-50 italic text-slate-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700 ml-4">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-slate-700 ml-4">
        {children}
      </ol>
    ),
  },
  listItem: ({ children }: any) => (
    <li className="text-slate-700 leading-relaxed">{children}</li>
  ),
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-900 hover:text-slate-700 underline font-medium"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-slate-800">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-slate-100 text-slate-800 px-2 py-1 text-sm font-mono">
        {children}
      </code>
    ),
  },
};
