"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
export type HeroTime = "day" | "sunset" | "night";
export function timeOfDay(hour: number): HeroTime {
  return hour >= 6 && hour < 16 ? "day" : hour >= 16 && hour < 19 ? "sunset" : "night";
}
export default function HeroLandscape() {
  const scene = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<HeroTime>("day");
  useEffect(() => {
    const hero = scene.current?.parentElement;
    if (!hero) return;
    const updateTime = () => {
      const preview = new URLSearchParams(location.search).get("heroTime");
      const next = preview === "day" || preview === "sunset" || preview === "night" ? preview : timeOfDay(new Date().getHours());
      setTime(next);
      hero.dataset.time = next;
      hero.closest('.design')?.setAttribute('data-hero-time', next);
    };
    updateTime();
    const timer = window.setInterval(updateTime, 60000);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const draw = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const progress = reduced.matches ? 0 : Math.max(0, Math.min(-rect.top, rect.height));
      scene.current?.style.setProperty('--far-shift', `${progress * .18}px`);
      scene.current?.style.setProperty('--near-shift', `${progress * .06}px`);
      scene.current?.style.setProperty('--cloud-shift', `${progress * .27}px`);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(draw); };
    addEventListener('scroll', onScroll, {passive:true});
    reduced.addEventListener('change', draw);
    draw();
    return () => { clearInterval(timer); cancelAnimationFrame(frame); removeEventListener('scroll',onScroll); reduced.removeEventListener('change',draw); };
  }, []);
  return <div ref={scene} className="hero-landscape" data-time={time} aria-hidden="true">
    <div className="hero-sky" />
    <div className="hero-stars" />
    <div className="hero-celestial" />
    <div className="hero-cloud-layer">
      {[0,1,2,3].map(i => <div className={`hero-cloud hero-cloud-${i}`} key={i}><img src={`/community/cloud-pixel${i%2 ? '-2' : ''}.png`} alt="" /></div>)}
    </div>
    <img className="hero-terrain" src="/community/hero/terrain.png" alt="" fetchPriority="high" />
    <img className="hero-foreground" src="/community/hero/foreground.png" alt="" />
  </div>;
}
