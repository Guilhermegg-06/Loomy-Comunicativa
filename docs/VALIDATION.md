# Validação da versão cristal

Executada localmente em 25/10/2026, Node 22.20.0, Next.js 16.4.3, Chromium Playwright e build de produção.

| Verificação | Resultado observado |
| --- | --- |
| Instalação | `npm install` concluído; lockfile versionado |
| Build | `npm run build` aprovado; homepage e 404 pré-renderizadas |
| Lint | `npm run lint` aprovado sem warnings |
| Tipos | TypeScript estrito aprovado no build e no comando independente |
| Fluxos | 10 testes Playwright aprovados; 2 dispensados no mobile (fallback compartilhado e cursor desktop) |
| Acessibilidade | Axe WCAG 2.0 A/AA e 2.1 A/AA sem violações nas páginas testadas |
| Responsividade | Sem overflow horizontal em 320, 390, 767, 768, 1024 e 1440px |
| Teclado e mídia | Menu/Escape/foco, serviços, play, fechamento/pausa e retorno de foco verificados |
| Motion e 3D | Rotação real por botão, teclado e arraste mouse/toque; foco da ativação manual, pausa global, reduced motion e fallback sem WebGL verificados |
| Novo vídeo | Reprodução com 720×1280, duração integral entre 20 e 22s, som não silenciado e arquivo novo confirmados |
| Console | Sem erros nos fluxos e no Lighthouse final |

## Lighthouse mobile simulado

Última medição local: performance **86**, acessibilidade **100**, boas práticas **100**, SEO **63**. FCP **0,9s**, LCP **3,2s**, CLS **0**, TBT **320ms**. Resultados de laboratório, não métricas de campo.

O HTML entrega uma versão responsiva da logo cristal (74KB no mobile), mantendo a textura maior para a cena 3D. O relatório confirmou que WebGL/contornos não foram carregados automaticamente no perfil mobile. A cena fica sob demanda, com imagem de reserva, e os efeitos contínuos têm pausa global. A entrada preserva o conteúdo visível e a fonte é WOFF2 local.

A nota subiu de 83 para 86 após a variante responsiva (LCP de 3,5s para 3,2s). A meta de LCP abaixo de 2,5s ainda precisa ser atingida e medida em preview antes de produção. Não foi medido INP de usuários reais. As notas da versão anterior sem cristal não descrevem esta atualização.

`noindex` está intencionalmente ativo nesta versão de revisão; não considerar SEO pronto para produção. Configurar domínio canônico, imagem OG final e indexação após aprovação.

Capturas desktop/mobile ficam em `test-results/`; uma captura frontal do hero foi retida em [preview-crystal.png](preview-crystal.png). Relatórios brutos locais estão em `.tools/lighthouse-crystal*.json` e não são versionados. As verificações de navegador foram realizadas pela suíte Playwright. Nenhum deploy foi realizado.

## Limites

A arte cristal e o vídeo foram enviados e selecionados pelo usuário. O modelo com profundidade é derivado do alpha do PNG, não um master 3D fornecido. Cases, fotos de equipe e textos comerciais continuam pendentes. A última tentativa de criação de PR/Issue pelo conector GitHub foi recusada (403); o bloqueio anterior de autenticação não foi contornado. Não houve mudança de credenciais ou permissões.

CI está configurada, mas o resultado remoto só poderá ser afirmado após uma execução no GitHub.
