import ElementVisualizer from "@/components/blocks/onboarding/ElementVisualizer";
import LivingCanvasWrapper from "@/components/blocks/onboarding/LivingCanvasWrapper";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <LivingCanvasWrapper>
      <Link href="/onboarding/elements">Element Visualizer</Link>
      <Link href="/onboarding/webconnections">Web Connections</Link>
      <Link href="/onboarding/recognition">Recognition</Link>
    </LivingCanvasWrapper>
  );
}
