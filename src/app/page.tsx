import BlurryBackground from "@/components/globals/BlurryBackground";
import HomeMainBox from "@/components/main/MainBox";
import PreviewsBox from "@/components/main/PreviewsBox";
import FlagHandler from "@/components/globals/FlagHandler";
import AboutBox from "@/components/about/AboutBox";
import SkillsBox from "@/components/skills/SkillsBox";
import ProjectsBox from "@/components/projects/ProjectsBox";
import ContactBox from "@/components/contact/ContactBox";

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-[100%] flex-col items-center justify-start p-12 font-regular cursor-default fadeIn">
      <BlurryBackground />
      <FlagHandler />
      <HomeMainBox />
      <PreviewsBox />
      <AboutBox />
      <SkillsBox />
      <ProjectsBox />
      <ContactBox />
    </main>
  );
}
