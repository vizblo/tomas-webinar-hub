import { create } from 'zustand';
import { useEffect } from 'react';

interface TicketsState {
  ticketsRemaining: number;
  decrement: () => void;
}

const useTicketsStore = create<TicketsState>((set) => ({
  ticketsRemaining: 9,
  decrement: () => set((state) => ({ 
    ticketsRemaining: state.ticketsRemaining > 3 ? state.ticketsRemaining - 1 : 3 
  })),
}));

export const useTicketsRemaining = () => {
  const { ticketsRemaining, decrement } = useTicketsStore();

  useEffect(() => {
    const interval = setInterval(() => {
      decrement();
    }, 20000);

    return () => clearInterval(interval);
  }, [decrement]);

  return ticketsRemaining;
};
