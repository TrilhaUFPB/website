"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import ptCommon from "../locales/pt/common.json";
import enCommon from "../locales/en/common.json";

type Locale = "pt" | "en";

type Translations = {
  [key in Locale]: typeof ptCommon;
};

const translations: Translations = {
  pt: ptCommon,
  en: enCommon,
};

interface I18nContextType {
  t: (key: string, params?: Record<string, string>) => any;
  locale: Locale;
  changeLanguage: (newLocale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt");
  const pathname = usePathname();

  // Check local storage or browser preferences on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale && (savedLocale === "pt" || savedLocale === "en")) {
      setLocale(savedLocale);
    } else {
      // Default to browser preference if available
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en") {
        setLocale("en");
      }
    }
  }, []);

  // Update HTML lang attribute when locale changes
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Function to get a translation by key
  const t = (key: string, params: Record<string, string> = {}) => {
    const keys = key.split(".");
    let value = keys.reduce((obj: any, k) => {
      return obj?.[k];
    }, translations[locale]);

    if (value === undefined) {
      return key;
    }

    // Replace parameters in the string
    if (typeof value === "string") {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = (value as string).replace(`{{${paramKey}}}`, paramValue);
      });
    }

    return value;
  };

  // Function to change the language
  const changeLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  return (
    <I18nContext.Provider value={{ t, locale, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
