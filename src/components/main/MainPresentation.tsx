"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function MainPresentation() {
  const { t } = useTranslation();
  return (
    <article className="p-2 m-1 h-[100%] w-[100%]">
      <div className="w-[100%] mt-4 flex flex-col justify-center items-center">
        <h1 className="font-bold text-5xl">Iván Rodríguez</h1>
        <h2 className="text-2xl">{t("Main.Job")}</h2>
        <a
          href="/resume.png"
          target="_blank"
          rel="noopener noreferrer"
          download="resume.png"
        >
          <Image
            src="/picture.jpg"
            height={275}
            width={275}
            alt={t("Main.Picture")}
            title={t("Main.Picture")}
            className={`rounded-full m-6`}
          />
        </a>
      </div>
      <div className="w-[100%] text-justify p-2 font-light text-lg mt-4 flex flex-col justify-center items-center">
        <p className="p-2">{t("Main.p1")}</p>
        <p className="p-2">{t("Main.p2")}</p>
        <p className="p-2">{t("Main.p3")}</p>
        <p className="p-2">{t("Main.p4")}</p>
      </div>
    </article>
  );
}
