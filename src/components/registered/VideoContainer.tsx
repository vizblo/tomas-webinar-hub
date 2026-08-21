import { WistiaPlayer } from '@/components/WistiaPlayer';

const VideoContainer = () => {
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
        <div className="rounded-lg overflow-hidden">
          <WistiaPlayer mediaId="0xjp3wenam" autoplay />
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;
