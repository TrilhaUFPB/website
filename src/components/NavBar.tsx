"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePostHogTracking } from "@/hooks/usePostHogTracking";

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className="relative text-gray-600 hover:text-gray-800 transition-all duration-300 group"
      onClick={onClick}
    >
      {children}
      <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 rounded bg-AzulCeu transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

export default function Navbar() {
  const { t } = useTranslation();
  const { trackNavigationClick } = usePostHogTracking();

  return (
    <nav className="bg-gradient-to-b from-AzulCeu/10 to-AzulCeu/0 font-poppins">
      <div className="container mx-auto px-4 md:px-28 py-5 flex justify-between items-center">
        <div className="text-xl font-bold text-AzulMeiaNoite select-none">
          trilha
        </div>
        <div className="hidden md:flex space-x-12 text-AzulMeiaNoite">
          <NavLink href="#sobre" onClick={() => trackNavigationClick("sobre")}>{t("navbar.about")}</NavLink>
          <NavLink href="#depoimentos" onClick={() => trackNavigationClick("depoimentos")}>{t("navbar.testimonials")}</NavLink>
          <NavLink href="#turmas" onClick={() => trackNavigationClick("turmas")}>{t("navbar.classes")}</NavLink>
          <NavLink href="#quem-somos" onClick={() => trackNavigationClick("quem-somos")}>{t("navbar.who")}</NavLink>
          <NavLink href="#faq" onClick={() => trackNavigationClick("faq")}>{t("navbar.faq")}</NavLink>
        </div>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
