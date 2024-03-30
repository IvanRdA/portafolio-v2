"use client";

import { useTranslation } from "react-i18next";

export default function PreviewReturner(props: any) {
  const { returner, returnValue } = props;
  const { t } = useTranslation();

  return (
    <button
      className={`w-[100%] bg-white text-black p-2 hover:bg-black hover:text-white rounded-br-lg rounded-tl-lg font-bold hover:scale-105`}
      onClick={(e) => returner(returnValue || 0)}
    >
      {t("Returner.Message")}
    </button>
  );
}
