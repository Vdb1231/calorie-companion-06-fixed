
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '@/translations';
import { toast } from '@/hooks/use-toast';
import { TranslationKey } from '@/translations';

export type Language = 'en' | 'bg' | 'de' | 'es' | 'fr' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  languageMap: Record<Language, string>;
  t: (key: TranslationKey) => string;
}

const defaultLanguageContext: Omit<LanguageContextType, 't'> = {
  language: 'en',
  setLanguage: () => {},
  languageMap: {
    en: 'English',
    bg: 'Български',
    de: 'Deutsch',
    es: 'Español',
    fr: 'Français',
    it: 'Italiano'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  ...defaultLanguageContext,
  t: (key) => key
});

export const useLanguage = () => useContext(LanguageContext);

export const useTranslation = () => {
  const { t } = useContext(LanguageContext);
  return { t };
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get saved language from localStorage or use browser language as default
  const getSavedLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && Object.keys(defaultLanguageContext.languageMap).includes(savedLanguage)) {
      return savedLanguage as Language;
    }
    
    // Try to match browser language to available languages
    const browserLang = navigator.language.split('-')[0];
    if (Object.keys(defaultLanguageContext.languageMap).includes(browserLang)) {
      return browserLang as Language;
    }
    
    return 'en';
  };

  const [language, setLanguage] = useState<Language>(getSavedLanguage());
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
    document.documentElement.lang = language;
    
    if (!isInitialRender) {
      // Don't show toast on initial render
      const translatedMessage = translations[language].language_changed || 'Language changed successfully';
      toast({
        title: translatedMessage,
        duration: 2000,
      });
    } else {
      setIsInitialRender(false);
    }
  }, [language, isInitialRender]);

  // Translation function
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const value = {
    language,
    setLanguage,
    languageMap: defaultLanguageContext.languageMap,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
