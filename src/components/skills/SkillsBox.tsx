import MainPresentation from "../main/MainPresentation";
import SkillsMainSection from "./SkillsMainSection";

export default function SkillsBox() {
  return (
    <section className="w-[100%] md:w-[80%] lg:w-[75%] h-[100%] p-4 mt-4 md:mt-8">
      <SkillsMainSection />
    </section>
  );
}
