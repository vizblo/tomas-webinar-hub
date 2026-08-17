import { useState, useEffect } from 'react';
import { formatEventDateLong } from '@/hooks/useCountdown';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useRegistrationModal } from '@/hooks/useRegistrationModal';
import { useUTM } from '@/hooks/useUTM';
import { pushToDataLayer } from '@/lib/utm';
import { getABVariant } from '@/hooks/useABTest';
import { saveRegistrationData } from '@/lib/registrationData';
import { trackRegistration } from '@/lib/tracking';
import { getRegistrationWebhookUrl } from '@/lib/registrationWebhook';

// Helper to get variant with URL-based fallback when localStorage fails
const getVariantWithFallback = (): string => {
  const storedVariant = getABVariant();
  if (storedVariant) return storedVariant;
  const currentPath = window.location.pathname;
  if (currentPath === '/a') return 'B';
  if (currentPath === '/b') return 'C';
  if (currentPath === '/') return 'A';
  return 'unknown';
};

const registrationSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().min(1, "Phone number is required").refine((value) => {
    try {
      return isValidPhoneNumber(value);
    } catch {
      return false;
    }
  }, "Please enter a valid phone number"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export const RegistrationModal = () => {
  const { isOpen, closeRegistrationModal } = useRegistrationModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(120);
  const navigate = useNavigate();
  const { toast } = useToast();
  const utmParams = useUTM();

  useEffect(() => {
    if (!isOpen) return;
    setSecondsLeft(120);
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Prefetch the /registered chunk as soon as the modal opens so navigation is instant
  useEffect(() => {
    if (isOpen) {
      import('@/pages/PkConfirmed').catch(() => {});
    }
  }, [isOpen]);

  const mm = Math.floor(secondsLeft / 60);
  const ss = String(secondsLeft % 60).padStart(2, '0');

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    setIsSubmitting(true);

    // Parse phone — only emit values when we have a real national number.
    // Avoids stray "+1" being sent when the user opens the picker but types nothing.
    let countryCode = '';
    let phone = '';
    const rawPhone = data.phone?.trim() ?? '';
    if (rawPhone.length > 0 && isValidPhoneNumber(rawPhone)) {
      try {
        const pn = parsePhoneNumber(rawPhone);
        if (pn && pn.nationalNumber) {
          countryCode = `+${pn.countryCallingCode}`;
          phone = pn.nationalNumber;
        }
      } catch (error) {
        console.error('Error parsing phone number:', error);
      }
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('en-GB', {
      hour: '2-digit', minute: '2-digit', hour12: false
    });

    const rawName = data.firstName.trim().replace(/\s+/g, ' ');
    const spaceIdx = rawName.indexOf(' ');
    const firstName = spaceIdx === -1 ? rawName : rawName.slice(0, spaceIdx);
    const lastName = spaceIdx === -1 ? '' : rawName.slice(spaceIdx + 1).trim();

    const payload = {
      firstName,
      lastName,
      email: data.email,
      countryCode,
      phone,
      registrationDate: `${formattedDate} ${formattedTime}`,
      registrationDateISO: now.toISOString(),
      utm_source: utmParams.utm_source || '',
      utm_medium: utmParams.utm_medium || '',
      utm_campaign: utmParams.utm_campaign || '',
      utm_term: utmParams.utm_term || '',
      utm_content: utmParams.utm_content || '',
      utm_id: utmParams.utm_id || '',
      ab_variant: getVariantWithFallback(),
    };

    // Fire-and-forget webhook (keepalive ensures it completes after navigation)
    try {
      fetch(getRegistrationWebhookUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        keepalive: true,
        body: JSON.stringify(payload),
      }).catch((err) => console.error('Webhook error:', err));
    } catch (err) {
      console.error('Webhook error:', err);
    }

    // Log registration to admin dashboard.
    trackRegistration({
      email: data.email,
      first_name: firstName,
      last_name: lastName,
      phone,
      country_code: countryCode,
    });

    // Persist registration data for downstream pages
    saveRegistrationData({
      firstName,
      lastName,
      email: data.email,
      phone,
      countryCode,
    });

    // GTM event
    pushToDataLayer('registration_completed', {
      user_data: {
        email: data.email,
        phone: phone ? `${countryCode}${phone}` : '',
      },
      ab_variant: getVariantWithFallback(),
    });

    // Navigate immediately, close modal on next frame to avoid flash
    navigate('/confirmed');
    requestAnimationFrame(() => closeRegistrationModal());
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeRegistrationModal}>
      <DialogContent
        className="max-w-[calc(100vw-32px)] sm:max-w-[480px] mx-auto p-0 border-0"
        style={{
          background: '#1A1A1A',
          boxShadow: '0 0 60px rgba(212, 175, 55, 0.4)',
        }}
      >
        <div className="p-5 sm:p-8">
          <DialogHeader className="mb-6">
            <p
              className="text-center mb-2"
              style={{
                fontFamily: '"Plus Jakarta Sans", Inter, system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(12px, 3.2vw, 15px)',
                fontWeight: 600,
                fontStyle: 'italic',
                color: '#FFFFFF',
                lineHeight: 1.3,
              }}
            >
              Live On {formatEventDateLong()}
            </p>
            <DialogTitle
              className="font-bold text-center"
              style={{
                fontSize: 'clamp(15px, 4.5vw, 24px)',
                lineHeight: 1.2,
                background: 'linear-gradient(180deg, #D4AF37 0%, #B8860B 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Your Ticket is Reserved for {mm}:{ss}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <label htmlFor="firstName" className="block text-white text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <FormControl>
                      <Input
                        {...field}
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        autoComplete="given-name"
                        className={`h-11 sm:h-12 bg-[#0B0B0B] text-white placeholder:text-gray-500 ${
                          fieldState.error
                            ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                            : 'border-[#D4AF37]/30 focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                      Email
                    </label>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        autoComplete="email"
                        className={`h-11 sm:h-12 bg-[#0B0B0B] text-white placeholder:text-gray-500 ${
                          fieldState.error
                            ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                            : 'border-[#D4AF37]/30 focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        id="phone"
                        name="phone"
                        defaultCountry="US"
                        international
                        autoComplete="tel"
                        className={`phone-input h-12 ${fieldState.error ? 'phone-input-error' : ''}`}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 sm:h-16 rounded-md font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-1"
                style={{
                  background: 'linear-gradient(180deg, #D4AF37 0%, #B8860B 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 0 40px rgba(212, 175, 55, 0.6), 0 8px 32px rgba(212, 175, 55, 0.4)',
                }}
              >
                {isSubmitting ? (
                  'REGISTERING...'
                ) : (
                  <>
                    <span className="text-sm sm:text-base font-bold leading-tight tracking-wide">CLAIM MY FREE TICKET</span>
                    <span className="text-[10px] sm:text-sm font-normal leading-tight tracking-wide">(LIMITED SPACES REMAINING)</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                Get My "Amazon Wholesale A-Z Roadmap" Sent To Your Inbox When You Register For Free
              </p>

              <div className="flex items-center justify-center gap-2 mt-2">
                <Lock size={14} className="text-gray-400" />
                <p className="text-xs text-gray-400">
                  Your information is 100% secure.
                </p>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>

      <style>{`
        .phone-input .PhoneInputInput {
          height: 48px;
          background: #0B0B0B;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 0.375rem;
          color: white;
          padding: 0 12px;
          font-size: 14px;
          width: 100%;
          outline: none;
          transition: all 0.2s;
        }

        .phone-input .PhoneInputInput:focus {
          border-color: #D4AF37;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        }

        .phone-input .PhoneInputInput::placeholder {
          color: #6b7280;
        }

        .phone-input-error .PhoneInputInput {
          border-color: #ef4444;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
        }

        .phone-input .PhoneInputCountrySelect {
          background: #0B0B0B;
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: white;
          margin-right: 8px;
          border-radius: 0.375rem;
          padding: 4px;
        }

        .phone-input .PhoneInputCountrySelectArrow {
          color: white;
          opacity: 0.5;
        }
      `}</style>
    </Dialog>
  );
};
