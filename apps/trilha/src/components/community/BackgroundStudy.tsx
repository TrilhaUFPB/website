"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const stickers = ["selo-path-seekers-azul", "flamula-take-a-trilha", "losango-trilha", "oval-trilha"];
export default function BackgroundStudy() {
  const variant: number = 2;
  const [targets, setTargets] = useState<Element[]>([]);

  useEffect(() => {
    setTargets(Array.from(document.querySelectorAll(".trilha-site .design > main")));
  }, []);
  return <>
    {variant > 0 && targets.map((target, index) => createPortal(
      <div className={`ambient-details ambient-${variant}`} aria-hidden="true">
        {(variant === 2 ? [2, 7, 12, 18, 23, 28, 34, 39, 44, 50, 55, 60, 66, 71, 76, 82, 87, 93, 97] : [4, 17, 29, 41, 54, 67, 79, 92]).map((top, mark) => <div key={mark} className={`ambient-mark ambient-mark-${mark % 2}`} style={{ top: `${top}%`, transform: `rotate(${[-17, 12, -9, 21, -14, 8, -22, 15][mark % 8]}deg)` }}>
          {variant === 1 ? /* eslint-disable-next-line @next/next/no-img-element */
            <img src={`/community/stickers/${stickers[mark % stickers.length]}.png`} alt="" />
            : variant === 2 ? <img src={mark % 2 ? "/community/cloud-pixel-2.png" : "/community/cloud-pixel.png"} alt="" />
            : <svg viewBox="0 0 180 180" fill="none" stroke="currentColor" strokeWidth="2"><path d={mark % 2 ? "M20 135 65 50 99 103 123 65 163 135Z M65 50 71 96 99 103" : "M90 12 103 69 162 90 103 104 90 165 76 104 15 90 76 69Z"}/><circle cx="146" cy="27" r="7"/></svg>}
        </div>)}
      </div>, target, String(index)))}
  </>;
}
