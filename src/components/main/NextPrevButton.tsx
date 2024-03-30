"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function NextPrevButton(props: any) {
  const { t } = useTranslation();
  const { handler, action } = props;

  return (
    <aside className="w-[10%] h-[100%] flex flex-col justify-center items-center">
      <button onClick={handler} className="h-[100%]">
        <Image
          src={`/icons/${action}.svg`}
          width={30}
          height={30}
          alt={t(`Main.${action}`)}
          title={t(`Main.${action}`)}
          className="hover:scale-105"
        />
      </button>
    </aside>
  );
}
