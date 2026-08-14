import { createElement } from "react";

const MEDIA_ID = "xem8ra2gi7";

export function VideoPlaceholder() {
  return (
    <section className="px-4 pb-16">
      <div className="mx-auto max-w-4xl">
        <style>{`wistia-player[media-id='${MEDIA_ID}']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${MEDIA_ID}/swatch'); display: block; filter: blur(5px); padding-top: 56.25%; }`}</style>
        <div className="relative overflow-hidden rounded-2xl border border-gold/40 shadow-elevated shadow-gold">
          <div className="relative w-full bg-surface">
            {createElement("wistia-player", {
              "media-id": MEDIA_ID,
              aspect: "1.7777777777777777",
              style: { display: "block", width: "100%" },
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
