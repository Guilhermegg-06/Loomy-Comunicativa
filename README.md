# Loomy Comunicativa

Website vitrine da Loomy, agência alagoana de produção, design e marketing.

## Rodar localmente

Requisitos: Node.js 22+ e npm. Não exige `.env`, banco ou contas externas.

```sh
npm ci
npm run dev
```

Abra http://127.0.0.1:3000. Para reproduzir a versão de produção:

```sh
npm run build
npm start
```

## Verificações

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

O Playwright inicia e encerra o servidor de produção automaticamente, ou reutiliza um servidor local já aberto. Os testes cobrem desktop e celular, navegação, menu/teclado, serviços expansíveis, reprodução e fechamento de vídeo, links de contato, overflow, axe WCAG AA e mudança de preferência de movimento. O teste de cursor é restrito ao desktop. Capturas e traces ficam em `test-results/`.

O workflow `.github/workflows/quality.yml` executa essas verificações em PRs. As execuções remotas precisam ser confirmadas no GitHub; resultado local não significa CI remota aprovada.

## Estrutura

- `src/app`: homepage, layout, metadados, página 404 e tokens/estilos responsivos.
- `src/components`: navegação, identidade, serviços, player e diretor de motion isolado.
- `src/content/site.ts`: canais, navegação, serviços e catálogo tipado de projetos.
- `public/media`: wordmark extraído e recorte da referência com procedência documentada.
- `public/fonts`: Space Grotesk auto-hospedada e licença OFL.
- `tests`: verificações de fluxo e acessibilidade em navegador real.
- `PLAN.md` e `STATUS.md`: decisões e checkpoint concisos.

## Conteúdo e identidade

A direção combina fundo escuro, verde-limão, tipografia sans, órbitas e deslocamento cromático do próprio material fornecido. No desktop, GSAP/ScrollTrigger é carregado sob demanda para leitura progressiva, parallax e o círculo de contato. Mobile usa transformações CSS vinculadas ao scroll quando suportadas, com fallback estático. A entrada usa CSS e não oculta o conteúdo. O scroll permanece nativo. `prefers-reduced-motion` desliga animações e parallax; touch não recebe efeito de cursor.

O vídeo fornecido é uma filmagem de monitor. O site usa apenas um recorte da referência da identidade, identificado como tal; não é um case de cliente. A logo branca foi extraída de um frame, sem redesenho. A imagem circular verde da conversa não veio como arquivo acessível: seu master ainda deve ser adicionado. Consulte `public/media/README.md`.

Os textos são propostas editoriais. Serviços específicos, textos, direitos dos assets e contato devem ser aprovados pelo proprietário antes de publicação. Não há clientes, depoimentos, resultados ou WhatsApp inventados. Instagram é o canal informado no briefing. Não há formulário que simule envio.

Para inserir cases reais, adicione apenas itens aprovados em `projects` e seus assets locais. Substitua `.about-visual` por fotografia autorizada quando disponível. Os tamanhos e as áreas visuais já estão reservados.

## Deploy e revisão

Projeto compatível com a integração Next.js da Vercel, usando `npm run build`, sem configuração adicional. Nenhum serviço foi criado nem houve publicação. Os metadados da versão de revisão estão com `noindex`: habilite indexação, domínio canônico e OG definitivo somente após aprovação.

Branch de desenvolvimento: `feat/loomy-site-foundation`. A `main` contém somente o bootstrap. Não fazer merge ou publicar em produção sem aprovação do proprietário. Não foi aplicada proteção de branch.
