import { useEffect } from "react";
import { TopBanner } from "@/components/precall/TopBanner";
import { Hero } from "@/components/precall/Hero";
import { VideoPlaceholder } from "@/components/precall/VideoPlaceholder";
import { WhatCoachingIs } from "@/components/precall/WhatCoachingIs";
import { WhatYouGet } from "@/components/precall/WhatYouGet";
import { FitCheck } from "@/components/precall/FitCheck";
import { CallDetails } from "@/components/precall/CallDetails";
import { Prepare } from "@/components/precall/Prepare";
import { Testimonials } from "@/components/precall/Testimonials";
import { AboutTomas } from "@/components/precall/AboutTomas";
import { FAQ } from "@/components/precall/FAQ";
import { FinalCTA } from "@/components/precall/FinalCTA";
import { Footer } from "@/components/precall/Footer";

const WISTIA_SCRIPTS = [
  { src: "https://fast.wistia.com/player.js", type: undefined as string | undefined },
  { src: "https://fast.wistia.com/embed/xem8ra2gi7.js", type: "module" },
];

const Bokad = () => {
  useEffect(() => {
    document.title = "Inför vårt samtal — Tomas Lydahl";
    const desc =
      "Allt du behöver veta innan vårt kostnadsfria samtal med Tomas Lydahl. Se videon, läs igenom sidan och förbered dig inför vår tid tillsammans.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    const added: HTMLScriptElement[] = [];
    WISTIA_SCRIPTS.forEach(({ src, type }) => {
      if (document.querySelector(`script[src="${src}"]`)) return;
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      if (type) s.type = type;
      document.head.appendChild(s);
      added.push(s);
    });
    return () => {
      added.forEach((s) => s.remove());
    };
  }, []);

  return (
    <main id="top" className="precall-page min-h-screen bg-background">
      <TopBanner />
      <Hero />
      <VideoPlaceholder />
      <CallDetails />
      <AboutTomas />
      <Testimonials />
      <WhatCoachingIs />
      <WhatYouGet />
      <FitCheck />
      <Prepare />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Bokad;
