# Validação: abertura cristal no vale — 05/11/2026

Branch `design/vale-cristal`, base `8c4144d`. Produção local Next.js 16.4.3. História verificada: paisagem enviada e marca cristal inteira → primeiro scroll pelos O da arte → oito etapas aprovadas → vídeo → briefing local → Instagram informado.

Atualização dos O cristal, sobre `fbaee0b`: as letras 3D usam as duas regiões da textura original da marca em todas as etapas. Inspeção visual em desktop e mobile confirmou detalhes do gelo, bordas iridescentes, fundo escuro, cenário claro e aberturas alinhadas às lentes. O fallback CSS também usa a arte cristal. A coreografia, os textos e os destinos da navegação permanecem os aprovados. A suíte completa foi executada após a atualização, com 17 aprovados e 1 dispensado; build, lint e TypeScript aprovados.

| Verificação | Evidência |
| --- | --- |
| Build, lint e tipos | Compilação de produção, ESLint e TypeScript aprovados |
| Chromium desktop/mobile e WebKit mobile | 17 testes aprovados; 1 dispensado por repetir o fallback compartilhado |
| Abertura | Paisagem e logo responsivas, cabeçalho e interface ocultos/inertes; apenas o ícone de pausa permanece visível |
| Reflexo | Capturas do canvas em tempos diferentes confirmam o reflexo em movimento; pausa e movimento reduzido preservados |
| Primeiro scroll | Centros projetados partem das aberturas medidas da logo; crescimento intermediário e mistura da paisagem verificados |
| Continuidade | Mouse, toque e teclado chegam à apresentação dos O e seguem aos serviços; vídeo, contato e links diretos preservados |
| Acessibilidade | Axe WCAG 2.0/2.1 A/AA e 2.2 AA sem violações nas etapas 0, 1, 2, 5, 6, 7 e 8 em Chromium e no contato WebKit |
| Responsividade e fallback | Sem overflow horizontal nos tamanhos testados; sequência funcional sem WebGL e com movimento reduzido |
| Mídia e briefing | Vídeo completo com áudio, fechamento/retorno de foco, rascunho local, clipboard e alternativa manual aprovados |
| Console | Sem erros de página na navegação gravada em desktop e mobile e nos fluxos testados |

A validação corrigiu dois problemas: o recorte da pessoa agora sai antes de a paisagem escurecer, evitando um halo; a região de rolagem entrou na ordem de foco para permitir teclado mesmo com a interface da abertura oculta. A máscara de reflexo CSS e a foto da marca na etapa de processo usam a variante mobile, evitando baixar a textura desktop adicional nesse dispositivo.

Capturas: [abertura desktop](preview-valley-desktop.png), [abertura mobile](preview-valley-mobile.png), [OO desktop](preview-valley-desktop-focus.png) e [OO mobile](preview-valley-mobile-focus.png). Gravações da aplicação real, sem edição para simular transições: [desktop](preview-valley-desktop.webm) e [mobile](preview-valley-mobile.webm).

Os testes usam navegadores locais e emulação mobile, sem aparelhos físicos. Nenhum resultado de CI remota ou deploy é afirmado. Composição, procedência e continuidade em [abertura-vale.md](abertura-vale.md).

## Lighthouse da abertura no vale, antes da troca dos O

Medição mobile simulada do commit `fbaee0b`, anterior à troca do material dos O, no Lighthouse 13.6.0, com o 3D automático ativo: performance **58**, acessibilidade **100**, boas práticas **100**, SEO **60**. FCP **0,9s**, LCP **5,7s**, CLS **0**, TBT **910ms**. Sem erros de console. `noindex` permanece intencional nesta revisão. Não houve nova medição Lighthouse na alteração do material.

A primeira leitura da abertura marcou performance 45, LCP 8,2s e TBT 2.860ms. A auditoria identificou que a máscara CSS baixava a textura desktop além da mobile; o painel de processo também mantinha uma referência à imagem maior. A correção dos dois usos remove essa requisição de cerca de 194KB. Uma conferência de rede na versão final confirmou apenas as variantes mobile e pequena da marca. Variação de laboratório impede atribuir toda a diferença de tempo apenas a essa mudança.

LCP e bloqueio da main thread continuam acima das metas. É necessário otimizar a preparação do 3D e medir em aparelhos físicos antes de considerar desempenho mobile concluído. As capturas e os testes de interação não substituem essa medição; não foi medido INP real. Relatórios locais brutos: `.tools/lighthouse-valley.json` e `.tools/lighthouse-valley-final.json`, ignorados pelo Git.

## Histórico: Loomy em foco — 04/11/2026

Branch `design/grau-loomy`, base `7952d4e`. Produção local Next.js 16.4.3. História verificada: chegada à vitrine → rolagem pelos capítulos → foco projetado nos O → vídeo de apresentação → briefing local → link para o Instagram informado.

