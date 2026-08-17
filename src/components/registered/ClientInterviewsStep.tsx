import { useEffect, createElement } from 'react';
import StepBadge from './StepBadge';

const videos = [
  { id: 1, type: "youtube", videoId: "gdQG3yaBWJg", title: "Desmond secured $50,000 in business funding" },
  { id: 2, type: "youtube", videoId: "yoekcrUpRJ8", title: "Why Zeeshan chose Amazon Business coaching" },
  { id: 3, type: "wistia", wistiaId: "v01ijqnck0", title: "Curtis And Sutton Hit A $1,649 Day" },
  { id: 4, type: "wistia", wistiaId: "1iq1st6h52", title: "Isaiah recovered his account health" },
  { id: 5, type: "wistia", wistiaId: "9or4066t2b", title: "What my clients say about me" },
];

interface ClientInterviewsStepProps {
  noCard?: boolean;
}

const ClientInterviewsStep = ({ noCard }: ClientInterviewsStepProps) => {
  useEffect(() => {
    if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://fast.wistia.com/player.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      data-step="4"
      className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-8 sm:pb-12 pt-6 sm:pt-8 md:pt-8"
    >
      <div className="flex flex-col items-center text-center">
        {!noCard && <StepBadge stepNumber={4} />}

        <h2
          className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8"
          style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
        >
          Hear What Our Clients Have To Say
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col">
              <h3 className="text-sm md:text-base text-white font-medium text-center px-2 leading-snug mb-3">
                {video.title}
              </h3>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-transparent hover:border-[rgba(212,175,55,0.6)] transition-all duration-500 group">
                {video.type === "youtube" ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  createElement("wistia-player", {
                    "media-id": video.wistiaId,
                    aspect: "1.7777777777777777",
                    style: { width: "100%", height: "100%" },
                  })
                )}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 30px rgba(212, 175, 55, 0.3)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientInterviewsStep;
