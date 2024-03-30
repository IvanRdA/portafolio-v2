"use client";

import CodeEditorBox from "./CodeEditorBox";
import { useTranslation } from "react-i18next";

export default function Snippets(props: any) {
  const { t } = useTranslation();

  return (
    <>
      <article className="w-[100%] h-[50%] flex flex-col justify-center items-center m-4">
        <div className="flex flex-row justify-center items-center p-2 m-1 h-[100%] w-[100%]">
          <div className="w-[100%] md:w-[80%] h-[100%]">
            <h2 className="font-bold text-xl text-center mt-4">
              {t("Main.Snippets.SnippetsTitle")}
              <span className="fadeInNoDelay">.</span>
              <span className="fadeInDelayOne">.</span>
              <span className="fadeInDelayTwo">.</span>
            </h2>

            <CodeEditorBox />
          </div>
        </div>
      </article>
    </>
  );
}
