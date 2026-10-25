# Checkpoint Loomy

- Estado: S8, atualização cristal validada; abertura de PR segue pendente da permissão do conector.
- Branch: `feat/loomy-site-foundation`.
- Bootstrap: `63ae179`, publicado na main.
- PR: não criada. Conector retornou 403; descrição pronta em `docs/PR_DRAFT.md`.
- Última implementação: `0c28902`, nova logo cristal no topo/rodapé, hero com volume Three.js rotacionável, vídeo integral e motion ampliado com pausa global.
- Validações: build, lint e tipos aprovados; Playwright 10 aprovados, 2 dispensados (fallback compartilhado e cursor no mobile). Mouse, toque e teclado verificados; Axe A/AA sem violações.
- Lighthouse mobile atual: performance 86, acessibilidade 100, boas práticas 100, SEO 63 (`noindex` ativo); LCP 3,2s, CLS 0, TBT 320ms. WebGL não carregou automaticamente no mobile.
- Prévia: `docs/preview-crystal.png`; decisões e resultados em `docs/VALIDATION.md`.
- Pendências: aprovação visual/editorial, cases/fotos autorizados, meta de LCP inferior a 2,5s e validação em preview antes da produção.
- GitHub: branch publicada e sincronizada. Conector recusou PR/Issue com 403. Alternativa de credencial local foi rejeitada automaticamente e não executada.
- Próximo: habilitar escrita no conector ou abrir manualmente a Draft PR pelo link em `docs/PR_DRAFT.md`; revisar conteúdo/assets e desempenho antes da produção.
- Sem merge, deploy, alterações de credenciais ou proteção de branch aplicada.
