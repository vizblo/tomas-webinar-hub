import { useEffect } from 'react';
import { HomeTopBannerA } from '@/components/HomeTopBannerA';
import { HomeHeroSectionA } from '@/components/HomeHeroSectionA';
import { AgendaSection } from '@/components/AgendaSection';
import { HostSection } from '@/components/HostSection';
import { FreeGiftSection } from '@/components/FreeGiftSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { TransformationsSection } from '@/components/TransformationsSection';
import { SectionSeparator } from '@/components/SectionSeparator';
import { StickyCtaBanner } from '@/components/StickyCtaBanner';
import { RegistrationModal } from '@/components/RegistrationModal';

import { setABVariant } from '@/hooks/useABTest';
import { useUTM } from '@/hooks/useUTM';
import philipHost from '@/assets/philip-host.png';
import customRoadmapBook from '@/assets/custom-roadmap-book.png';

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
    <div className="dark" style={{ paddingBottom: '140px', backgroundColor: '#000000' }}>
      <HomeTopBannerA />
      <HomeHeroSectionA />

      <div style={{ backgroundColor: '#000000' }}>
        <SectionSeparator />
        <AgendaSection />
        <SectionSeparator />
        <FreeGiftSection
          heading="Free Gift:"
          headingSuffix="Custom A-Z Amazon Roadmap"
          topText="Inside, you'll find the exact step-by-step system our students are using to go from zero to their first profitable wholesale products, but tailored to your budget, experience, and goals"
          bottomText=""
          giftImage={customRoadmapBook}
          giftImageAlt="Custom A-Z Amazon Roadmap - Tailored to your budget, experience, and goals"
        />
        <SectionSeparator />
        <HostSection
          hostImage={philipHost}
          hostImageAlt="Philip Keipp - Amazon Wholesale Coach & 7-Figure Seller"
          hostName="Philip Keipp"
          hostTitle="Amazon Wholesale Coach & 7-Figure Seller"
          hostBio={"I built a $3.5M+ Amazon business in just 4 years - starting from scratch as a single dad working 14-hour days in drywall.\n\nAfter discovering the power of Amazon wholesale, I learned the truth: you don't need to invent a product, have a business degree, or get lucky with fads to build a real, life-changing business."}
          stats={[
            { label: 'Successful Students', value: '500+' },
            { label: 'in Student Sales Generated', value: '$10M+' },
            { label: 'in personal Amazon sales', value: '$3.5M+' }
          ]}
        />
        <SectionSeparator />
        <TestimonialsSection heading="What People Are" headingSuffix="Saying" />
        <SectionSeparator />
        <TransformationsSection heading="Real" headingSuffix="Transformations" />
      </div>

      <StickyCtaBanner />
      <RegistrationModal />
    </div>
  );
};

export default IndexA;
