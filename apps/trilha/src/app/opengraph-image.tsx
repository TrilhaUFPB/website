import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const alt = 'Trilha — Seu primeiro passo. Com gente do lado. De estudantes para estudantes.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const assets = path.join(process.cwd(), 'public/community');
  const [landscape, logo, font] = await Promise.all([
    readFile(path.join(assets, 'landscape.png')),
    readFile(path.join(assets, 'montanha-oficial.svg')),
    readFile(path.join(assets, 'fonts/Poppins-SemiBold.ttf')),
  ]);
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', background: '#FDF4E5', fontFamily: 'Poppins', color: '#000928' }}>
      <img src={`data:image/png;base64,${landscape.toString('base64')}`} alt="" width={1200} height={630} style={{ position: 'absolute', inset: 0, objectFit: 'cover', objectPosition: 'center bottom' }} />
      <div style={{ display: 'flex', position: 'absolute', top: 34, left: 48, right: 48, alignItems: 'center', justifyContent: 'space-between' }}>
        <img src={`data:image/svg+xml;base64,${logo.toString('base64')}`} alt="" width={68} height={52} />
        <span style={{ fontSize: 18 }}>otrilha.com</span>
      </div>
      <div style={{ display: 'flex', position: 'absolute', top: 118, left: 40, right: 40, alignItems: 'center', flexDirection: 'column' }}>
        <span style={{ fontSize: 16, letterSpacing: 2 }}>DE ESTUDANTES PARA ESTUDANTES</span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 22, fontSize: 64, lineHeight: 1.12, letterSpacing: -3 }}>
          <span>Seu primeiro passo.</span>
          <span style={{ color: '#00B85A' }}>Com gente do lado.</span>
        </div>
      </div>
    </div>,
    { ...size, fonts: [{ name: 'Poppins', data: font, weight: 600, style: 'normal' }] },
  );
}
