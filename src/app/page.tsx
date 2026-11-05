import { FocusExperience } from "@/components/focus/focus-experience";
import { FocusWorld } from "@/components/focus/focus-world";
import "@/components/focus/focus-experience.css";

export default function Home() {
  return <FocusExperience world={<FocusWorld />} />;
}
