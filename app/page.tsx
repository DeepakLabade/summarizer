import BgGradiant from "@/components/common/bg-gradiant";
import DemoSection from "@/components/common/demo-section";
import CTASection from "@/components/Home/cta";
import Hero from "@/components/Home/hero";
import HowItWorksSection from "@/components/Home/how-it-work";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative w-full">
        {/* <BgGradiant /> */}
        <div className="flex flex-col">
          <Hero />
          <DemoSection />
          <HowItWorksSection />
          <CTASection />
        </div>
      </div>
    </>
  );
}
