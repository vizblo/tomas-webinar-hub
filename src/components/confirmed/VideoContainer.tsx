import { useEffect } from 'react';

interface VideoContainerProps {
  wistiaId: string;
  width?: 'small' | 'medium' | 'large' | 'full';
  borderColor?: 'light' | 'gold' | 'none';
}

const widthClasses = {
  small: 'max-w-[400px]',
  medium: 'max-w-[580px]',
  large: 'max-w-[900px]',
  full: 'w-full',
};

const VideoContainer = ({ 
  wistiaId, 
  width = 'large', 
  borderColor = 'none' 
}: VideoContainerProps) => {
  useEffect(() => {
    // Load Wistia player script
    if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
      const playerScript = document.createElement('script');
      playerScript.src = 'https://fast.wistia.com/player.js';
      playerScript.async = true;
      document.body.appendChild(playerScript);
    }

    // Load specific video embed script
    if (!document.querySelector(`script[src="https://fast.wistia.com/embed/${wistiaId}.js"]`)) {
      const embedScript = document.createElement('script');
      embedScript.src = `https://fast.wistia.com/embed/${wistiaId}.js`;
      embedScript.async = true;
      embedScript.type = 'module';
      document.body.appendChild(embedScript);
    }
  }, [wistiaId]);

  const getBorderClass = () => {
    switch (borderColor) {
      case 'light':
        return 'border-2 border-white/20';
      case 'gold':
        return 'border-2 border-[rgba(212,175,55,0.4)]';
      default:
        return '';
    }
  };

  return (
    <div className={`mx-auto ${widthClasses[width]}`}>
      <div
        className={`relative w-full overflow-hidden rounded-xl ${getBorderClass()} bg-gradient-to-br from-gray-800 to-gray-900`}
        style={{
          boxShadow: '0 4px 6px rgba(212, 175, 55, 0.2)',
        }}
      >
        <div className="aspect-video">
          <style>{`
            wistia-player[media-id='${wistiaId}']:not(:defined) { 
              background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${wistiaId}/swatch'); 
              display: block; 
              filter: blur(5px); 
              padding-top: 56.25%; 
            }
          `}</style>
          <div 
            dangerouslySetInnerHTML={{ 
              __html: `<wistia-player media-id="${wistiaId}" aspect="1.7777777777777777"></wistia-player>` 
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;