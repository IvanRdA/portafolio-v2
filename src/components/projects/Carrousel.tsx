"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Carrousel(props: { links: string[] }) {
  const { links } = props;
  const { t } = useTranslation();

  const [previewElement, setPreviewElement] = useState(links[0]);
  const [eleCounter, setElecounter] = useState(0);

  const handlePrev = (e: any) => {
    e.preventDefault();
    const newCounter = eleCounter - 1;

    if (newCounter < 0) {
      setElecounter(links.length - 1);
      setPreviewElement(links[links.length - 1]);
    } else {
      setElecounter(newCounter);
      setPreviewElement(links[newCounter]);
    }
  };
  const handleNext = (e: any) => {
    e.preventDefault();
    const newCounter = eleCounter + 1;

    if (newCounter > links.length - 1) {
      setElecounter(0);
      setPreviewElement(links[0]);
    } else {
      setElecounter(newCounter);
      setPreviewElement(links[newCounter]);
    }
  };

  return (
    <>
      <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
        <section className="flex flex-row justify-center items-center p-2 m-1 h-[100%] w-[100%]">
          <div className="w-[10%] h-[100%] flex flex-col justify-center items-center">
            <button onClick={handlePrev}>
              <Image
                src="/icons/prev.svg"
                width={60}
                height={40}
                alt={t("Main.Prev")}
                title={t("Main.Prev")}
                className="hover:scale-105"
              />
            </button>
          </div>

          <article className="w-[80%] h-[100%] flex flex-col justify-center items-center font-light">
            <a href={previewElement} target="_blank">
              <Image
                src={previewElement}
                width={500}
                height={650}
                alt={t("Projects.GenericAlt")}
                title={t("Projects.GenericAlt")}
                className="m-2 p-2"
              />
            </a>
          </article>

          <div className="w-[10%] h-[100%] flex flex-col justify-center items-center">
            <button onClick={handleNext}>
              <Image
                src="/icons/next.svg"
                width={60}
                height={40}
                alt={t("Main.Next")}
                title={t("Main.Next")}
                className="hover:scale-105"
              />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
