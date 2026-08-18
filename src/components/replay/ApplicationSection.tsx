import { useEffect } from "react";

export const ApplicationSection = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    if (!document.querySelector(`script[src="${script.src}"]`)) {
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="relative mb-[48px] sm:mb-[60px] lg:mb-[72px]">
      {/* Apple-esque hairline divider */}
      <div className="flex justify-center mb-[48px] sm:mb-[56px]">
        <div
          className="h-px w-full max-w-[500px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)' }}
        />
      </div>

      <h2
        className="text-white font-semibold text-center mb-[16px] sm:mb-[20px] px-4"
        style={{
          fontSize: 'clamp(22px, 3.8vw, 42px)',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
        }}
      >
        Boka en kostnadsfri konsultation med bonusarna nedan
      </h2>

      <p
        className="text-white/60 text-center mb-[40px] sm:mb-[56px] px-4 max-w-[640px] mx-auto"
        style={{ fontSize: 'clamp(14px, 1.6vw, 17px)', lineHeight: 1.5 }}
      >
        Speciella föreläsnings bonusar som försvinner snart (bonusarna är fortfarande tillgängliga om du bokar NU)
      </p>

      <div className="relative max-w-[800px] mx-auto">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/tomas-tomaslydahl/webinar"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </div>
    </div>
  );
};
