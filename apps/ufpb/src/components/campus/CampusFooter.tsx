"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
export default function CampusFooter() {
const { t } = useTranslation();
return (        <footer className="campus-footer">
          <div>
            <img src="/campus/trilha.svg" width="65" height="50" alt="Trilha" />
            <h2>{t("campus.text21")}<br />{t("campus.text22")}</h2>
          </div>
          <nav aria-label={t("campus.text32")}>
            <Link href="/aulas">{t("campus.text23")}</Link>
            <Link href="/materiais">{t("campus.text24")}</Link>
            <a href="/#turmas">{t("campus.text25")}</a>
            <a
              href={
                process.env.NEXT_PUBLIC_TRILHA_URL || "https://otrilha.com"
              }
            >{t("campus.text26")}<ArrowUpRight size={16} />
            </a>
          </nav>
          <small>Trilha UFPB</small>
        </footer>
);
}
