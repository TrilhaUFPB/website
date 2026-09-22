# Artes dos palestrantes — Trilha UFPB

Prompts usados para gerar as variações com a ferramenta integrada de geração de imagens (edição com IA). A arte da Lara foi aprovada como referência visual para a série.

## Como reproduzir o estilo

1. Use a foto original como primeira imagem de entrada.
2. Nas outras artes, use `apps/ufpb/public/assets/palestras/edited/lara-v1.png` como segunda imagem: referência de **estilo**, não de pessoa.
3. Preserve rostos, roupas e poses; enquadre apenas os palestrantes indicados. Use formato horizontal 4:3, papel marfim, contorno verde e anotações manuscritas azul-escuras.
4. Inclua somente os nomes e informações confirmados. Confira rostos, ortografia e associação das setas antes de usar o resultado.
5. Salve novas versões sem substituir originais. Os resultados são generativos: o mesmo prompt pode produzir variações.

As fotos originais estão em `apps/ufpb/public/assets/palestras/`; os resultados ficam em `edited/`. A galeria e sua transição são implementadas em `apps/ufpb/src/components/home/SpeakerReveal.tsx`.

## Origem das informações

Os nomes, posições nas fotos e informações profissionais foram fornecidos ou confirmados pelo usuário. Para Rodrigo Terron, foram consultadas a [biografia na NewHack](https://newhack.vc/blog/ia-redesenhando-fundar-startup-2026) e a [equipe da Entrypoint](https://entrypoint.vc/entrypoint-team/) em 19/09/2026. As anotações registram as informações usadas nesta versão, não uma atualização automática de cargos.

## Prompts exatos

### Lara Pontes

- Foto de entrada: `apps/ufpb/public/assets/palestras/lara.jpg`
- Resultado: `apps/ufpb/public/assets/palestras/edited/lara-v1.png`

```text
Edit this actual photo into a polished editorial scrapbook image for the Trilha UFPB student website. Landscape 4:3 format. Main subject is the standing woman wearing burgundy with her arm extended. Preserve her exact face, identity, body, clothes and pose photographically; do not beautify or redraw face. Crop/recompose to emphasize her, omit the seated attendee on left. Keep a faint recognizable classroom backdrop washed into warm ivory paper #fcfaf5. Cutout-style thin irregular green #00c463 outline around the woman, subtle paper edge shadow. Hand-drawn navy ink arrows, small stars and sparse organic doodles lead from her into legible Portuguese handwritten annotations in negative space, never over her face. Exact text only: 'Lara Pontes', 'Doutoranda no MIT', 'Engenharia da Computação · UFPB', 'Tech Fellow · Fundação Estudar'. Large readable annotations, clean restrained editorial composition rather than crowded poster. Retain real photographic colors on subject. No extra people, logos, claims or text. Deliver a single finished 4:3 image.
```

### Herval Freire

- Foto de entrada: `apps/ufpb/public/assets/palestras/herval.jpg`
- Resultado: `apps/ufpb/public/assets/palestras/edited/herval-v1.png`

```text
Edit image 1 (actual speaker photo) into a landscape 4:3 editorial scrapbook artwork matching image 2 (approved Lara design, STYLE ONLY, do not include Lara). Preserve speaker face identity, actual pose, clothing and natural photographic colors exactly. Crop to feature the seated man in black gesturing, remove foreground audience occlusion from composition by framing main speaker. Warm ivory paper classroom backdrop, thin irregular green outline and paper-cut edge around speaker. Navy handwritten labels and sparse hand-drawn arrows/stars, generous negative space, perfectly readable. Exact text: 'Herval Freire', 'TELEPATIA', 'Ex-Meta', 'Ex-Twitter', 'Ex-SoundCloud'. No invented claims, logos or extra people. Same restrained layout and scale as Lara.
```

### Itamar Rocha

- Foto de entrada: `apps/ufpb/public/assets/palestras/itamar.jpg`
- Resultado: `apps/ufpb/public/assets/palestras/edited/itamar-v1.png`

```text
Edit image 1, actual photo, into landscape 4:3 scrapbook artwork matching image 2 STYLE ONLY (do not include Lara). Itamar Rocha is the LEFT man in WHITE CAP and burgundy MIT shirt gesturing. Isolate ONLY him, remove all other attendees, preserve his exact face, identity, cap, clothes and gesture photographically. Crop to waist-up seated speaker with space around head and hands. Ivory paper faint classroom backdrop, thin irregular green cutout outline, navy handwritten arrows, sparse stars and doodles just like approved image 2. Text verbatim: 'Itamar Rocha', 'Mestrado em Harvard', 'Cofundador da Sable', 'Ex-Meta · Ex-Google'. Arrange legibly around subject, never over face. Do not confuse university on original shirt (MIT) with annotation Harvard; preserve actual clothing. No invented claims or logos. Same polished natural-photo handmade editorial series.
```

### João Pedro Vasconcelos e Felipe Honorato

- Foto de entrada: `apps/ufpb/public/assets/palestras/jp_honorato.jpg`
- Resultado: `apps/ufpb/public/assets/palestras/edited/jp-honorato-v1.png`

```text
Edit image 1 actual photo into landscape 4:3 scrapbook artwork matching image 2 STYLE ONLY (do not include Lara). Keep BOTH seated speakers, preserve exactly their photographic faces, identities, clothing, poses. Left dark curly hair smiling man is João Pedro Vasconcelos; right glasses tattooed arm man is Felipe Honorato. Crop away foreground audience fabric, frame both waist up with balanced negative space for clearly separated annotations. Warm ivory paper softened classroom backdrop. Thin irregular green cutout outlines, navy handwritten arrows and sparse doodles like Lara reference. LEFT person annotations exact: 'João Pedro Vasconcelos', 'Ex-Microsoft', 'Doutorado · University of Toronto'. RIGHT person annotations exact: 'Felipe Honorato', 'MOISES.AI'. Make arrows unambiguously point to correct person. No claims about Felipe's job title, no extra text, no logos. Handwritten names at top left and right, accomplishments adjacent to corresponding speaker. Same elegant editorial series, readable lettering and natural photographic faces.
```

### Rodrigo Terron

- Foto de entrada: `apps/ufpb/public/assets/palestras/terron.png`
- Resultado: `apps/ufpb/public/assets/palestras/edited/terron-v1.png`

```text
Edit image 1, speaker photo, into landscape 4:3 scrapbook artwork exactly matching approved image 2 STYLE ONLY (do not include Lara). Main subject is the standing man holding microphone on right: Rodrigo Terron. Preserve exact photographic face, identity, pose, clothes, microphone. Crop/recompose around him, no projected duplicate people. Warm ivory paper softened classroom backdrop, irregular thin green cutout outline, navy handwritten annotations with sparse arrows/stars. Text verbatim: 'Rodrigo Terron', 'Ex-CEO da Rocketseat', 'Cofundador da Shawee', 'Fundador da NewHack'. Space annotations clearly around subject, never over face. No extra claims, logos or people. Natural photo colors, same elegant handmade editorial system as reference.
```

### Marcos Candeia e André Costa

- Foto de entrada: `apps/ufpb/public/assets/palestras/marcos-andre.png`
- Resultado: `apps/ufpb/public/assets/palestras/edited/marcos-andre-v1.png`

```text
Edit image 1. FIRST tightly crop/reframe to isolate the TWO RIGHTMOST seated men only: Marcos Candeia is the bearded man in black shirt with clasped hands, on LEFT of this pair. André Costa is the man in light taupe shirt and glasses on RIGHT. Exclude all other attendees and foreground speaker box. Then turn this cropped pair into landscape 4:3 editorial scrapbook art matching image 2 (approved Lara STYLE ONLY, never include Lara). Preserve both men's actual faces, identities, glasses, facial hair, clothing, gestures and seated poses photographically. Keep Marcos left and André right. Warm ivory paper with faint classroom background, thin irregular green cutout outline, dark navy handwritten labels/arrows/stars. Composition: pair occupy middle/lower area, sufficient blank space for exact text and arrows unambiguously associated to each. Marcos annotations: 'Marcos Candeia', 'Founding Engineer · Sable', 'Ex-VTEX · Ex-Microsoft', 'Ex-CTO · DECO'. André annotations: 'André Costa', 'Sênior na META'. Exact text, no extra claims or logos. Elegant restrained handwriting consistent with Lara, legible at web size; never place text on faces. No other people, no screenshot UI icons.
```

