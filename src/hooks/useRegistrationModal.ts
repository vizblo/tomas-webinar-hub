import { create } from 'zustand';

interface RegistrationModalState {
  isOpen: boolean;
  openRegistrationModal: () => void;
  closeRegistrationModal: () => void;
}

export const useRegistrationModal = create<RegistrationModalState>((set) => ({
  isOpen: false,
  openRegistrationModal: () => set({ isOpen: true }),
  closeRegistrationModal: () => set({ isOpen: false }),
}));
