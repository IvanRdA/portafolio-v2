"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function SingleHobby(props: any) {
  const { hobby } = props;
  const { t } = useTranslation();

  return (
    <>
      <div className="w-[50%] md:w-[33%] text-center">
        <Image
          src={hobby.icon.Light}
          height={40}
          width={40}
          alt={t(`About.${hobby.name}`)}
          title={t(`About.${hobby.name}`)}
        />
      </div>
      <div className="w-[50%] md:w-[33%]">
        <h4>{t(`About.${hobby.name}`)}</h4>
      </div>
    </>
  );
}
