"use client";
import {
  mainStackDictionary,
  OtherTechsDictionary,
} from "../../../public/mocks/stacks";
import StackList from "./StackList";
import { useTranslation } from "react-i18next";

export default function TechsPreview() {
  const { t } = useTranslation();

  return (
    <>
      <article className="w-[100%] h-[50%] flex flex-col justify-start items-center m-4">
        <div className="flex flex-col justify-center items-center p-2 w-[100%]">
          <h2 className="font-bold text-2xl text-center mt-4">
            {t("Main.Snippets.TechsTitle")}
            <span className="fadeInNoDelay">.</span>
            <span className="fadeInDelayOne">.</span>
            <span className="fadeInDelayTwo">.</span>
          </h2>
          <div className="flex flex-col justify-center items-center w-[100%] mt-6">
            <h3 className="text-xl text-center font-bold mt-2">
              {t("Main.StackTitle")}
            </h3>

            <div className="w-[100%] md:w-[50%] flex flex-col md:flex-row row-span-4 justify-center items-center gap-2 mt-4 p-2 text-xl">
              <StackList stack={mainStackDictionary} />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-[100%] text-justify p-2 text-md mt-6">
            <strong>
              <h3 className="text-xl text-center">
                {t("Main.OtherStackTitle")}
              </h3>
            </strong>
            <div className="w-[100%] md:w-[50%] flex flex-col md:flex-row justify-center items-center gap-2 mt-4 p-2 text-xl">
              <StackList stack={OtherTechsDictionary} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
