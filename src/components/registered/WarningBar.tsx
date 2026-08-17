const WarningBar = () => {
  return (
    <div
      className="sticky top-0 z-50 h-8 sm:h-9 md:h-10 flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
        boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)',
      }}
    >
      <span className="text-xs sm:text-[13px] font-bold uppercase italic tracking-wide text-white">
        WELL DONE! YOU&rsquo;RE REGISTERED!
      </span>
    </div>
  );
};

export default WarningBar;
