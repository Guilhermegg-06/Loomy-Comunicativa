# Loomy Comunicativa

Website vitrine da Loomy, agência alagoana de produção, design e marketing.

[Ver prévia do hero com a logo cristal 3D](docs/preview-crystal.png).

## Rodar localmente

Requisitos: Node.js 22+ e npm. Não exige `.env`, banco ou contas externas.

```sh
npm ci
npm run dev
```

Abra http://127.0.0.1:3000. Para reproduzir a versão de produção:

```sh
npm run build
npm start
```

## Verificações

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

O Playwright inicia e encerra o servidor de produção automaticamente, ou reutiliza um servidor local já aberto. Os testes cobrem desktop e celular, navegação, menu/teclado, serviços expansíveis, vídeo completo com áudio, links de contato, overflow, axe WCAG AA, pausa de efeitos e reduced motion. A logo 3D é validada por controles, teclado e arraste, incluindo toque no mobile e fallback sem WebGL. Capturas e traces ficam em `test-results/`.

O workflow `.github/workflows/quality.yml` executa essas verificações em PRs. As execuções remotas precisam ser confirmadas no GitHub; resultado local não significa CI remota aprovada.

## Estrutura

- `src/app`: homepage, layout, metadados, página 404 e tokens/estilos responsivos.
- `src/components`: navegação, identidade, serviços, player, cena cristal 3D e motion isolado.
- `src/content/site.ts`: canais, navegação, serviços e catálogo tipado de projetos.
- `public/media`: logo cristal, contornos medidos, vídeo completo e poster, com procedência documentada.
- `public/fonts`: Space Grotesk auto-hospedada e licença OFL.
- `tests`: verificações de fluxo e acessibilidade em navegador real.
- `PLAN.md` e `STATUS.md`: decisões e checkpoint concisos.

## Conteúdo e identidade

A direção combina fundo escuro, verde-limão e o cristal azulado da arte enviada pelo proprietário. A logo no header, hero e footer usa o novo PNG convertido para WebP, preservando os pixels e a transparência. A cena Three.js extruda o contorno do alpha e aplica a arte original às faces, com laterais e luzes próprias. Trata-se de um volume gerado da imagem, não de um master 3D fornecido.

Arraste a logo ou use as setas do teclado; Home e o botão de restaurar retornam à posição frontal. No desktop, o 3D carrega depois da primeira imagem; no celular e com movimento reduzido, use **Explorar 3D**. A imagem permanece disponível quando WebGL falha. O render limita resolução/fps, para fora da tela ou em aba oculta e libera recursos ao desmontar.

Órbitas, brilhos, uma faixa tipográfica e detalhes dos serviços ampliam a direção de motion. As animações contínuas param fora da tela. **Pausar efeitos** interrompe animações e motion automático; interações manuais continuam disponíveis. `prefers-reduced-motion` é respeitado. GSAP/ScrollTrigger continua sob demanda no desktop; mobile usa CSS scroll-driven quando suportado, com fallback estático. O scroll permanece nativo e gestos verticais no canvas permitem navegar pela página.

O player agora usa o novo vídeo enviado pelo proprietário: 20,87s, 720×1280, completo, sem crop e com áudio original. As legendas são as incorporadas à imagem do próprio vídeo; não foi criada uma nova transcrição. A versão anterior filmada do monitor deixou de ser exibida. Consulte `public/media/README.md`.

Os textos são propostas editoriais. Serviços específicos, textos, direitos dos assets e contato devem ser aprovados pelo proprietário antes de publicação. Não há clientes, depoimentos, resultados ou WhatsApp inventados. Instagram é o canal informado no briefing. Não há formulário que simule envio.

Para inserir cases reais, adicione apenas itens aprovados em `projects` e seus assets locais. Substitua `.about-visual` por fotografia autorizada quando disponível. Os tamanhos e as áreas visuais já estão reservados.

## Deploy e revisão

Projeto compatível com a integração Next.js da Vercel, usando `npm run build`, sem configuração adicional. Nenhum serviço foi criado nem houve publicação. Os metadados da versão de revisão estão com `noindex`: habilite indexação, domínio canônico e OG definitivo somente após aprovação.

Branch de desenvolvimento: `feat/loomy-site-foundation`. A `main` contém somente o bootstrap. Não fazer merge ou publicar em produção sem aprovação do proprietário. Não foi aplicada proteção de branch.
