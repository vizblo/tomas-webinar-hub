export const HeadlineBlock = () => {
  return (
    <div className="relative max-w-[720px] mx-auto text-center mb-[24px] sm:mb-[32px] lg:mb-[40px]">
      <h1
        className="text-white font-semibold mx-auto mb-[14px] sm:mb-[18px] px-4"
        style={{
          fontSize: 'clamp(22px, 3.8vw, 42px)',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
        }}
      >
        <span className="sm:hidden">
          Free LIVE Masterclass Replay: Learn how I've Made $3.5M+ in Amazon Sales
        </span>
        <span className="hidden sm:inline">
          Free LIVE Masterclass Replay: Learn How I've Made $3.5M in Personal Amazon Sales
        </span>
      </h1>

      <p
        className="text-white/50 max-w-[520px] mx-auto px-4 font-normal"
        style={{
          fontSize: 'clamp(13px, 1.6vw, 16px)',
          letterSpacing: '-0.01em',
          lineHeight: 1.5,
        }}
      >
        Watch the full session + claim the special coaching offer (only a few spaces left to work with me & my team)
      </p>
    </div>
  );
};
