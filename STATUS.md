# Checkpoint Loomy

- Estado: topo Campo implementado e validado em 04/11/2026.
- Branch de design: `design/topo-campo`.
- Base: `fc0041e` de `feat/loomy-site-foundation`. A main ainda contém somente o bootstrap; considerar a fundação como base de integração desta alteração.
- Implementação: cena original de campo ao entardecer, nome Loomy cromado em 3D, pessoa em primeiro plano, névoa, parallax e navegação na base do hero. Header e footer mantêm a arte cristal; vídeo completo preservado.
- Validações: build, lint e tipos aprovados; Playwright 10 aprovados, 2 dispensados no mobile. Marca por botão, mouse, toque e teclado; pausa global, reduced motion e fallback verificados. Axe A/AA sem violações detectadas.
- Produção local de teste isolada na porta 3100, com um worker para WebGL headless. Lighthouse mobile: performance 76, acessibilidade 100, boas práticas 100, SEO 63; LCP 3,5s, CLS 0, TBT 550ms. Limites e histórico em `docs/VALIDATION.md`.
- Prévias: `docs/preview-campo.png` e `docs/preview-campo-mobile.png`.
- Direção, referência, assets e prompt: `docs/design-campo.md` e `public/media/README.md`.
- Pendências de produção: otimizar LCP/TBT, aprovação visual/editorial, cases e fotografias autorizados, domínio canônico e OG final. `noindex` permanece ativo na revisão.
- PR de fundação não criada anteriormente por 403 do conector; seu rascunho permanece em `docs/PR_DRAFT.md`. Não foi tentado contornar a autenticação.
- Sem merge, deploy, alterações de credenciais ou proteção de branch aplicada.
