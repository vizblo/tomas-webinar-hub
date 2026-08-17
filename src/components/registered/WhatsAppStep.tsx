import { FaWhatsapp } from 'react-icons/fa';
import StepBadge from './StepBadge';
import customRoadmapBook from '@/assets/custom-roadmap-book.png.asset.json';

const WhatsAppStep = () => {
  return (
    <div
      data-step="1"
      className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-8 sm:pb-12 pt-6 sm:pt-8 md:pt-8"
    >
      <div
        className="px-3 pt-3 pb-3 sm:p-6 md:p-8 lg:p-10 rounded-lg"
        style={{
          background: 'rgba(30, 30, 30, 0.9)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}
      >
        <div className="flex flex-col items-center text-center">
          <StepBadge stepNumber={1} />
          
          <h2
            className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-4"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
          >
            SUPER IMPORTANT: Join the WhatsApp Group Now!
          </h2>
          
          <p className="text-xs sm:text-base text-gray-400 pb-2 mb-6">
            Your "Custom A-Z Amazon Wholesale Roadmap", other private resources, and access to us is waiting for you in the group!
          </p>

          {/* Product Image */}
          <img
            src={customRoadmapBook.url}
            alt="Custom A-Z Amazon Wholesale Roadmap"
            className="w-32 sm:w-36 md:w-40 h-auto rounded-lg mb-6"
            fetchPriority="high"
            loading="eager"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))',
              boxShadow: '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3)',
            }}
          />

          <a
            href="https://chat.whatsapp.com/GeKxc7D1kQdJhs0x05ta2r"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto sm:min-w-[280px] h-12 sm:h-14 rounded-lg flex items-center justify-center gap-2 sm:gap-3 transition-all hover:scale-105"
            style={{
              background: '#25D366',
              boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(37, 211, 102, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.3)';
            }}
          >
            <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span className="text-base sm:text-lg font-semibold text-white">
              Join the WhatsApp Group
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppStep;
