import ElementVisualizer from "@/components/blocks/ai_gen/onboarding/ElementVisualizer";
import LivingCanvasWrapper from "@/components/blocks/ai_gen/onboarding/LivingCanvasWrapper";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <LivingCanvasWrapper>
      <Link href="/ai_gen/onboarding/elements">Element Visualizer</Link>
      <Link href="/ai_gen/onboarding/recognition">Recognition</Link>
    </LivingCanvasWrapper>
  );
}
