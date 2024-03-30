"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function ContactMainSection() {
  const { t } = useTranslation();
  return (
    <div className="p-2 m-1 h-[100%] w-[100%] flex flex-col justify-center items-center">
      <h2 className="font-interBold text-2xl text-center mt-8">
        {t("Contact.Title")}
      </h2>
      <article className="h-[90%] flex flex-col justify-center items-start text-lg">
        <span className="flex flex-row justify-center items-center">
          <Image
            src="/icons/email.svg"
            height={40}
            width={40}
            alt={t("Contact.Email")}
            title={t("Contact.Email")}
            className={`rounded-full m-6 shadow-md shadow-white`}
          />
          <a href="mailto:ivanrodriguezdeantonio@gmail.com" target="_blank">
            ivanrodriguezdeantonio@gmail.com
          </a>
        </span>

        <span className="flex flex-row  justify-center items-center">
          <Image
            src="/icons/linkedin.svg"
            height={40}
            width={40}
            alt={t("Contact.Linkedin")}
            title={t("Contact.Linkedin")}
            className={`rounded-full m-6 shadow-md shadow-white`}
          />
          <a
            href="https://www.linkedin.com/in/iván-rodríguez-de-antonio-b26663119/"
            target="_blank"
          >
            LinkedIn
          </a>
        </span>

        <span className="flex flex-row  justify-center items-center">
          <Image
            src="/icons/github.svg"
            height={40}
            width={40}
            alt={t("Contact.Github")}
            title={t("Contact.Github")}
            className={`rounded-full m-6 shadow-md shadow-white`}
          />
          <a href="https://github.com/IvanRdA" target="_blank">
            GitHub
          </a>
        </span>

        <span className="flex flex-row  justify-center items-center">
          <Image
            src="/icons/direction.svg"
            height={40}
            width={40}
            alt={t("Contact.Direction")}
            title={t("Contact.DirectionTitle")}
            className={`rounded-full m-6 shadow-md shadow-white`}
          />
          {t("Contact.Direction")}
        </span>
      </article>
    </div>
  );
}
