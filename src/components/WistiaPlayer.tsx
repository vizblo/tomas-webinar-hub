import { useEffect } from 'react';

interface WistiaPlayerProps {
  mediaId: string;
  className?: string;
}

/** Lightweight Wistia embed. Loads the player + media scripts once. */
export const WistiaPlayer = ({ mediaId, className }: WistiaPlayerProps) => {
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

  return (
    <div className={className} style={{ width: '100%' }}>
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
          __html: `<wistia-player media-id="${mediaId}" aspect="1.7777777777777777"></wistia-player>`,
        }}
      />
    </div>
  );
};

export default WistiaPlayer;
