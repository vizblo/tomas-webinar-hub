export const AtmosphericBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle top white highlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.16] blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)',
        }}
      />

      {/* Very faint grid texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.25) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(201,168,76,0.25) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
};
