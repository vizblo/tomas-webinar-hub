export const HomeTopBannerA = () => {
  return (
    <div
      className="relative w-full py-3 px-4"
      style={{
        background: 'linear-gradient(90deg, #7A5C0B 0%, #A68A2E 50%, #7A5C0B 100%)',
        boxShadow: '0 2px 16px rgba(212, 175, 55, 0.22)',
      }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-center">
        <span className="text-white text-[10px] md:text-sm font-bold tracking-wide text-center uppercase flex items-center gap-2 justify-center">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Trusted By Over 1,000 US AMZ Sellers | Live On Zoom
        </span>
      </div>
    </div>
  );
};

export default HomeTopBannerA;
