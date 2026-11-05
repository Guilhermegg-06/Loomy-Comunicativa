# Checkpoint Loomy

- Estado: versão aprovada integrada à `main` e ambiente do repositório preparado para Vercel em 05/11/2026.
- Branch de entrega: `main`. Origem visual preservada em `design/vale-cristal` (`33ac044`).
- Primeiro commit solicitado: `2241cb7`, integração da fundação e das etapas de design à main atualizada, preservando todo o histórico.
- Implementação: paisagem enviada, logo cristal com reflexos e primeiro scroll partindo dos O da marca para a experiência aprovada. A mesma textura cristal agora acompanha os O nas nove etapas, inclusive sem WebGL. Abertura livre de textos e links sobrepostos, com pausa acessível.
- Validações: build, lint e tipos aprovados; 17 testes aprovados em Chromium desktop/mobile e WebKit mobile, com 1 dispensado (fallback compartilhado). Reflexos, origem dos O, wheel, toque, teclado, links, pausa, fallback, vídeo e briefing local verificados. Axe A/AA e WCAG 2.2 AA sem violações nas telas verificadas.
- Produção local isolada na porta 3100, com um worker para testes. Métricas e limites em `docs/VALIDATION.md`; o último Lighthouse é anterior à troca do material dos O.
- Prévias e vídeos: `docs/preview-valley-*`.
- Direção, referência e assets: `docs/abertura-vale.md`, `docs/design-grau.md` e `public/media/README.md`. Sem nova imagem gerada por IA nesta alteração.
- Pendências de produção: otimizar carregamento/preparação do 3D e medir em aparelhos físicos, revisão visual/editorial, cases autorizados, domínio canônico e OG final. `noindex` permanece ativo na revisão.
- Vercel: Node.js 22.x no manifesto/lockfile/.nvmrc e CI; Next.js nativo, `npm ci --include=dev`, `npm run build` e `.vercelignore`. Nenhuma variável obrigatória. Instruções e estado remoto em `docs/DEPLOY_VERCEL.md`.
- Nenhum projeto Vercel foi encontrado para o repositório na conta acessível. Sem projeto remoto criado, vínculo, deploy, mudanças de credenciais ou proteção de branch.
