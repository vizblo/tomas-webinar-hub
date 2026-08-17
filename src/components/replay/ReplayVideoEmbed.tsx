import { useEffect } from "react";

export const ReplayVideoEmbed = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://fast.wistia.com/player.js";
    script1.async = true;

    const script2 = document.createElement("script");
    script2.src = "https://fast.wistia.com/embed/78eye7t61r.js";
    script2.async = true;
    script2.type = "module";

    if (!document.querySelector(`script[src="${script1.src}"]`)) {
      document.body.appendChild(script1);
    }
    if (!document.querySelector(`script[src="${script2.src}"]`)) {
      document.body.appendChild(script2);
    }
  }, []);

  return (
    <div className="relative w-full max-w-[880px] mx-auto mb-[60px] sm:mb-[80px] lg:mb-[100px]">
      {/* Soft ambient shadow */}
      <div
        className="absolute inset-0 -z-10 rounded-2xl"
        style={{ boxShadow: '0 32px 80px rgba(0, 0, 0, 0.5)' }}
      />

      {/* Video container */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <style>{`
          wistia-player[media-id='78eye7t61r']:not(:defined) {
            background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/78eye7t61r/swatch');
            display: block;
            filter: blur(5px);
            padding-top: 56.25%;
          }
        `}</style>
        <div dangerouslySetInnerHTML={{
          __html: '<wistia-player media-id="78eye7t61r" aspect="1.7777777777777777"></wistia-player>'
        }} />
      </div>
    </div>
  );
};
