"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  projectsDictionary,
  projectTags,
} from "../../../public/mocks/projects";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";

import Carrousel from "./Carrousel";
import { Project } from "../../../types";

export default function ProjectsMainSection(props: any) {
  const { handler } = props;
  const { t } = useTranslation();
  const [projectType, setProjectType] = useState("All");

  const getInitialProjects = () => {
    const allProjects = [];

    for (let key in projectsDictionary) {
      allProjects.push(projectsDictionary[key]);
    }

    return allProjects;
  };
  const [currentProjects, setCurrentProjects] = useState(getInitialProjects());

  const filterCurrProjectsByType = (type: string) => {
    if (type === "All") {
      return getInitialProjects();
    } else {
      const filtered = [];

      for (let key in projectsDictionary) {
        if (projectsDictionary[key].type === type) {
          filtered.push(projectsDictionary[key]);
        }
      }

      return filtered;
    }
  };

  const [tagType, setTagType] = useState("All");

  const createNewCodeVsPicState = () => {
    let finalDict: Record<number, number> = {};
    for (let i = 0; i <= currentProjects.length - 1; i++) {
      finalDict = { ...finalDict, [i]: 0 };
    }

    return finalDict;
  };

  const [codeVsPic, setCodeVsPic] = useState(createNewCodeVsPicState());

  const filterCurrProjectsByTag = (tag: string) => {
    if (tag === "All") {
      return getInitialProjects();
    } else {
      const filtered: Project[] = [];

      Object.keys(projectsDictionary).forEach((key) => {
        if (projectsDictionary[parseInt(key)].tags.includes(tag)) {
          filtered.push(projectsDictionary[parseInt(key)]);
        }
      });

      return filtered;
    }
  };

  const handleTypeChange = (e: any) => {
    const newType = e.target.value;
    setProjectType(newType);
    setTagType("All");
    setCurrentProjects(filterCurrProjectsByType(newType));
    setCodeVsPic(createNewCodeVsPicState());
  };
  const handleTagChange = (e: any) => {
    const newTag = e.target.value;
    setTagType(newTag);
    setProjectType("All");
    setCurrentProjects(filterCurrProjectsByTag(newTag));
    setCodeVsPic(createNewCodeVsPicState());
  };

  return (
    <article className="flex flex-col justify-start items-center w-[100%] h-[100%] mt-4">
      <div className="flex flex-row w-[100%] h-[10%] justify-center items-center gap-4">
        <label htmlFor="by-side">
          {t("Projects.ByTypeLabel")}
          <select
            onChange={handleTypeChange}
            value={projectType}
            className="text-black"
            id="by-side"
          >
            <option value="All">{t("Projects.AllTitle")}</option>
            <option value="Frontend">{t("Skills.FrontendTitle")}</option>
            <option value="Backend">{t("Skills.BackendTitle")}</option>
            <option value="Fullstack">{t("Skills.FullstackTitle")}</option>
            <option value="General">{t("Skills.GeneralTitle")}</option>
          </select>
        </label>

        <label htmlFor="by-tag">
          {t("Projects.ByTagLabel")}
          <select
            onChange={handleTagChange}
            value={tagType}
            className="text-black"
            id="by-tag"
          >
            <option value="all">{t("Projects.AllTitle")}</option>
            {projectTags.map((tag, idx) => {
              return (
                <option key={idx} value={tag}>
                  {t(`Projects.ProjectTags.${tag}`)}
                </option>
              );
            })}
          </select>
        </label>
      </div>

      {currentProjects.length === 0 ? (
        <h3 className="text-5xl text-center mt-8">
          {t("Projects.NoItemsFound")}
        </h3>
      ) : (
        <div className="grid grid-flow-row grid-col-1 gap-2 auto-cols-fr justify-start items-center h-[90%] w-[100%] mt-4 text-justify">
          {currentProjects.map((project, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-col justify-start items-start w-[90%] md:w-[100%] h-[100%] p-2"
              >
                <button
                  onClick={(e) => handler(idx)}
                  className="border border-white/20 p-2 w-[100%]"
                >
                  <h3 className="text-lg text-center">{t(project.title)}</h3>
                </button>
                <div className="flex flex-row w-[100%] justify-center items-center gap-2 mt-2 mb-4">
                  <button
                    className="w-[30%] h-fit p-2 rounded-br-lg rounded-tl-lg  bg-white text-black hover:bg-transparent hover:text-white"
                    onClick={(e) => setCodeVsPic({ ...codeVsPic, [idx]: 0 })}
                  >
                    {t("Projects.ViewPictures")}
                  </button>
                  <button
                    className="w-[30%] h-fit p-2 rounded-br-lg rounded-tl-lg  bg-white text-black hover:bg-transparent hover:text-white"
                    onClick={(e) => setCodeVsPic({ ...codeVsPic, [idx]: 1 })}
                  >
                    {t("Projects.ViewCode")}
                  </button>
                </div>
                {codeVsPic[idx] === 1 && (
                  <AceEditor
                    mode="javascript"
                    theme="solarized_dark"
                    value={project.code[0].code}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    readOnly={true}
                    setOptions={{
                      showLineNumbers: true,
                      tabSize: 2,
                    }}
                    style={{ width: "100%", height: "500px" }}
                  />
                )}

                {codeVsPic[idx] === 0 && <Carrousel links={project.pics} />}
                <button onClick={(e) => handler(idx)}></button>
                <h5>{project.type}</h5>
                <p>{t(project.problem)}</p>
                {project.repository !== "" && (
                  <p>
                    {t("Contact.RepositoryTitle")}:{" "}
                    <a href={project.repository} target="_blank">
                      {t("Projects.RepositoryLink")}
                    </a>
                  </p>
                )}
                {project.url !== "" && (
                  <p>
                    URL:{" "}
                    <a href={project.url} target="_blank">
                      {t("Projects.URLLink")}
                    </a>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}
