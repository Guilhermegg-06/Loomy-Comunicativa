# Checkpoint Loomy

- Estado: abertura cristal no vale implementada e validada em 05/11/2026.
- Branch de design: `design/vale-cristal`.
- Base: `8c4144d` de `design/grau-loomy`, que encadeia topo Campo e fundação. A main ainda contém o bootstrap; respeitar esse encadeamento na integração.
- Implementação: paisagem enviada, logo cristal com reflexos e primeiro scroll partindo dos O da marca para a experiência aprovada. Nove capítulos no total; oito etapas anteriores preservadas. Abertura livre de textos e links sobrepostos, com pausa acessível.
- Validações: build, lint e tipos aprovados; 17 testes aprovados em Chromium desktop/mobile e WebKit mobile, com 1 dispensado (fallback compartilhado). Reflexos, origem dos O, wheel, toque, teclado, links, pausa, fallback, vídeo e briefing local verificados. Axe A/AA e WCAG 2.2 AA sem violações nas telas verificadas.
- Produção local isolada na porta 3100, com um worker para testes. Métricas atuais e limites em `docs/VALIDATION.md`; a medição anterior não descreve a nova abertura.
- Prévias e vídeos: `docs/preview-valley-*`.
- Direção, referência e assets: `docs/abertura-vale.md`, `docs/design-grau.md` e `public/media/README.md`. Sem nova imagem gerada por IA nesta alteração.
- Pendências de produção: otimizar carregamento/preparação do 3D e medir em aparelhos físicos, revisão visual/editorial, cases autorizados, domínio canônico e OG final. `noindex` permanece ativo na revisão.
- PR de fundação não criada anteriormente por 403 do conector; seu rascunho permanece em `docs/PR_DRAFT.md`. Não foi tentado contornar a autenticação.
- Sem merge, deploy, alterações de credenciais ou proteção de branch aplicada.
