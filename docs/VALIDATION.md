# Validação da primeira versão

Executada localmente em 25/10/2026, Node 22.20.0, Next.js 16.4.3, Chromium Playwright e build de produção.

| Verificação | Resultado observado |
| --- | --- |
| Instalação | `npm install` concluído; lockfile versionado |
| Build | `npm run build` aprovado; homepage e 404 pré-renderizadas |
| Lint | `npm run lint` aprovado sem warnings |
| Tipos | TypeScript estrito aprovado no build e no comando independente |
| Fluxos | 7 testes Playwright aprovados; 1 teste de cursor dispensado no mobile |
| Acessibilidade | Axe WCAG 2.0 A/AA e 2.1 A/AA sem violações nas páginas testadas |
| Responsividade | Sem overflow horizontal em 320, 390, 767, 768, 1024 e 1440px |
| Teclado e mídia | Menu/Escape/foco, serviços, play, fechamento/pausa e retorno de foco verificados |
| Motion | Cursor no desktop e troca para reduced motion verificados |
| Console | Sem erros nos fluxos e no Lighthouse final |

## Lighthouse mobile simulado

Última medição local: performance **71**, acessibilidade **100**, boas práticas **100**, SEO **63**. FCP **1,5s**, LCP **2,4s**, CLS **0**, TBT **1.540ms**. Resultados de laboratório, não métricas de campo.

A inspeção levou a separar GSAP em chunk exclusivo do desktop, preservar entrada sem ocultar conteúdo, entregar wordmarks WebP compactos e trocar a fonte TTF inicialmente recebida por WOFF2 correto. LCP caiu de 4,2s para 2,4s. O TBT variou entre as execuções; ainda há custo de runtime/hidratação a reduzir e validar no ambiente de preview antes da produção. Não foi medido INP de usuários reais.

`noindex` está intencionalmente ativo nesta versão de revisão; não considerar SEO pronto para produção. Configurar domínio canônico, imagem OG final e indexação após aprovação.

Capturas desktop/mobile ficam em `test-results/`. Relatórios brutos locais estão em `.tools/lighthouse*.json` e não são versionados. A prévia integrada não estava disponível; as verificações de navegador foram realizadas pela suíte Playwright. Nenhum deploy foi realizado.

## Limites

Não há masters das logos, cases ou fotos de equipe autorizadas. Identidade provisória extraída da referência, textos e descrições de serviços aguardam aprovação. O conector GitHub recusou criação de arquivo/Issue (403); a tentativa alternativa com credencial local foi rejeitada pela revisão automática e não foi executada. Não houve mudança de credenciais ou permissões.

CI está configurada, mas o resultado remoto só poderá ser afirmado após uma execução no GitHub.
