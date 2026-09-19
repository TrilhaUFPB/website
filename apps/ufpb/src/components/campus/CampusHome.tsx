"use client";
/* eslint-disable @next/next/no-img-element */
import { ButtonLink } from "@trilha/ui";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowUpRight, ArrowRight, BookOpen, CalendarDays } from "lucide-react";
import Sobre from "@/components/Sobre";
import Numbers from "@/components/Numbers";
import Turmas from "@/components/Turmas";
import Depoimentos from "@/components/Depoimentos";
import QuemSomos from "@/components/QuemSomos";
import Materiais from "@/components/Materiais";
import FAQ from "@/components/FAQ";
import { TickProvider, useReveal } from "@/components/home/shared";

import CampusNavigation from "./CampusNavigation";
import CampusFooter from "./CampusFooter";
import CampusStickers from "./CampusStickers";
import HeroStickers from "./HeroStickers";
import CampusPhotoStory from "./CampusPhotoStory";

export default function CampusHome() {
  useReveal();
  const { t } = useTranslation();
  return (
    <TickProvider interval={4500}>
      <div className="campus-home" id="inicio">
        <CampusNavigation />
        <main>
          <CampusStickers />
          <section className="campus-hero" aria-labelledby="campus-title">
            <div className="campus-hero-copy">
              <HeroStickers />
              <span className="campus-eyebrow">{t("campus.text6")}</span>
              <h1 id="campus-title">{t("campus.text7")}{" "}<br />{t("campus.text8")}<br />
                <em>{t("campus.text9")}</em>
              </h1>
              <p>{t("campus.text10")}</p>
              <div className="campus-actions">
                <ButtonLink href="#sobre">{t("campus.text11")}<ArrowRight size={18} />
                </ButtonLink>
                <Link href="/materiais" className="campus-text-link">{t("campus.text12")}<ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
            <CampusPhotoStory />
          </section>
          <section
            className="campus-shortcuts"
            aria-label={t("campus.text31")}
          >
            <Link href="/aulas">
              <CalendarDays size={24} />
              <div>
                <span>{t("campus.text15")}</span>
                <h2>{t("campus.text16")}</h2>
                <p>{t("campus.text17")}</p>
              </div>
              <ArrowUpRight />
            </Link>
            <Link href="/materiais">
              <BookOpen size={24} />
              <div>
                <span>{t("campus.text18")}</span>
                <h2>{t("campus.text19")}</h2>
                <p>{t("campus.text20")}</p>
              </div>
              <ArrowUpRight />
            </Link>
          </section>
          <Sobre />
          <Numbers />
          <Turmas />
          <Depoimentos />
          <QuemSomos />
          <Materiais />
          <FAQ />
        </main>
        <CampusFooter />
      </div>
    </TickProvider>
  );
}
