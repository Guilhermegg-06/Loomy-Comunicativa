# Checkpoint Loomy

- Estado: experiência Loomy em foco implementada e validada em 04/11/2026.
- Branch de design: `design/grau-loomy`.
- Base: `7952d4e` de `design/topo-campo`, que depende da fundação. A main ainda contém o bootstrap; respeitar esse encadeamento na integração.
- Implementação: dois O em 3D como lentes, foco seletivo real, oito capítulos de tela inteira, zoom, transições de cenário e contato. Mesma cena automática em mobile e desktop; vídeo completo preservado.
- Validações: build, lint e tipos aprovados; Chromium 13 aprovados e 1 dispensado, WebKit mobile 2 aprovados. Wheel e toque real, teclado, links, pausa, fallback, vídeo e briefing local verificados. Axe A/AA e WCAG 2.2 AA sem violações nas telas verificadas.
- Produção local isolada na porta 3100, com um worker para testes. Lighthouse mobile: performance 75, acessibilidade 100, boas práticas 100, SEO 63. LCP 1s, CLS 0,023, TBT 1.270ms. Métricas e limites em `docs/VALIDATION.md`.
- Prévias e vídeos: `docs/preview-focus-*`.
- Direção, referência, assets e prompt: `docs/design-grau.md` e `public/media/README.md`.
- Pendências de produção: melhorar TBT e medir em aparelhos físicos, aprovação visual/editorial, cases autorizados, domínio canônico e OG final. `noindex` permanece ativo na revisão.
- PR de fundação não criada anteriormente por 403 do conector; seu rascunho permanece em `docs/PR_DRAFT.md`. Não foi tentado contornar a autenticação.
- Sem merge, deploy, alterações de credenciais ou proteção de branch aplicada.
