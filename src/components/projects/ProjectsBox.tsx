"use client";
import ProjectsMainSection from "./ProjectsMainSection";
import ProjectDetailed from "./ProjectDetailed";
import { projectsDictionary } from "../../../public/mocks/projects";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ProjectsBox() {
  const [detailed, setDetailed] = useState(-1);
  const { t } = useTranslation();

  return (
    <section className="w-[100%] md:w-[80%] lg:w-[75%] h-[100%] p-4 mt-4 md:mt-8">
      <h1 className="text-3xl text-center mb-8">{t("Projects.Title")}</h1>
      {detailed === -1 && <ProjectsMainSection handler={setDetailed} />}

      {detailed !== -1 && (
        <ProjectDetailed
          handler={setDetailed}
          project={projectsDictionary[detailed]}
        />
      )}
    </section>
  );
}
