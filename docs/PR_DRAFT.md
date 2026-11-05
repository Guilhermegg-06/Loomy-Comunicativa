# feat: criar vitrine interativa da Loomy

Abrir como **Draft**, de `feat/loomy-site-foundation` para `main`:

https://github.com/Guilhermegg-06/Loomy-Comunicativa/pull/new/feat/loomy-site-foundation

## Resultado

Homepage responsiva em Next.js/TypeScript/Tailwind com a arte cristal enviada pelo proprietário no topo e rodapé. O hero usa Three.js para extrudar o contorno do PNG e permitir rotação por mouse, toque, teclado e botões. A cena carrega sob demanda no mobile, tem fallback sem WebGL e respeita reduced motion. Órbitas, brilhos, faixa tipográfica e serviços ganham movimento com pausa global.

O player foi substituído pelo novo vídeo integral de 20,87s, vertical, com áudio original e legendas incorporadas. Preservadas as seis seções, catálogo preparado para cases reais e contato pelo Instagram informado. Sem clientes, resultados ou contatos inventados.

## Validação

Build, lint e tipos aprovados. Playwright: 10 aprovados e 2 dispensados no mobile. Axe WCAG 2.0/2.1 A/AA sem violações. Rotação real em canvas por mouse/toque/teclado, pausa, fallback, navegação, foco, novo vídeo e overflow de 320 a 1440px verificados. Lighthouse mobile local: performance 86, acessibilidade 100, boas práticas 100, SEO 63; LCP 3,2s, CLS 0, TBT 320ms. CI configurada; execução remota ainda não confirmada. Captura em `docs/preview-crystal.png`.

## Pendências antes de produção

Aprovar composição e textos/serviços; fornecer cases e fotografias autorizadas. O volume 3D é derivado da arte raster fornecida, não um modelo 3D original. Melhorar LCP até a meta de 2,5s e medir em preview. `noindex` permanece ativo até aprovação e definição de domínio/OG. Sem deploy ou merge.

Detalhes em `docs/VALIDATION.md` e `STATUS.md`.
