# Hero landscape

Local browser time: day 06:00–15:59, sunset 16:00–18:59, night 19:00–05:59. Checked every minute. Preview overrides: `?heroTime=day`, `?heroTime=sunset`, `?heroTime=night`.

Layers: CSS sky and celestial lights, existing transparent pixel clouds, generated transparent terrain, generated transparent foreground. Lighting variants use CSS palettes and filters, rather than three duplicate raster downloads. Scroll displacement is 27% for clouds, 18% for terrain and 6% for foreground. Reduced motion disables both drift and displacement.

Assets generated using the built-in image generation tool, with `public/community/landscape.png` as reference; originals preserved. Saved in `apps/trilha/public/community/hero/terrain.png` and `foreground.png`.

Prompts:
- Extract a parallax landscape layer from the reference. Keep the same detailed pixel art alpine valley, winding cream path, forest, lake, blue distant mountains, identical composition and landscape occupying bottom 40% of a 1536x1024 canvas. Remove all sky and clouds to true transparent alpha above the mountain skyline. Preserve green foreground and blue mountains. No text.
- Create transparent foreground layer from the same reference. Retain only nearest green meadow with white flowers, bushes, foreground rocks and winding cream path in bottom 20 percent. Remove sky, clouds, mountains, lake and distant hills. Natural irregular grassy silhouette rises to 72% at sides and 84% at center. Preserve composition scale and pixel art. True transparency, no text.
