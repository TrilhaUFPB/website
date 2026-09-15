/* eslint-disable @next/next/no-img-element */
import { stickerModels as stickers } from "./stickerModels";

// Seeded placement keeps the composition stable across rendering and navigation.
function createComposition() {
  let seed = 731;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const marks = [];
  let previous = -1;
  for (let batch = 0; batch < 2; batch++) {
    const models = stickers.map((_, index) => index);
    for (let i = models.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [models[i], models[j]] = [models[j], models[i]];
    }
    if (models[0] === previous) [models[0], models[1]] = [models[1], models[0]];
    for (const model of models) {
      marks.push({
        model,
        top: 1 + marks.length * (96 / (stickers.length * 2)) + random() * 1.2,
        left: 8 + random() * 84,
        rotation: -28 + random() * 56,
        size: 105 + Math.round(random() * 65),
      });
      previous = model;
    }
  }
  return marks;
}
const composition = createComposition();

export default function CampusStickers() {
  return <div className="campus-stickers" aria-hidden="true">
    {composition.map(({model, top, left, rotation, size}, index) => (
      <img key={index} src={`/campus/stickers/${stickers[model]}.png`} alt=""
        style={{top: `${top}%`, left: `${left}%`, width: `min(${size}px, 22vw)`, transform: `translateX(-50%) rotate(${rotation}deg)`}}
      />
    ))}
  </div>;
}
