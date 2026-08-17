import { motion } from "framer-motion";
import { useEffect, createElement } from "react";

// Video data - First 2 are YouTube, rest are Wistia from TestimonialsSection
const videos = [
  { id: 1, type: "youtube", videoId: "gdQG3yaBWJg", title: "Desmond secured $50,000 in business funding" },
  { id: 2, type: "youtube", videoId: "yoekcrUpRJ8", title: "Why Zeeshan chose Amazon Business coaching" },
  { id: 3, type: "wistia", wistiaId: "v01ijqnck0", title: "Curtis And Sutton Hit A $1,649 Day" },
  { id: 4, type: "wistia", wistiaId: "1iq1st6h52", title: "Isaiah recovered his account health" },
  { id: 5, type: "wistia", wistiaId: "9or4066t2b", title: "What my clients say about me" },
];

export const ClientInterviewsSection = () => {

  useEffect(() => {
    // Load Wistia player script
    const script = document.createElement("script");
    script.src = "https://fast.wistia.com/player.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return (
    <section
      className="relative z-10 py-6 md:py-8 px-4 md:px-8 lg:px-12"
    >
      {/* Top vignette overlay */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-black via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="text-white font-semibold text-center mb-12"
          style={{
            fontSize: 'clamp(22px, 3.8vw, 42px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
          }}
        >
          Client Interviews
        </motion.h2>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex flex-col"
            >
              {/* Video title above */}
              <h3 className="text-sm md:text-base text-white font-medium text-center px-2 leading-snug mb-3">
                {video.title}
              </h3>

              {/* Video container */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-transparent hover:border-[rgba(212,175,55,0.6)] transition-all duration-500 hover-lift group">
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

                {/* Hover glow overlay - Gold */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 30px rgba(212, 175, 55, 0.3)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
