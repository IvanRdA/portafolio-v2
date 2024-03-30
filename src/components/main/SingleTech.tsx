"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function SingleTech(props: any) {
  const { letter, returner } = props;
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col w-[100%] justify-center items-center">
        <button
          onClick={returner}
          className="flex flex-col justify-center items-center"
        >
          <Image
            src={`/logos/${letter.main}.png`}
            width={40}
            height={40}
            alt={letter.name}
            title={letter.name}
            className="bg-white/20"
          />
          <h3 className="text-center">{letter.name}</h3>
          <h5 className="text-center text-lg">{t(`Main.${letter.side}`)}</h5>
        </button>

        <p className="text-justify text-lg font-light">
          {t(`Main.${letter.main}`)}
        </p>
      </div>
    </>
  );
}
