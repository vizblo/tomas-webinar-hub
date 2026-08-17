import { useEffect } from 'react';
import { HomeTopBannerA } from '@/components/HomeTopBannerA';
import { HomeHeroSectionA } from '@/components/HomeHeroSectionA';
import { AgendaSection } from '@/components/AgendaSection';
import { HostSection } from '@/components/HostSection';
import { FreeGiftSection } from '@/components/FreeGiftSection';
import { TomasVideoTestimonials } from '@/components/tomas/TomasVideoTestimonials';
import { TomasScreenshots } from '@/components/tomas/TomasScreenshots';
import { SectionSeparator } from '@/components/SectionSeparator';
import { StickyCtaBanner } from '@/components/StickyCtaBanner';
import PkLegalFooter from '@/components/PkLegalFooter';
import { RegistrationModal } from '@/components/RegistrationModal';

import { setABVariant } from '@/hooks/useABTest';
import { useUTM } from '@/hooks/useUTM';
import tomasPortrait from '@/assets/tomas-portrait-2.webp';
import ebookCover from '@/assets/ebook-katastroftankar.png.asset.json';

const IndexA = () => {
  useUTM();

  useEffect(() => {
    setABVariant('B');
  }, []);

  useEffect(() => {
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const load = () => { import('./PkConfirmed').catch(() => {}); };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(load);
      return () => w.cancelIdleCallback?.(id);
    }
    const id = setTimeout(load, 2000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="dark pk-theme" style={{ paddingBottom: '140px', backgroundColor: '#000000' }}>
      <HomeTopBannerA />
      <HomeHeroSectionA />

      <div style={{ backgroundColor: '#000000' }}>
        <SectionSeparator />
        <AgendaSection
          headline="Vad du får med dig från föreläsningen"
          pillars={[
            {
              number: '01',
              title: 'Varför hjärnan skapar katastroftankar',
              subtitle: 'Förstå varför ditt sinne målar upp värsta tänkbara scenarier, och varför det inte betyder att något är fel på dig.',
            },
            {
              number: '02',
              title: 'Varför 99% av dem aldrig slår in',
              subtitle: 'Lär dig skillnaden mellan en tanke och en sanning, och varför nästan inget av det du oroar dig för faktiskt händer.',
            },
            {
              number: '03',
              title: 'Hur du slutar lyssna på dem',
              subtitle: 'Konkreta principer för att låta katastroftankarna passera utan att de styr ditt liv, utan tekniker eller kamp.',
            },
            {
              number: '04',
              title: 'BONUS: Live Q&A i slutet',
              subtitle: 'Direkt efter föreläsningen får du ställa dina frågor till Tomas live.',
            },
          ]}
        />
        <SectionSeparator />
        <FreeGiftSection
          heading="Gratis bonus:"
          headingSuffix="Varför vi tror på katastroftankar"
          topText="Du får e-boken som visar varför hjärnan skapar katastroftankar, varför nästan inga av dem slår in, och vad som händer när du ser igenom dem."
          bottomText=""
          giftImage={ebookCover.url}
          giftImageAlt="E-bok: Varför vi tror på katastroftankar och vad som händer när de avslöjas"
          ctaLabel="SÄKRA MIN PLATS"
          ctaSubLabel="Kostnadsfri registrering"
        />
        <SectionSeparator />
        <HostSection
          heading="Vem är"
          headingSuffix="Tomas?"
          hostImage={tomasPortrait}
          hostImageAlt="Tomas Lydahl - mental coach, författare och föreläsare"
          hostName="Tomas Lydahl"
          hostTitle="Mental coach, författare och föreläsare"
          hostBio={"Tomas har själv levt med katastroftankar. Han vet hur det känns när huvudet ständigt målar upp det värsta som kan hända.\n\nHans fokus ligger på djup förståelse snarare än ytliga \"quick fixes\". När du förstår hur ditt sinne fungerar, förändras allt automatiskt, utan att du behöver kämpa."}
          stats={[
            { label: 'Års erfarenhet', value: '15+' },
            { label: 'Hjälpta människor', value: '1 000+' },
            { label: 'Föreläsningar', value: '500+' }
          ]}
        />
        <SectionSeparator />
        <TomasVideoTestimonials heading="Tidigare klienter" />
        <SectionSeparator />
        <TomasScreenshots heading="Vad människor säger" />
      </div>

      <PkLegalFooter />

      <StickyCtaBanner />
      <RegistrationModal />
    </div>
  );
};

export default IndexA;
