import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const STORAGE_KEY = 'replay_unlocked';

type Listener = () => void;
const listeners = new Set<Listener>();
let unlocked = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1';
let modalOpen = false;

const emit = () => listeners.forEach((l) => l());

export const openUnlockModal = () => { modalOpen = true; emit(); };
export const closeUnlockModal = () => { modalOpen = false; emit(); };
export const setUnlocked = () => {
  unlocked = true;
  try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
  modalOpen = false;
  emit();
};

export const useReplayUnlock = () => {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return { unlocked, modalOpen, openUnlockModal, closeUnlockModal };
};

export const ReplayUnlockModal = () => {
  const { modalOpen: open } = useReplayUnlock();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast({ title: 'Fyll i namn och en giltig e-postadress', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      await supabase.functions.invoke('register-repris', {
        body: { name: name.trim(), email: email.trim() },
      });
    } catch (err) {
      console.error('replay registration failed', err);
    }
    setLoading(false);
    setUnlocked();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? openUnlockModal() : closeUnlockModal())}>
      <DialogContent
        className="max-w-[calc(100vw-32px)] sm:max-w-[440px] border-0 p-0"
        style={{ background: '#141414', boxShadow: '0 0 60px rgba(212,175,55,0.35)' }}
      >
        <div className="p-6 sm:p-8">
          <DialogHeader className="mb-5">
            <DialogTitle className="text-center text-xl font-bold text-white">
              Lås upp reprisen
            </DialogTitle>
          </DialogHeader>
          <p className="mb-5 text-center text-sm text-white/60">
            Fyll i ditt namn och din e-post så får du direkt tillgång till hela föreläsningen.
          </p>
          <form onSubmit={submit} className="space-y-3" autoComplete="on">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ditt namn"
              autoComplete="name"
              className="h-12 border-white/10 bg-white/5 text-white placeholder:text-white/40"
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Din e-postadress"
              autoComplete="email"
              className="h-12 border-white/10 bg-white/5 text-white placeholder:text-white/40"
            />
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-lg text-base font-bold text-black transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: 'linear-gradient(180deg, #E5C05E 0%, #C9A84C 100%)' }}
            >
              {loading ? 'Låser upp...' : 'LÅS UPP REPRISEN'}
            </button>
          </form>
          <p className="mt-4 text-center text-[11px] text-white/40">
            Vi skickar aldrig skräppost. Du kan avregistrera dig när som helst.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
