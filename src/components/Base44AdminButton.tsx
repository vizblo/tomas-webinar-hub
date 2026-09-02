import { useNavigate } from 'react-router-dom';

/**
 * Floating admin button — only visible when the app runs inside the Base44
 * preview iframe (not in production). Links to the /admin/optin dashboard.
 */
const Base44AdminButton = () => {
  const navigate = useNavigate();

  let inIframe = false;
  try {
    inIframe = window.self !== window.top;
  } catch {
    inIframe = true;
  }

  if (!inIframe) return null;

  return (
    <button
      onClick={() => navigate('/admin/optin')}
      aria-label="Admin dashboard"
      title="Admin dashboard"
      style={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        zIndex: 99998,
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: 'none',
        background: '#1a1a1a',
        color: '#D4AF37',
        fontSize: 20,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
        opacity: 0.5,
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5'; }}
    >
      ⚙
    </button>
  );
};

export default Base44AdminButton;
