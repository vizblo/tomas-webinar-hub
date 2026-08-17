const STORAGE_KEY = 'registration_data';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
}

export const saveRegistrationData = (data: RegistrationData): void => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getRegistrationData = (): RegistrationData | null => {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

const QUIZ_KEY = 'quiz_answers';

interface QuizAnswers {
  quiz_q1_experience?: string;
  quiz_q2_goal?: string;
  quiz_q3_time?: string;
  quiz_q4_capital?: string;
  quiz_q5_readiness?: string;
  quiz_q6_credit?: string;
  quiz_result: string;
}

export const saveQuizAnswers = (data: QuizAnswers): void => {
  sessionStorage.setItem(QUIZ_KEY, JSON.stringify(data));
};

export const getQuizAnswers = (): QuizAnswers | null => {
  const stored = sessionStorage.getItem(QUIZ_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};