| Verificação | Evidência |
| --- | --- |
| Build | Produção compilada, TypeScript aprovado e página pré-renderizada |
| Lint e tipos | `npm run lint` e `npm run typecheck` aprovados |
| Chromium desktop/mobile | 13 testes aprovados e 1 dispensado (fallback compartilhado) |
| WebKit mobile | 2 testes aprovados; capturas mostram WebGL e máscara nítida sobre os mundos desfocados |
| Gesto e sequência | Wheel real e deslize com eventos de toque percorrem uma tela; setas, indicadores, teclado e links diretos confirmados |
| Nitidez | Máscaras projetadas se movem com as aberturas, incluindo o zoom e a cena clara; capturas comparadas à prévia pública |
| Acessibilidade | Axe WCAG 2.0/2.1 A/AA e 2.2 AA sem violações nos capítulos 0, 1, 4, 5, 6 e 7 em Chromium e no contato WebKit |
| Responsividade | Sem overflow horizontal entre 320 e 1440px; layouts de retrato desktop e mobile inspecionados |
| Preferências | Pausa congela o movimento automático e continua permitindo navegação; reduced motion e fallback sem WebGL verificados |
| Vídeo | Arquivo completo 720×1280, duração 20–22s, áudio não silenciado, reprodução, Escape, pausa e retorno de foco aprovados |
| Briefing | Preparação local, permissão de clipboard simulada, alternativa manual e edição preservando o texto; Instagram correto |
| Console | Sem erros de página nos fluxos de navegação testados em Chromium e WebKit |

A inspeção encontrou um atraso de atualização após pausa/resize causado por épocas diferentes entre o ticker e callbacks. O renderer agora usa `performance.now` em todos os caminhos. Links funcionam também durante a carga do módulo. A rodada final completa, com shader analítico e compilação assíncrona, aprovou 15 testes em Chromium e WebKit, com 1 dispensado. Não foram ampliados timeouts para esconder esse erro.

Prévias e gravações da sequência ficam em `docs/preview-focus-*`. Direção, limitações de fidelidade e prompt da foto original estão em [design-grau.md](design-grau.md). O vídeo de navegação usa a aplicação real, sem edição para simular transições. Os testes foram em navegadores locais/emulados, não em aparelhos físicos. A CI foi atualizada para instalar Chromium e WebKit; não há afirmação de execução remota aprovada.

### Lighthouse da experiência Grau (histórico)

Medição mobile simulada com 3D automático ativo: performance **75**, acessibilidade **100**, boas práticas **100**, SEO **63**. FCP e LCP **1,0s**, CLS **0,023**, TBT **1.270ms**. Sem erros de console. O `noindex` explica a limitação intencional de SEO nesta revisão.

A primeira leitura teve TBT de 9.840ms com a geração de ambiente e material físico. O shader analítico reduziu para 2.160ms; sua compilação assíncrona chegou a 1.270ms. A navegação permanece funcional durante a preparação do 3D. LCP e CLS estão dentro das metas locais; o bloqueio de main thread ainda pede otimização e medição em aparelhos físicos. Não foi medido INP real. Os números descrevem laboratório local com CPU mobile simulada, não métricas de usuários.

Relatórios brutos ignorados pelo Git: `.tools/lighthouse-focus.json`, `.tools/lighthouse-focus-final.json` e `.tools/lighthouse-focus-async.json`. Prévias finais: [desktop](preview-focus-desktop.png), [mobile](preview-focus-mobile.png), [vídeo desktop](preview-focus-desktop.webm), [vídeo mobile](preview-focus-mobile.webm).

## Histórico: topo Campo — 04/11/2026

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

### Lighthouse do topo Campo (histórico)

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

### Lighthouse mobile da versão cristal (histórico)

Última medição local: performance **86**, acessibilidade **100**, boas práticas **100**, SEO **63**. FCP **0,9s**, LCP **3,2s**, CLS **0**, TBT **320ms**. Resultados de laboratório, não métricas de campo.

O HTML entrega uma versão responsiva da logo cristal (74KB no mobile), mantendo a textura maior para a cena 3D. O relatório confirmou que WebGL/contornos não foram carregados automaticamente no perfil mobile. A cena fica sob demanda, com imagem de reserva, e os efeitos contínuos têm pausa global. A entrada preserva o conteúdo visível e a fonte é WOFF2 local.

A nota subiu de 83 para 86 após a variante responsiva (LCP de 3,5s para 3,2s). A meta de LCP abaixo de 2,5s ainda precisa ser atingida e medida em preview antes de produção. Não foi medido INP de usuários reais. As notas da versão anterior sem cristal não descrevem esta atualização.

`noindex` está intencionalmente ativo nesta versão de revisão; não considerar SEO pronto para produção. Configurar domínio canônico, imagem OG final e indexação após aprovação.

Capturas desktop/mobile ficam em `test-results/`; uma captura frontal do hero foi retida em [preview-crystal.png](preview-crystal.png). Relatórios brutos locais estão em `.tools/lighthouse-crystal*.json` e não são versionados. As verificações de navegador foram realizadas pela suíte Playwright. Nenhum deploy foi realizado.

## Limites

A arte cristal e o vídeo foram enviados e selecionados pelo usuário. O modelo com profundidade é derivado do alpha do PNG, não um master 3D fornecido. Cases, fotos de equipe e textos comerciais continuam pendentes. A última tentativa de criação de PR/Issue pelo conector GitHub foi recusada (403); o bloqueio anterior de autenticação não foi contornado. Não houve mudança de credenciais ou permissões.

CI está configurada, mas o resultado remoto só poderá ser afirmado após uma execução no GitHub.
