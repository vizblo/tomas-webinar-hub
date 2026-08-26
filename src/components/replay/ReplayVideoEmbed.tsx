import { useEffect } from "react";
import { Lock, Play } from "lucide-react";
import { useReplayUnlock, openUnlockModal } from "./ReplayUnlock";

const GOLD = "#C9A84C";

export const ReplayVideoEmbed = () => {
  const { unlocked } = useReplayUnlock();

  useEffect(() => {
    if (!unlocked) return;
    const srcs = [
      "https://fast.wistia.com/player.js",
      "https://fast.wistia.com/embed/09ahw6wbxy.js",
    ];
    srcs.forEach((src, i) => {
      if (document.querySelector(`script[src="${src}"]`)) return;
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      if (i === 1) s.type = "module";
      document.body.appendChild(s);
    });
  }, [unlocked]);

  return (
    <div className="relative w-full max-w-[880px] mx-auto mb-[44px] sm:mb-[60px] lg:mb-[72px]">
      <div
        className="absolute inset-0 -z-10 rounded-2xl"
        style={{ boxShadow: `0 32px 90px rgba(0,0,0,0.6), 0 0 70px rgba(201,168,76,0.15)` }}
      />

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: `1px solid rgba(201, 168, 76, 0.28)`,
        }}
      >
        {unlocked ? (
          <>
            <style>{`
              wistia-player[media-id='09ahw6wbxy']:not(:defined) {
                background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/09ahw6wbxy/swatch');
                display: block;
                filter: blur(5px);
                padding-top: 56.25%;
              }
            `}</style>
            <div dangerouslySetInnerHTML={{
              __html: '<wistia-player media-id="09ahw6wbxy" aspect="1.7777777777777777"></wistia-player>'
            }} />
          </>
        ) : (
          <button
            type="button"
            onClick={openUnlockModal}
            aria-label="Lås upp reprisen"
            className="group relative flex aspect-video w-full flex-col items-center justify-center gap-4"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 40%, rgba(201,168,76,0.18) 0%, rgba(0,0,0,0.9) 70%), #050505",
            }}
          >
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110"
              style={{ background: "rgba(201,168,76,0.14)", border: `1px solid ${GOLD}` }}
            >
              <Play className="h-7 w-7" style={{ color: GOLD, fill: GOLD }} />
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold text-white/85 sm:text-base">
              <Lock className="h-4 w-4" style={{ color: GOLD }} />
              Reprisen är låst
            </span>
            <span className="max-w-[380px] px-6 text-center text-xs text-white/50 sm:text-sm">
              Fyll i ditt namn och din e-post för att låsa upp hela föreläsningen.
            </span>
          </button>
        )}
      </div>

      {!unlocked && (
        <button
          type="button"
          onClick={openUnlockModal}
          className="mx-auto mt-6 block w-full max-w-[420px] rounded-xl px-6 py-4 text-base font-bold text-black transition-transform hover:-translate-y-0.5"
          style={{ background: "linear-gradient(180deg, #E5C05E 0%, #C9A84C 100%)", boxShadow: "0 10px 30px rgba(201,168,76,0.25)" }}
        >
          LÅS UPP REPRISEN
        </button>
      )}
    </div>
  );
};
