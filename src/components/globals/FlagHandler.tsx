"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useState } from "react";
import i18n from "@/i18n/index";

export default function FlagHandler() {
  const { t } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("lang")
  );
  const [flag, setFlag] = useState(currentLanguage);
  const handleFlagClick = (e: any) => {
    e.preventDefault();
    const newLanguage = currentLanguage === "eng" ? "spa" : "eng";
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    localStorage.setItem("lang", newLanguage);
    setFlag(newLanguage);
  };
  return (
    <button
      onClick={handleFlagClick}
      className="w-fit h-fit fixed top-4 left-4"
    >
      <Image
        src={`/${flag}.svg`}
        width={60}
        height={60}
        alt={flag === "spa" ? "Español" : "English"}
        title={t(`Navbar.FlagTitle.${flag}`)}
        className="hover:scale-105 p-2 items-center"
      />
    </button>
  );
}
