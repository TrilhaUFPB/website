"use client";

import { createContext, useContext, useState, useEffect } from "react";

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
  t: <T = string>(key: string, params?: Record<string, string>) => T;
  locale: Locale;
  changeLanguage: (newLocale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt");

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
  const t = <T = string,>(
    key: string,
    params: Record<string, string> = {}
  ): T => {
    const keys = key.split(".");
    let value: unknown = translations[locale];

    // Navigate through the keys
    for (const k of keys) {
      if (
        typeof value === "object" &&
        value !== null &&
        k in (value as Record<string, unknown>)
      ) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Key not found, return original key for string type or empty array/object for other types
        return key as unknown as T;
      }
    }

    if (value === undefined) {
      return key as unknown as T;
    }

    // Replace parameters in the string if value is a string
    if (typeof value === "string") {
      let result = value;
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(`{{${paramKey}}}`, paramValue);
      });
      return result as unknown as T;
    }

    // For non-string values (arrays, objects), return as is
    return value as T;
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
