# feat: criar vitrine interativa da Loomy

Abrir como **Draft**, de `feat/loomy-site-foundation` para `main`:

https://github.com/Guilhermegg-06/Loomy-Comunicativa/pull/new/feat/loomy-site-foundation

## Resultado

Primeira homepage responsiva em Next.js/TypeScript/Tailwind: hero com identidade extraída da referência, manifesto, serviços expansíveis, portfólio preparado para cases reais, sobre e contato pelo Instagram informado. GSAP sob demanda no desktop, CSS no mobile, reduced motion e player acessível. Assets com procedência; sem clientes, resultados ou contatos inventados.

## Validação

Build, lint e tipos aprovados. Playwright: 7 aprovados e 1 dispensado (cursor no mobile). Axe WCAG 2.0/2.1 A/AA sem violações. Navegação, foco, vídeo e overflow de 320 a 1440px verificados. Lighthouse mobile local: performance 71, acessibilidade 100, boas práticas 100, SEO 63; LCP 2,4s, CLS 0, TBT 1.540ms. CI configurada; execução remota ainda não confirmada.

## Pendências antes de produção

Aprovar textos/serviços e direitos dos assets. Fornecer masters das logos, cases e fotografias autorizadas. Reduzir custo restante de hidratação e medir em preview. `noindex` permanece ativo até aprovação e definição de domínio/OG. Sem deploy ou merge.

Detalhes em `docs/VALIDATION.md` e `STATUS.md`.
