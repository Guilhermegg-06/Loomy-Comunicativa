# Primeira entrega

## Objetivo e direção

Vitrine em português com seis momentos: hero, manifesto, serviços, portfólio, sobre e contato. Identidade escura, verde-limão, cristal azulado da logo e tipografia sans expressiva. Aesthetic própria, sem simular um design system externo. Dials de design: variância 9, movimento 9 (ampliado a pedido do usuário), densidade 3.

## Decisões

- Next.js App Router e conteúdo em Server Components. TypeScript estrito, Tailwind v4 e tokens CSS centralizados.
- CSS para entrada sem ocultar conteúdo. GSAP/ScrollTrigger sob demanda no desktop; mobile usa CSS scroll-driven com fallback estático. Sem smooth-scroll artificial ou estado React por frame.
- Three.js justificado pelo pedido de uma logo 3D rotacionável: contorno do PNG extrudado e arte original nas faces. Carga automática posterior à imagem no desktop e manual no mobile/reduced motion. Limites de DPR e 45/30fps; pausa fora da tela e em aba oculta.
- Movimento contínuo em órbitas, brilhos, uma faixa tipográfica e serviços, com pausa global acessível e suporte a reduced motion.
- Folhas client isoladas para navegação mobile, serviços e media player. Dados comerciais separados em `src/content/site.ts`.
- Mídia atual: PNG cristal fornecido pelo usuário e novo vídeo completo de 20,87s, vertical, com áudio e legendas incorporadas. A filmagem de monitor anterior saiu da página.
- Sem analytics, formulário que simula envio, backend ou dependências comerciais.

## Etapas e aceite

1. Bootstrap na main, branch de trabalho e configuração verificável.
2. Inspecionar assets e documentar origem. Construir homepage com interações reais e estados de mídia.
3. Validar build, lint, tipos, navegação desktop/mobile, teclado, reduced motion, overflow, console e contraste.
4. Configurar CI, revisar diff, commits coerentes e abrir PR sem merge nem produção.

## Dependências

Textos são propostas editoriais para aprovação. Cases, fotos de equipe e contatos adicionais ainda não foram fornecidos. Um modelo 3D original pode substituir futuramente a extrusão derivada do PNG. Instagram informado pelo proprietário. A última tentativa de escrita pelo conector GitHub retornou 403; Git autenticado local funciona.
