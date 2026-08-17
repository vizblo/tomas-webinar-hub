import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_GROUP_URL } from '@/lib/eventDate';

const RegisteredStickyFooter = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        opacity: visible ? 1 : 0,
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(212, 175, 55, 0.4)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-center px-4 py-3">
        <a
          href={WHATSAPP_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto sm:px-10 px-4 py-2.5 rounded-lg font-bold text-sm sm:text-base text-white transition-transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3"
          style={{
            background: '#25D366',
            boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
          }}
        >
          <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
          Gå med i WhatsApp-gruppen
        </a>
      </div>
    </div>
  );
};

export default RegisteredStickyFooter;
