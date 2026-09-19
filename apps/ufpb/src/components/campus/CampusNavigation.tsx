"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
export default function CampusNavigation() {
const { t, locale, changeLanguage } = useTranslation();
return (        <nav className="campus-nav" aria-label={t("campus.text28")}>
          <div className="campus-brand-group">          <Link
            href="/"
            className="campus-brand"
            aria-label={t("campus.text29")}
          >
            <img src="/campus/trilha.svg" width="60" height="45" alt="" />
            <span>
              trilha
            </span>
          </Link></div>
          <div className="campus-nav-links">
            <a href="/#sobre">{t("campus.text0")}</a>
            <a href="/#turmas">{t("campus.text1")}</a>
            <Link href="/materiais">{t("campus.text3")}</Link>
          <a className="campus-main-site" href={process.env.NEXT_PUBLIC_TRILHA_URL || "https://otrilha.com"}>{t("campus.text5")}<ArrowUpRight size={16} />
          </a>
          </div>
          <div className="campus-nav-actions"><Link className="campus-button" href="/aulas">{t("campus.text4")}<ArrowUpRight size={17} />
          </Link>

          <button className="campus-language" onClick={() => changeLanguage(locale === "pt" ? "en" : "pt")} aria-label={locale === "pt" ? "Switch to English" : "Mudar para português"}>{locale === "pt" ? "EN" : "PT"}</button>
          </div>
        </nav>
);
}
