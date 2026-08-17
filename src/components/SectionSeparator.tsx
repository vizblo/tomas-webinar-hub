export const SectionSeparator = () => {
  return (
    <div
      style={{
        width: '100%',
        padding: '16px 0',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '90%',
          maxWidth: '900px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 15%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.2) 85%, transparent 100%)',
          boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)',
        }}
      />
    </div>
  );
};
