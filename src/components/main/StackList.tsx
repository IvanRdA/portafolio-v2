"use client";

import { useState } from "react";
import SingleTech from "./SingleTech";

export default function StackList(props: any) {
  const { stack } = props;
  const [switchLetter, setSwitchLetter] = useState("");

  const handleReturnToStack = (e: any) => {
    e.preventDefault();
    setSwitchLetter("");
  };

  const handleLetterEvent = (e: any) => {
    e.preventDefault();
    const letter = e.target.getAttribute("data-letter");

    if (switchLetter === letter) {
      setSwitchLetter("");
    } else {
      setSwitchLetter(letter);
    }
  };

  return (
    <>
      {switchLetter === "" && (
        <>
          {Object.keys(stack).map((letter) => {
            return (
              <button
                key={stack[letter].main}
                className="p-2 text-center rounded-md border border-white hover:scale-105"
                onClick={handleLetterEvent}
                data-letter={stack[letter].main}
              >
                {stack[letter].main}
              </button>
            );
          })}
        </>
      )}

      {switchLetter !== "" && (
        <SingleTech
          letter={stack[switchLetter]}
          returner={handleReturnToStack}
        />
      )}
    </>
  );
}
