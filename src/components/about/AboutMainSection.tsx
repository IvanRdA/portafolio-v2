"use client";

import { useTranslation } from "react-i18next";
import { HOBBIES_DICTIONARY } from "../../../public/mocks/hobbies";
import SingleHobby from "./SingleHobby";

export default function AboutMainSection() {
  const { t } = useTranslation();
  return (
    <div className="p-2 m-1 h-[100%] w-[100%]">
      <h2 className="font-bold text-2xl text-center mt-8">
        {t("About.Title")}
      </h2>
      <article className="w-[100%] mt-4 flex flex-col justify-center items-start">
        <div className="flex flex-col justify-start items-start md:w-[50%] h-[100%] mt-4">
          <h3 className="text-xl text-center mt-2">
            {t("About.DescriptionTitle")}
          </h3>

          <p className="text-lg text-justify font-light">
            {t("About.Description.p1")}
          </p>
          <p className="text-lg text-justify font-light">
            {t("About.Description.p2")}
          </p>
          <p className="text-lg text-justify font-light">
            {t("About.Description.p3")}
          </p>
        </div>
      </article>
      <article className="w-[100%] mt-4 flex flex-col justify-center items-end">
        <div className="flex flex-col justify-start items-end w-[100%] md:w-[50%] h-[100%] text-justify font-light text-lg mt-4">
          <h3 className=" font-bold text-xl text-center mt-2">
            {t("About.HobbiesTitle")}
          </h3>

          <div className="flex flex-col w-[100%] h-[100%] justify-start items-end gap-2">
            {Object.keys(HOBBIES_DICTIONARY).map((hobbie, idx) => {
              return (
                <div
                  className={`w-[100%] md:w-[60%] h-[100%] flex flex-row gap-0 p-2 bg-slate-200 text-black justify-evenly items-center rounded-lg`}
                  key={idx}
                >
                  <SingleHobby hobby={HOBBIES_DICTIONARY[parseInt(hobbie)]} />
                </div>
              );
            })}
          </div>
        </div>
      </article>
    </div>
  );
}
