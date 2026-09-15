"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

import { stickerModels as models } from "./stickerModels";
const source = (model: number) => `/campus/stickers/${models[model]}.png`;
type Sticker = { id: number; model: number; x: number; y: number; angle: number };
const initial: Sticker[] = [{id:0, model:0, x:2, y:29, angle:-16}, {id:1, model:1, x:86, y:64, angle:14}];
export default function HeroStickers() {
  const { locale } = useTranslation();
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const layer = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);
  const drag = useRef<{id:number; startX:number; startY:number; x:number; y:number; moved:boolean} | null>(null);
  const suppressClick = useRef(false);
  const desktop = () => window.matchMedia("(min-width: 951px) and (hover: hover) and (pointer: fine)").matches;
  const clamp = (x:number, y:number) => {
    const rect = layer.current!.getBoundingClientRect();
    const size = Math.min(165, rect.width * .12);
    return { x: Math.max(0, Math.min(x, 100 - size / rect.width * 100)), y: Math.max(0, Math.min(y, 100 - size / rect.height * 100)) };
  };
  useEffect(() => {
    if (!desktop()) { setStickers(initial); return; }
    const count = 3 + Math.floor(Math.random() * 4);
    const available = models.map((_, index) => index);
    const rect = layer.current!.getBoundingClientRect();
    const sizePercent = Math.min(165, rect.width * .12) / rect.width * 100;
    const generated = Array.from({length:count}, (_, index) => {
      const choice = Math.floor(Math.random() * available.length);
      const model = available.splice(choice, 1)[0];
      const right = index % 2 === 1;
      // Two vertical lanes outside the central reading area, with separated rows.
      const edge = 1 + Math.random() * 2;
      const rows = Math.ceil(count / 2);
      const y = 8 + Math.floor(index / 2) * (60 / Math.max(1, rows - 1)) + Math.random() * 8;
      return {id:index, model, ...clamp(right ? 100-sizePercent-edge : edge, y), angle:Math.random()*50-25};
    });
    nextId.current = count;
    setStickers(generated);
  }, []);
  useEffect(() => {
    const host = document;
    if (!layer.current) return;
    const add = (event: MouseEvent) => {
      if (!desktop() || !(event.target instanceof Element)) return;
      if (event.target.closest('a,button,input,textarea,select,label,h1,h2,h3,p,span,svg,img,figure,[role="button"]')) return;
      const rect = layer.current!.getBoundingClientRect();
      if(event.clientY < rect.top || event.clientY > rect.bottom) return;
      const size = Math.min(165, rect.width * .12);
      const pos = clamp((event.clientX - rect.left - size / 2) / rect.width * 100, (event.clientY - rect.top - size / 2) / rect.height * 100);
      setStickers(items => [...items, {id:nextId.current++, model:Math.floor(Math.random()*models.length), ...pos, angle:Math.random()*40-20}]);
    };
    host.addEventListener("dblclick", add);
    return () => host.removeEventListener("dblclick", add);
  }, []);
  return <div ref={layer} className="hero-sticker-playground">
    {stickers.map(sticker => <button key={sticker.id} type="button" className="hero-play-sticker"
      aria-label={locale === "pt" ? "Trocar adesivo; arraste para mover" : "Change sticker; drag to move"}
      style={{left:`${sticker.x}%`,top:`${sticker.y}%`}}
      onClick={() => {
        if (!desktop() || suppressClick.current) { suppressClick.current = false; return; }
        setStickers(items => items.map(item => item.id === sticker.id ? {...item, model:(item.model+1)%models.length, angle:Math.random()*50-25} : item));
      }}
      onPointerDown={event => {
        if (!desktop() || event.button !== 0) return;
        suppressClick.current = false;
        drag.current = {id:sticker.id,startX:event.clientX,startY:event.clientY,x:sticker.x,y:sticker.y,moved:false};
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={event => {
        const current = drag.current;
        if (!current || current.id !== sticker.id) return;
        const dx = event.clientX-current.startX, dy = event.clientY-current.startY;
        if (Math.hypot(dx,dy)>5) current.moved=true;
        if (!current.moved) return;
        const rect = layer.current!.getBoundingClientRect();
        const pos = clamp(current.x+dx/rect.width*100,current.y+dy/rect.height*100);
        setStickers(items => items.map(item => item.id===sticker.id ? {...item,...pos}:item));
      }}
      onPointerUp={event => { suppressClick.current=drag.current?.moved ?? false; drag.current=null; if(event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
      onPointerCancel={() => {drag.current=null;suppressClick.current=true;}}
    ><img src={source(sticker.model)} alt="" draggable={false} style={{transform:`rotate(${sticker.angle}deg)`}} /></button>)}
  </div>;
}
