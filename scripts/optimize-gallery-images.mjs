import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
const root='apps/ufpb/public';
const originals=['assets/aulas/aulas.jpg','assets/aulas/luigi.jpg','assets/objetivos/aula.jpg','campus/aula.jpg','assets/objetivos/festa.jpg','assets/objetivos/selfie.jpeg','assets/objetivos/todos.JPG','assets/palestras/herval.jpg','assets/palestras/itamar.jpg','assets/palestras/jp_honorato.jpg','assets/palestras/lara.jpg','assets/palestras/terron.png','assets/palestras/marcos-andre.png'];
const edits=['aulas-v1','apresentacao-v1','mentoria-v1','festa-v2','selfie-v1','comunidade-v1'].map(n=>`assets/community-edited/${n}.png`).concat(['herval','itamar','jp-honorato','lara','terron','marcos-andre'].map(n=>`assets/palestras/edited/${n}-v1.png`));
await mkdir(`${root}/assets/gallery-web`,{recursive:true});
let before=0,after=0;
for(const file of [...originals,...edits]) {
 const output=`${root}/assets/gallery-web/${file.replaceAll('/','-').replace(/\.[^.]+$/,'.webp')}`;
 await sharp(`${root}/${file}`).rotate().resize({width:1200,withoutEnlargement:true}).webp({quality:84,effort:6}).toFile(output);
 before+=(await stat(`${root}/${file}`)).size;after+=(await stat(output)).size;
}
console.log({beforeMB:before/1e6,afterMB:after/1e6,reduction:1-after/before});
