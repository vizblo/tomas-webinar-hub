import { useEffect } from 'react';

const VideoContainer = () => {
  useEffect(() => {
    if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
      const playerScript = document.createElement('script');
      playerScript.src = 'https://fast.wistia.com/player.js';
      playerScript.async = true;
      document.body.appendChild(playerScript);
    }

    if (!document.querySelector('script[src="https://fast.wistia.com/embed/0xjp3wenam.js"]')) {
      const embedScript = document.createElement('script');
      embedScript.src = 'https://fast.wistia.com/embed/0xjp3wenam.js';
      embedScript.async = true;
      embedScript.type = 'module';
      document.body.appendChild(embedScript);
    }
  }, []);

  return (
    <div className="max-w-[700px] mx-auto px-2 sm:px-4 md:px-6 lg:px-10 pb-4 md:pb-6">
      <div
        className="p-3 sm:p-3 md:p-4 lg:p-5 rounded-lg"
        style={{
          background: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}
      >
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <style>{`
            wistia-player[media-id='0xjp3wenam']:not(:defined) { 
              background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/0xjp3wenam/swatch'); 
              display: block; 
              filter: blur(5px); 
              padding-top: 56.25%; 
            }
          `}</style>
          <div dangerouslySetInnerHTML={{ 
            __html: '<wistia-player media-id="0xjp3wenam" aspect="1.7777777777777777" autoplay="true" muted="true" playsinline="true"></wistia-player>' 
          }} />
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;
