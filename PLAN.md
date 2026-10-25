# Primeira entrega

## Objetivo e direção

Vitrine em português com seis momentos: hero, manifesto, serviços, portfólio, sobre e contato. Identidade escura, verde-limão e tipografia sans expressiva. Aesthetic própria, sem simular um design system externo. Dials de design: variância 9, movimento 8, densidade 3. O verde em blocos é um recurso explicitamente solicitado no briefing.

## Decisões

- Next.js App Router e conteúdo em Server Components. TypeScript estrito, Tailwind v4 e tokens CSS centralizados.
- CSS para entrada sem ocultar conteúdo. GSAP/ScrollTrigger sob demanda no desktop para profundidade por scroll e expansão do círculo de contato; mobile usa CSS scroll-driven com fallback estático. Sem Three.js, smooth-scroll artificial ou estado React por frame.
- Folhas client isoladas para navegação mobile, serviços e media player. Dados comerciais separados em `src/content/site.ts`.
- Mídia fornecida preservada. O MP4 é uma filmagem de tela de referência, não um showreel final: não expor preços ou telas alheias como cases Loomy.
- Sem analytics, formulário que simula envio, backend ou dependências comerciais.

## Etapas e aceite

1. Bootstrap na main, branch de trabalho e configuração verificável.
2. Inspecionar assets e documentar origem. Construir homepage com interações reais e estados de mídia.
3. Validar build, lint, tipos, navegação desktop/mobile, teclado, reduced motion, overflow, console e contraste.
4. Configurar CI, revisar diff, commits coerentes e abrir PR sem merge nem produção.

## Dependências

Textos são propostas editoriais para aprovação. Cases, fotos de equipe, masters da logo e contatos adicionais ainda não foram fornecidos. Instagram informado pelo proprietário; não foi possível carregar o perfil pela ferramenta web. Integração GitHub recusou gravação (403); Git autenticado local funciona.
