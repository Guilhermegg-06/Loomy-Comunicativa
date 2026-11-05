# Loomy em foco

Vitrine interativa da Loomy, agência alagoana de produção, design e marketing. Replica a estrutura e a sequência observáveis da referência [Grau](https://profitize.com.br/build/landing-pages/grau), usando os dois O da marca como lentes em uma cena contínua.

A experiência abre com a paisagem enviada pelo proprietário e a logo cristal inteira, com reflexos em movimento e sem textos sobrepostos. No primeiro scroll, os dois O da própria marca crescem e conduzem aos oito capítulos aprovados: apresentação, produção, design, marketing, aproximação do processo criativo, novos horizontes, processo e contato. As letras mantêm a textura cristal da arte em toda a sequência, incluindo o fallback sem WebGL. A rolagem, o toque, as setas, os indicadores e o teclado percorrem o mesmo palco.

[Abertura desktop](docs/preview-valley-desktop.png) · [Abertura mobile](docs/preview-valley-mobile.png) · [Vídeo desktop](docs/preview-valley-desktop.webm) · [Vídeo mobile](docs/preview-valley-mobile.webm).

[Abertura, reflexo e continuidade dos O](docs/abertura-vale.md). [Referência da experiência aprovada](docs/design-grau.md). Resultados reais em [VALIDATION.md](docs/VALIDATION.md).

## Rodar localmente

Node.js 22.x e npm. A versão está em `.nvmrc`, no manifesto e na CI. Sem banco, credenciais ou `.env`.

```sh
npm ci
npm run dev
```

Abra http://127.0.0.1:3000. Para produção local:

```sh
npm run build
npm run start -- --port 3100
```

## Validar

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium webkit
npm test
```

O Playwright inicia sua própria produção na porta 3100, com um worker para isolar WebGL headless. Não reutiliza o dev server. Verifica rolagem por mouse e toque real, navegação, teclado, links diretos, foco seletivo, fallback, pausa, acessibilidade WCAG 2.0/2.1 A/AA e 2.2 AA, overflow, vídeo e briefing local. O workflow Quality executa os checks em PRs; resultado local não afirma CI remota.

## Estrutura e comportamento

- `src/components/focus`: mundos visuais, letras 3D, máscaras projetadas, sequência de rolagem e briefing.
- `src/app/focus-base.css`: base da experiência atual; os estilos da versão anterior não são carregados.
- `src/content/site.ts`: conteúdo comercial e canais fornecidos.
- `src/components/motion-player.tsx`: vídeo enviado pelo proprietário, completo, com áudio original e diálogo acessível.
- `public/media`: arte original, vídeo e fotografia de litoral gerada, com procedência documentada.

Desktop e mobile carregam a mesma cena 3D. A escala e o enquadramento respondem à proporção da tela. A versão CSS mantém os O e as lentes quando WebGL não está disponível. A rolagem é nativa, com scroll snap e progressão suavizada por GSAP. Reduced motion e pausa global mantêm a navegação funcional e interrompem o movimento automático. Não há valores por frame em estado React.

O briefing é preparado no navegador. O botão tenta copiá-lo e oferece o Instagram informado pelo proprietário. Quando a área de transferência não está disponível, o texto continua selecionável. Não há envio simulado nem backend. Nenhum contato, cliente, resultado ou prazo comercial foi inventado.

## Revisão e Git

Versão aprovada integrada à `main` pelo commit `2241cb7`, a partir da `design/vale-cristal` (`33ac044`). A fundação e as etapas de design permanecem no histórico.

O repositório está preparado para deploy na Vercel com Next.js nativo, instalação pelo lockfile e Node.js 22.x. Configuração, importação e estado remoto em [DEPLOY_VERCEL.md](docs/DEPLOY_VERCEL.md). Nenhum deploy foi executado nesta preparação.

`noindex` permanece ativo para revisão. Domínio canônico e OG final dependem da publicação aprovada. A fotografia de litoral é uma ambientação gerada por IA e não representa um cliente ou produção real. Textos comerciais continuam sujeitos à aprovação do proprietário.
