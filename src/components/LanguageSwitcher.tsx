"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { usePostHogTracking } from "@/hooks/usePostHogTracking";

export default function LanguageSwitcher() {
  const { locale, changeLanguage } = useTranslation();
  const { trackLanguageSwitch } = usePostHogTracking();

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => {
          changeLanguage("pt");
          trackLanguageSwitch("pt");
        }}
        className={`py-1 px-2 text-sm rounded-md ${
          locale === "pt"
            ? "bg-VerdeMenta text-white"
            : "bg-transparent text-gray-600 hover:bg-gray-100"
        }`}
      >
        PT
      </button>
      <button
        onClick={() => {
          changeLanguage("en");
          trackLanguageSwitch("en");
        }}
        className={`py-1 px-2 text-sm rounded-md ${
          locale === "en"
            ? "bg-VerdeMenta text-white"
            : "bg-transparent text-gray-600 hover:bg-gray-100"
        }`}
      >
        EN
      </button>
    </div>
  );
}
