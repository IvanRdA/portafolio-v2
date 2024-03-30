import Snippets from "./Snippets";
import TechsPreview from "./TechsPreview";

export default function PreviewsBox() {
  return (
    <section className="w-[100%] md:w-[80%] lg:w-[75%] h-[100%] flex flex-col justify-center p-4 m-1 items-center">
      <TechsPreview />
      <Snippets />
    </section>
  );
}
