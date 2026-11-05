import { FocusExperience } from "@/components/focus/focus-experience";
import { FocusWorld } from "@/components/focus/focus-world";
import { IntroVisual } from "@/components/focus/intro-visual";
import "@/components/focus/focus-experience.css";
import "@/components/focus/intro-visual.css";

export default function Home() {
  return <FocusExperience world={<FocusWorld />} intro={<IntroVisual />} />;
}
