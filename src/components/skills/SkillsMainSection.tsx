"use client";

import { useTranslation } from "react-i18next";
import { SKILLS_DICTIONARY } from "../../../public/mocks/generalSkills";
import { useState } from "react";
import { mainSkill } from "../../../types";

export default function SkillsMainSection() {
  const { t } = useTranslation();

  const getInitialState = () => {
    const state: Array<Record<number, { state: boolean }>> = [{}, {}];
    Object.keys(SKILLS_DICTIONARY.soft).forEach((skill) => {
      state[0][parseInt(skill)] = { state: false };
    });

    Object.keys(SKILLS_DICTIONARY.soft).forEach((skill) => {
      state[1][parseInt(skill)] = { state: false };
    });

    return state;
  };

  const [SkillDescr, setSkillDescr] = useState(getInitialState());

  const updateSkillDescr = (dictKey: number, event: string, branch: number) => {
    const updatedSkillDescr = { ...SkillDescr };
    updatedSkillDescr[branch][dictKey] = {
      state: event === "enter" ? true : false,
    };

    setSkillDescr(updatedSkillDescr);
  };

  return (
    <article className="flex flex-col justify-start mt-4 items-center h-[100%] w-[100%]">
      <div className="flex flex-col md:flex-row justify-center items-center w-[100%] mt-4">
        <div className="flex flex-col w-[50%] h-[100%] justify-center items-center divide-y divide-white md:divide-y-0">
          <strong>
            <h3 className="font-bold text-xl text-center mt-2">
              {t("Skills.SoftTitle")}
            </h3>
          </strong>
          {Object.keys(SKILLS_DICTIONARY.soft).map((dictKey, index) => {
            const skillState = SkillDescr[0][parseInt(dictKey)].state;
            return (
              <div
                key={index}
                onMouseEnter={(e) => {
                  updateSkillDescr(parseInt(dictKey), "enter", 0);
                }}
                onMouseLeave={(e) => {
                  updateSkillDescr(parseInt(dictKey), "out", 0);
                }}
                className="w-[100%] h-fit"
              >
                <h5 className="font-light text-lg text-center mt-2">
                  {!skillState
                    ? t(SKILLS_DICTIONARY.soft[parseInt(dictKey)].name)
                    : t(SKILLS_DICTIONARY.soft[parseInt(dictKey)].description)}
                </h5>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col w-[50%] h-[100%] justify-center items-center divide-y divide-white md:divide-y-0">
          <strong>
            <h3 className="font-bold text-xl text-center mt-4 md:mt-2">
              {t("Skills.TechnicalTitle")}
            </h3>
          </strong>

          {Object.keys(SKILLS_DICTIONARY.technical).map((dictKey, index) => {
            const skillState = SkillDescr[1][parseInt(dictKey)].state;

            return (
              <h5
                key={index}
                onMouseEnter={(e) => {
                  updateSkillDescr(parseInt(dictKey), "enter", 1);
                }}
                onMouseLeave={(e) => {
                  updateSkillDescr(parseInt(dictKey), "out", 1);
                }}
                className="font-light text-lg text-center mt-2"
              >
                {!skillState
                  ? t(SKILLS_DICTIONARY.technical[parseInt(dictKey)].name)
                  : t(
                      SKILLS_DICTIONARY.technical[parseInt(dictKey)].description
                    )}
              </h5>
            );
          })}
        </div>
      </div>
    </article>
  );
}
