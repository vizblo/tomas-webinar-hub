import { useEffect, useRef, useState } from 'react';

interface WistiaPlayerProps {
  mediaId: string;
  className?: string;
  autoplay?: boolean;
}

/** Lightweight Wistia embed. Loads the player + media scripts once. */
export const WistiaPlayer = ({ mediaId, className, autoplay = false }: WistiaPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(autoplay);

  useEffect(() => {
    const add = (src: string, module?: boolean) => {
      if (document.querySelector(`script[src="${src}"]`)) return;
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      if (module) s.type = 'module';
      document.body.appendChild(s);
    };
    add('https://fast.wistia.com/player.js');
    add(`https://fast.wistia.com/embed/${mediaId}.js`, true);
  }, [mediaId]);

  const toggleSound = () => {
    const el = containerRef.current?.querySelector('wistia-player') as
      | (HTMLElement & { muted?: boolean; volume?: number; play?: () => void })
      | null;
    if (!el) return;
    const next = !muted;
    try {
      el.muted = next;
      if (!next) {
        el.volume = 1;
        el.play?.();
      }
    } catch {
      /* player not ready */
    }
    setMuted(next);
  };

  return (
    <div className={className} style={{ width: '100%', position: 'relative' }} ref={containerRef}>
      <style>{`
        wistia-player[media-id='${mediaId}']:not(:defined) {
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: 56.25%;
        }
      `}</style>
      <div
        dangerouslySetInnerHTML={{
          __html: `<wistia-player media-id="${mediaId}" aspect="1.7777777777777777"${
            autoplay ? ' autoplay="true" muted="true" playsinline="true"' : ''
          }></wistia-player>`,
        }}
      />
      {autoplay && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? 'Slå på ljud' : 'Stäng av ljud'}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 28px',
            borderRadius: '999px',
            border: '2px solid rgba(212, 175, 55, 0.7)',
            background: 'rgba(0, 0, 0, 0.78)',
            backdropFilter: 'blur(8px)',
            color: '#F5E7B8',
            fontSize: 'clamp(15px, 4vw, 20px)',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.35)',
          }}
        >
          {muted ? '🔇 Tryck för ljud' : '🔊 Ljud på'}
        </button>
      )}
    </div>
  );
};

export default WistiaPlayer;
