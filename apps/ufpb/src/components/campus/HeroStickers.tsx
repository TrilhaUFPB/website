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
  const stickerSize = (width:number) => window.matchMedia("(max-width: 700px)").matches ? 75 : Math.min(165, width * .12);
  const clamp = (x:number, y:number) => {
    const rect = layer.current!.getBoundingClientRect();
    const size = stickerSize(rect.width);
    return { x: Math.max(0, Math.min(x, 100 - size / rect.width * 100)), y: Math.max(0, Math.min(y, 100 - size / rect.height * 100)) };
  };
  useEffect(() => {
    if (!desktop()) { setStickers(initial.map(item => ({...item, ...clamp(item.x, item.y)}))); return; }
    const count = 5 + Math.floor(Math.random() * 5);
    const available = models.map((_, index) => index);
    const rect = layer.current!.getBoundingClientRect();
    const size = stickerSize(rect.width);
    // Five balanced anchors first; extra stickers fill the spaces between them.
    // Coordinates describe sticker centers, with small independent offsets.
    const anchors = [
      [14, 23], [76, 17], [88, 56], [64, 82], [17, 76],
      [43, 14], [40, 70], [62, 44], [12, 49],
    ];
    const mirror = Math.random() < .5;
    const generated = Array.from({length:count}, (_, index) => {
      const choice = Math.floor(Math.random() * available.length);
      const model = available.splice(choice, 1)[0];
      const [baseX, baseY] = anchors[index];
      let centerX = (mirror ? 100 - baseX : baseX) + (Math.random() - .5) * 8;
      const centerY = baseY + (Math.random() - .5) * 8;
      // Reserve the middle of the copy for reading; only initial placement is constrained.
      const halfWidth = size / rect.width * 50;
      const halfHeight = size / rect.height * 50;
      if (centerY + halfHeight > 30 && centerY - halfHeight < 68 &&
          centerX + halfWidth > 34 && centerX - halfWidth < 66) {
        centerX = centerX < 50 ? 34 - halfWidth : 66 + halfWidth;
      }
      const x = centerX - halfWidth;
      const y = centerY - halfHeight;
      return {id:index, model, ...clamp(x, y), angle:Math.random()*60-30};
    });
    nextId.current = count;
    setStickers(generated);
  }, []);
  useEffect(() => {
    const host = document;
    if (!layer.current) return;
    const add = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest('a,button,input,textarea,select,label,[contenteditable],[role="button"]')) return;
      const rect = layer.current!.getBoundingClientRect();
      if(event.clientY < rect.top || event.clientY > rect.bottom || event.clientX < rect.left || event.clientX > rect.right) return;
      const size = stickerSize(rect.width);
      const pos = clamp((event.clientX - rect.left - size / 2) / rect.width * 100, (event.clientY - rect.top - size / 2) / rect.height * 100);
      setStickers(items => [...items, {id:nextId.current++, model:Math.floor(Math.random()*models.length), ...pos, angle:Math.random()*40-20}]);
    };
    let down: {x:number;y:number;time:number} | null = null;
    let lastTap: {x:number;y:number;time:number} | null = null;
    let lastTouch = 0;
    const start = (event:PointerEvent) => {
      if (event.pointerType === 'mouse') return;
      if (!event.isPrimary) { down=null; lastTap=null; return; }
      down={x:event.clientX,y:event.clientY,time:Date.now()};
    };
    const end = (event:PointerEvent) => {
      if (event.pointerType === 'mouse') return;
      lastTouch=Date.now();
      if (!down || lastTouch-down.time>350 || Math.hypot(event.clientX-down.x,event.clientY-down.y)>12) { down=null; lastTap=null; return; }
      down=null;
      if (lastTap && lastTouch-lastTap.time<320 && Math.hypot(event.clientX-lastTap.x,event.clientY-lastTap.y)<28) {
        add(event);
        lastTap=null;
      } else lastTap={x:event.clientX,y:event.clientY,time:lastTouch};
    };
    const cancel = () => { down=null; lastTap=null; };
    const doubleClick = (event:MouseEvent) => { if (Date.now()-lastTouch>600) add(event); };
    host.addEventListener("dblclick", doubleClick);
    host.addEventListener('pointerdown',start);
    host.addEventListener('pointerup',end);
    host.addEventListener('pointercancel',cancel);
    return () => {
      host.removeEventListener("dblclick", doubleClick);
      host.removeEventListener('pointerdown',start);
      host.removeEventListener('pointerup',end);
      host.removeEventListener('pointercancel',cancel);
    };
  }, []);
  return <div ref={layer} className="hero-sticker-playground">
    {stickers.map(sticker => <button key={sticker.id} type="button" className="hero-play-sticker"
      aria-label={locale === "pt" ? "Trocar adesivo; arraste para mover" : "Change sticker; drag to move"}
      style={{left:`${sticker.x}%`,top:`${sticker.y}%`}}
      onClick={() => {
        if (suppressClick.current) { suppressClick.current = false; return; }
        setStickers(items => items.map(item => item.id === sticker.id ? {...item, model:(item.model+1)%models.length, angle:Math.random()*50-25} : item));
      }}
      onPointerDown={event => {
        if (event.button !== 0 || !event.isPrimary) return;
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
