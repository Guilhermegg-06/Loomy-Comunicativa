# Validação do topo Campo — 04/11/2026

Branch `design/topo-campo`, baseada em `fc0041e` da fundação. Produção local Next.js 16.4.3, Chromium Playwright.

| Verificação | Resultado observado |
| --- | --- |
| Build | `npm run build` aprovado, com TypeScript e páginas estáticas |
| Lint e tipos | Lint sem warnings; `npm run typecheck` aprovado |
| Fluxos | 10 Playwright aprovados; 2 dispensados no mobile (cursor desktop e fallback compartilhado) |
| Acessibilidade | Axe WCAG 2.0/2.1 A e AA e 2.2 AA sem violações detectadas em desktop e mobile |
| Responsividade | Sem overflow horizontal em 320, 390, 767, 768, 1024 e 1440px |
| Marca 3D | Botão, teclado, arraste por mouse e toque, restauração, pausa e reduced motion verificados |
| Sem WebGL | Nome cromado em CSS preservado e H1 acessível |
| Vídeo | Arquivo integral existente, 720×1280, 20,87s, reprodução e áudio não silenciado confirmados |
| Navegação | Links, menu mobile, Escape, foco e serviços expansíveis verificados |
| Console | Sem erros no fluxo principal testado |

O servidor de testes passou para a porta 3100 e não reutiliza desenvolvimento. Um worker evita concorrência de renderização WebGL por software. A comparação de retorno à posição estável aguarda a conclusão da interpolação, com limite de 12s. Os contornos tipográficos foram preservados após a revisão visual; o relevo usa bevel para os reflexos nas bordas.

Após o acabamento, os dois fluxos 3D passaram novamente. O Lighthouse apontou áreas de toque pequenas; os links da cena receberam altura mínima de 24px e a suíte Axe passou a incluir WCAG 2.2 AA. Os dois testes de acessibilidade/responsividade passaram novamente após essa correção. A névoa usa gradiente sem blur no mobile.

Prévias: [desktop](preview-campo.png) e [celular](preview-campo-mobile.png). [Referência, decisões e prompt da cena original](design-campo.md). Não houve deploy; os resultados locais não afirmam aprovação de CI remota. O `noindex` continua intencional na versão de revisão.

## Lighthouse do topo Campo

Última medição mobile simulada: performance **76**, acessibilidade **100**, boas práticas **100**, SEO **63**. FCP **1,2s**, LCP **3,5s**, CLS **0**, TBT **550ms**. Sem erros de console. O relatório confirmou que os contornos/WebGL não carregaram automaticamente no mobile e que a imagem responsiva da cena transferiu cerca de 29KB.

A auditoria inicial indicou acessibilidade 96 por áreas de toque pequenas. A correção elevou esse resultado a 100. A retirada do blur da névoa no mobile preserva a atmosfera, mas não alterou a nota de desempenho desta medição. LCP e TBT continuam acima das metas; otimizar custo de layout e execução de scripts e medir em preview antes de produção. Não foi medido INP de usuários reais. As notas são de laboratório local e não garantem desempenho em dispositivos reais.

Relatórios brutos: `.tools/lighthouse-campo.json` e `.tools/lighthouse-campo-final.json` (ignorados pelo Git). As notas da versão cristal abaixo são históricas e não descrevem este topo.

## Histórico: versão cristal — 25/10/2026

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
