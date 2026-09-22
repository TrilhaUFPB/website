"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const community = [
 { src:'/campus/aula.jpg', pt:'Estudantes em uma aula do Trilha', en:'Students in a Trilha class' },
 ...[['2024','2024.1'],['2024-2','2024.2'],['2025','2025.1'],['2025-2','2025.2']].map(([file, period]) => ({
  src:`/assets/turmas/trilha${file}.${file === '2025-2' ? 'jpeg' : 'jpg'}`,
  pt:`Turma ${period} do Trilha reunida`, en:`Trilha ${period} cohort together`,
 })),
];
const projects = ['praxis','pixelmind','clariar','juca'].map(name => ({
 src:`/assets/projects/${name}.png`, pt:`Equipe do projeto ${name} no Trilha`, en:`The ${name} project team at Trilha`,
}));
export default function CampusPhotoStory() {
 const { locale } = useTranslation();
 const [photos, setPhotos] = useState([community[0], projects[0], community[4]]);
 useEffect(() => {
  const pool = [...community];
  const take = () => pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
  setPhotos([take(), projects[Math.floor(Math.random() * projects.length)], take()]);
 }, []);
 return <div className="campus-photo-story">
  {photos.map((photo, index) => <figure key={index} className={`campus-photo-print ${['campus-photo-class','campus-photo-project','campus-photo-community'][index]}`}>
   <img draggable={false} src={photo.src} alt={locale === 'pt' ? photo.pt : photo.en} loading="lazy" />
  </figure>)}
 </div>;
}
