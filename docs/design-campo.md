# Topo Loomy — referência Campo

Alteração de 04/11/2026 na branch `design/topo-campo`, criada a partir de `fc0041e` de `feat/loomy-site-foundation`. A main ainda contém o bootstrap; a fundação é a base desta alteração até ser integrada. Não houve merge ou publicação.

## Direção e referência

Leitura: vitrine de agência criativa, com composição fotográfica cinematográfica, nome metálico no horizonte e movimento atmosférico. Variância 7, motion 7, densidade 3. A estrutura solicitada está no [componente Campo](https://profitize.com.br/build/componentes/campo). A captura enviada pelo proprietário esclarece a composição.

A referência foi consultada na página pública e no material visual enviado. O navegador conectado estava indisponível; a página pública foi obtida por HTTP para confirmar as camadas da cena. Não foi acessado o bundle Pro. A implementação não reproduz a interface comercial da biblioteca que aparece ao redor da prévia.

Auditoria do estado anterior: o hero tinha texto editorial e logo cristal lado a lado. A nova composição substitui somente esse bloco por um painel fotográfico, com cantos arredondados, céu rosa/violeta, nome Loomy cromado, pessoa e névoa à frente, assinatura à esquerda e navegação à direita. No celular, as colunas ficam abaixo da assinatura. O header, o restante das seções e o vídeo enviado continuam integrados ao mesmo site.

## Implementação

- `field-hero.tsx` é um Server Component com H1 acessível e links reais para as seções e o Instagram informado.
- A cena fotográfica tem versões de desktop e celular. O enquadramento alinha a pessoa ao horizonte independentemente da proporção do painel.
- A imagem em primeiro plano usa máscara para manter pessoa e campo à frente do nome. A névoa usa animação de transform e opacidade.
- O nome Loomy é uma geometria extrudada de Space Grotesk Bold, com bevel, iluminação de ambiente e material metálico. Não é um master 3D fornecido pelo proprietário. A arte cristal original permanece no header e no footer.
- A marca cromada em CSS aparece antes do WebGL e funciona como fallback. Desktop ativa o 3D após a primeira cena; celular e reduced motion oferecem ativação manual.
- Arraste, botões, setas e Home controlam a rotação. Pausa global, preferência por movimento reduzido, visibilidade da aba e saída da tela controlam o motion e a renderização.
- O Playwright usa a produção na porta 3100, sem reutilizar o dev server, e um worker para isolar a renderização WebGL por software.

## Asset gerado

Modo: ImageGen integrado (`image_gen.imagegen`), geração nova, fundo opaco. A imagem contém somente a paisagem; texto e interface são código do projeto.

Original gerado: `C:\Users\anena\.codex\generated_images\01a1712d-ef5e-7830-a419-76b3890024ff\exec-77ad9b03-b902-4b9d-8edd-8ca74c5a89c5.png`.

Assets entregues: [loomy-field.webp](../public/media/loomy-field.webp), 1536×1024, 73.158 bytes; [loomy-field-mobile.webp](../public/media/loomy-field-mobile.webp), 1024×683, 28.618 bytes. A foto não representa a equipe, sede ou clientes da Loomy. Não foram adicionadas alegações comerciais.

Prompt final usado:

```text
Create a photorealistic cinematic background photograph for a premium creative agency website hero. Landscape wide composition, about 3:2. An immense open meadow at dusk, exactly centered vanishing point, very distant dark blue hills on the horizon at 47 percent of image height. The upper half is a dramatic luminous sunset sky: deep navy-violet upper sky, broad rose-pink and lavender clouds, soft pale peach-orange near the horizon. Very soft low mist above the field at the horizon. A single anonymous person viewed entirely from behind sits at a simple dark wooden desk with an open glowing laptop, on a wooden chair, exactly centered in the lower middle. The person's head begins around 54 percent of image height; chair and desk end around 80 percent. The person and desk together occupy only 12 percent of the image width. The scene has the quiet realism of an editorial photograph, natural wild grasses with fine golden highlights, large dark foreground. Bottom 25 percent is dark subdued meadow, suitable for white website navigation text overlaid later. Upper-middle sky between 25 and 52 percent height should be uncluttered, as a large editable metallic brand word will be overlaid by the application. Keep scenery horizontally balanced and cinematic, no extra props, no buildings. Realistic twilight photography, soft atmospheric depth, restrained highlights, detailed grass, no exaggerated fantasy. ABSOLUTELY NO WORDS, NO LETTERS, NO TYPOGRAPHY, NO LOGOS, NO WATERMARK, no website interface. This is the scene asset only, not a website screenshot.
```

Resultados dos checks e captura final: [VALIDATION.md](VALIDATION.md) e [preview-campo.png](preview-campo.png).
