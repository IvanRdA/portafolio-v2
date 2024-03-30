"use client";

import PreviewReturner from "./PreviewReturner";
import { useTranslation } from "react-i18next";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";
import Carrousel from "./Carrousel";
import { useState } from "react";
import { Project } from "../../../types";

export default function ProjectDetailed(props: {
  handler: any;
  project: Project;
}) {
  const { handler, project } = props;
  const { t } = useTranslation();

  const [codeVsPic, setCodeVsPic] = useState(0);
  const [subCode, setSubCode] = useState(0);

  const handleSubCodeChange = (e: any) => {
    const newSubCode = subCode + 1;

    if (newSubCode > Object.keys(project.code).length - 1) {
      setSubCode(0);
    } else {
      setSubCode(newSubCode);
    }
  };

  return (
    <>
      <div className="w-[100%] h-[100%] mt-4 flex flex-col justify-start items-center fadeIn">
        <PreviewReturner returner={handler} returnValue={-1} />
        <strong>
          <h2 className="text-xl text-center mt-4">
            {t(project.title)}
            <span className="fadeInNoDelay">.</span>
            <span className="fadeInDelayOne">.</span>
            <span className="fadeInDelayTwo">.</span>
          </h2>
        </strong>
        <h3 className="text-lg">{project.type}</h3>

        <h3 className="text-lg">{t(project.state)}</h3>
        <div className="flex flex-col justify-center items-center p-2 h-[100%] w-[100%] gap-2">
          <div className="flex flex-row justify-start items-center w-[100%] h-[50%]">
            <div className="flex flex-col justify-start items-center text-justify w-[50%] h-[100%] m-2">
              <i>
                <strong>
                  <h4 className="text-lg">{t("Projects.ProblemTitle")}</h4>
                </strong>
                <p className="font-light text-justify">{t(project.problem)}</p>
              </i>
            </div>
            <div className="flex flex-col justify-start items-center text-justify w-[50%] h-[100%] m-2">
              <strong>
                <i>
                  <h4 className="text-lg mt-2">
                    {t("Projects.SolutionTitle")}
                  </h4>
                </i>
              </strong>
              <p className="font-light text-justify">{t(project.solution)}</p>
            </div>
          </div>

          <div className="flex flex-col justify-start items-center w-[100%] h-[50%]">
            <div className="flex flex-row w-[100%] h-[100%] justify-center items-center">
              <button
                className="w-[50%] h-fit p-2 rounded-br-lg rounded-tl-lg bg-white text-black hover:bg-transparent hover:text-white"
                onClick={(e) => setCodeVsPic(0)}
              >
                {t("Projects.ViewPictures")}
              </button>
              <button
                className="w-[50%] h-fit p-2 rounded-br-lg rounded-tl-lg bg-white text-black hover:bg-transparent hover:text-white"
                onClick={(e) => setCodeVsPic(1)}
              >
                {t("Projects.ViewCode")}
              </button>
            </div>
            {codeVsPic === 1 && (
              <div className="flex flex-col w-[100%] h-[100%] justify-center items-center">
                <div className="flex flex-row gap-4 w-[100%] justify-center items-center">
                  <h3 className="text-center text-lg font-bold">
                    {t(project.code[subCode].name)}
                  </h3>

                  <button
                    onClick={handleSubCodeChange}
                    className="p-2 rounded-br-lg rounded-tl-lg bg-white text-black hover:bg-transparent hover:text-white"
                  >
                    {t("Projects.NextButton")}
                  </button>
                </div>
                <AceEditor
                  mode="javascript"
                  theme="solarized_dark"
                  value={project.code[subCode].code}
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
                <p className="font-light">
                  {t(project.code[subCode].explanation)}
                </p>
              </div>
            )}

            {codeVsPic === 0 && <Carrousel links={project.pics} />}
          </div>
        </div>
        <div className="flex flex-col w-[100%] h-[100%] justify-center items-center">
          {project.repository !== "" && (
            <p>
              {t("Contact.RepositoryTitle")}:{" "}
              <a href={project.repository} target="_blank">
                {project.repository}
              </a>
            </p>
          )}

          {project.url !== "" && (
            <p>
              URL:
              <a href={project.url} target="_blank">
                {project.url}
              </a>
            </p>
          )}
          <h3 className="mt-4">{t("Projects.TecnosTitle")}</h3>
          <span className="flex flex-row gap-2 items-center">
            {project.tecnos.map((tecno, idx) => {
              return (
                <p className="bg-slate-200 text-black rounded-lg p-2" key={idx}>
                  #{tecno.name}
                </p>
              );
            })}
          </span>

          <h3 className="mt-2">{t("Projects.TagsTitle")}</h3>
          <span className="flex flex-row gap-2 mt-2 items-center">
            {project.tags.map((tag, idx) => {
              return (
                <p className="bg-slate-200 text-black rounded-lg p-2" key={idx}>
                  #{t(`Projects.ProjectTags.${tag}`)}
                </p>
              );
            })}
          </span>
        </div>
      </div>
    </>
  );
}
