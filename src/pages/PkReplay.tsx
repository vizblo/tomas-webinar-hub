import { AtmosphericBackground } from "@/components/replay/AtmosphericBackground";
import { CountdownPill } from "@/components/replay/CountdownPill";
import { HeadlineBlock } from "@/components/replay/HeadlineBlock";
import { ReplayVideoEmbed } from "@/components/replay/ReplayVideoEmbed";
import { ApplicationSection } from "@/components/replay/ApplicationSection";
import { TomasVideoTestimonials } from "@/components/tomas/TomasVideoTestimonials";
import { TomasScreenshots } from "@/components/tomas/TomasScreenshots";
import { SectionSeparator } from "@/components/SectionSeparator";
import PkLegalFooter from "@/components/PkLegalFooter";

const Replay = () => {
  return (
    <div className="pk-theme replay-page relative min-h-screen w-full overflow-x-hidden">
      <AtmosphericBackground />
      
      <div className="relative z-10 mx-auto max-w-[1200px] px-[18px] sm:px-[24px] md:px-[32px] lg:px-[64px]">
        <CountdownPill />
        <HeadlineBlock />
        <ReplayVideoEmbed />
        <ApplicationSection />
      </div>

      <div className="relative z-10">
        <SectionSeparator />
        <TomasVideoTestimonials heading="Tidigare klienter" />
        <SectionSeparator />
        <TomasScreenshots heading="Vad människor säger" />
      </div>

      <PkLegalFooter />
    </div>
  );
};

export default Replay;
