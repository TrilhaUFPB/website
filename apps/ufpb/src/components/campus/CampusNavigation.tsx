"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
export default function CampusNavigation() {
const [open, setOpen] = useState(false);
const { t, locale, changeLanguage } = useTranslation();
return (        <nav className={`campus-nav${open ? " campus-nav-open" : ""}`} aria-label={t("campus.text28")}>
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
          <div id="campus-menu" className="campus-nav-links" onClick={() => setOpen(false)}>
            <a href="/#sobre">{t("campus.text0")}</a>
            <a href="/#turmas">{t("campus.text1")}</a>
            <Link href="/materiais">{t("campus.text3")}</Link>
          <Link href="/aulas">{locale === "pt" ? "Aulas" : "Classes"}</Link>
          </div>
          <div className="campus-nav-actions"><a className="campus-button" href={process.env.NEXT_PUBLIC_TRILHA_URL || "https://otrilha.com"}>{t("campus.text5")}<ArrowUpRight size={17} />
          </a>

          <button className="campus-language" onClick={() => changeLanguage(locale === "pt" ? "en" : "pt")} aria-label={locale === "pt" ? "Switch to English" : "Mudar para português"}>{locale === "pt" ? "EN" : "PT"}</button>
          <button type="button" className="campus-menu-toggle" aria-expanded={open} aria-controls="campus-menu" aria-label={locale === "pt" ? "Menu de navegação" : "Navigation menu"} onClick={() => setOpen(!open)}>{open ? <X size={22}/> : <Menu size={22}/>}</button>
          </div>
        </nav>
);
}
