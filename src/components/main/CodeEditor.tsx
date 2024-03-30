"use client";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";
import { useTranslation } from "react-i18next";
import NextPrevButton from "./NextPrevButton";
import { SNIPPETS_DICTIONARY } from "../../../public/mocks/snippets";
import { useState } from "react";

export default function CodeEditor() {
  const { t } = useTranslation();
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);

  const handlePrev = (e: any) => {
    e.preventDefault();
    const newCounter = activeSnippetIndex - 1;

    if (newCounter < 0) {
      setActiveSnippetIndex(Object.keys(SNIPPETS_DICTIONARY).length - 1);
    } else {
      setActiveSnippetIndex(newCounter);
    }
  };
  const handleNext = (e: any) => {
    e.preventDefault();
    const newCounter = activeSnippetIndex + 1;

    if (newCounter > Object.keys(SNIPPETS_DICTIONARY).length - 1) {
      setActiveSnippetIndex(0);
    } else {
      setActiveSnippetIndex(newCounter);
    }
  };

  return (
    <div className="w-[100%] md:w-[80%] h-[100%] flex flex-col justify-center items-center text-justify mt-4">
      <div className="flex flex-col md:flex-row w-[100%] h-fit justify-center items-center">
        <NextPrevButton handler={handlePrev} action="prev" />
        <h3 className="text-blue-chill-800 mt-4 font-bold text-lg p-2">
          {t(SNIPPETS_DICTIONARY[activeSnippetIndex].title)}
        </h3>
        <NextPrevButton handler={handleNext} action="next" />
      </div>

      <div className="flex flex-col md:flex-row gap-2 justify-center items-center m-2">
        <h5 className="font-bold">{t("Main.Snippets.why")}: </h5>
        <p className="font-light text-justify">
          {t(SNIPPETS_DICTIONARY[activeSnippetIndex].description)}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-2 justify-center items-center m-2">
        <h5 className="font-bold">{t("Main.Snippets.platform")}: </h5>
        <p className="font-light text-justify">
          {SNIPPETS_DICTIONARY[activeSnippetIndex].platform}
        </p>
        <h5 className="font-bold">{t("Main.Snippets.types")}: </h5>
        <p className="font-light text-justify">
          {t(SNIPPETS_DICTIONARY[activeSnippetIndex].type)}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-2 justify-center items-center m-2">
        <h5 className="font-bold">{t("Main.Snippets.solution")}: </h5>
        <p className="font-light text-justify">
          {t(SNIPPETS_DICTIONARY[activeSnippetIndex].solution)}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-2 justify-center items-center m-2">
        <h5 className="font-bold">{t("Main.Snippets.complexity")}: </h5>
        <p className="font-light text-justify">
          {t(SNIPPETS_DICTIONARY[activeSnippetIndex].complexityAnalysis)}
        </p>
      </div>
      <AceEditor
        mode="javascript"
        theme="solarized_dark"
        value={SNIPPETS_DICTIONARY[activeSnippetIndex].code}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        readOnly={true}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}
        style={{ width: "100%", height: "400px" }}
      />
      <small className="font-light">
        <i>{t("Main.Snippets.small")}</i>
      </small>
    </div>
  );
}
