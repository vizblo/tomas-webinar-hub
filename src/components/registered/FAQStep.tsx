import StepBadge from './StepBadge';
import VideoContainer from '@/components/confirmed/VideoContainer';

const faqVideos = [
  { id: 'qh4sliub08', title: 'Is this Live?' },
  { id: '6xuhc1yl75', title: "What if I can't make the workshop?" },
  { id: '0wtdq4vy2f', title: 'I got burned before... will this work?' },
  { id: 'rnwj8r01zk', title: 'Will you try to sell me something?' },
  { id: 'h08y5acdh3', title: "Isn't Amazon Saturated?" },
  { id: 'clx8ipw5n1', title: 'Can I do this without any special skills?' },
  { id: '91erd5fhp9', title: 'Why should you trust me?' },
  { id: 'vemdqv9eyd', title: 'How much time does this actually take?' },
  { id: 'lfkbfywzyu', title: 'FAQ' },
  { id: 'hqppxaxcv0', title: 'FAQ' },
  { id: 'jt1je1eoxv', title: 'FAQ' },
];

interface FAQStepProps {
  noCard?: boolean;
}

const FAQStep = ({ noCard }: FAQStepProps) => {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-8 sm:pb-20 pt-12 sm:pt-16">
      <div className="flex flex-col items-center text-center">
        {!noCard && <StepBadge stepNumber={3} />}

        <h2
          className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8"
          style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
        >
          Get Your Burning Questions Answered Before The Workshop
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {faqVideos.map((video) => (
            <div key={video.id}>
              <VideoContainer
                wistiaId={video.id}
                width="full"
                borderColor="gold"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQStep;
