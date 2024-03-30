"use client";

import CodeEditor from "./CodeEditor";

export default function CodeEditorBox(props: any) {
  return (
    <div className="w-[100%] h-[100%] flex flex-row justify-center items-start font-lg gap-4">
      <CodeEditor />
    </div>
  );
}
