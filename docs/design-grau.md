# Loomy em foco

Redesign de 04/11/2026 em `design/grau-loomy`, baseado em `7952d4e` da branch `design/topo-campo`. O pedido é replicar com máxima fidelidade a estrutura e as interações observáveis de [Grau](https://profitize.com.br/build/landing-pages/grau), usando os dois O da Loomy no lugar dos óculos.

## Direção e evidência

Leitura: vitrine de agência criativa como uma experiência editorial de tela inteira. Dois O com volume conduzem o foco, a demonstração visual e a passagem entre capítulos. Variância 7, movimento 8, densidade 3. CSS nativo, GSAP e Three.js já presentes no projeto; nenhuma biblioteca nova.

A evidência visual é a prévia pública oficial de 21,73s, 960×552, e seu poster, obtidos da página pública. O acesso ao navegador conectado não permitiu testar os controles da Grau ao vivo. Nenhum bundle pago, prompt privado ou asset do download comercial foi acessado. Código e geometria desta implementação são próprios.

| Estrutura observada | Adaptação Loomy |
| --- | --- |
| Marca e três links discretos no topo | Arte cristal enviada e navegação Produção / Design / Marketing |
| Produto 3D sobre texto grande desfocado | Dois O extrudados e cromados sobre “Ideias em foco” |
| Texto nítido dentro de cada lente | Máscaras com polígonos projetados das aberturas reais dos O |
| Armações sequenciais, setas e indicadores | Três serviços com poses e materiais conectados, setas e indicadores clicáveis |
| Aproximação de uma lente sobre fotografia | Zoom para dentro do O sobre o vídeo/foto de apresentação do proprietário |
| Cena de praia clara vista pelas lentes | Fotografia original de litoral e mensagem sobre novas conexões |
| Processo em fundo claro, fotos e produto menor | Ouvir / Criar / Conectar, usando materiais da Loomy |
| Objeto sobe e conduz a um painel de agendamento | O's sobem para o topo e abrem o painel de preparação de conversa |

A mudança entre fundos claros e escuros, os textos muito grandes, os indicadores e a composição assimétrica são intencionais para seguir esta referência específica. O campo da versão anterior deixa de ser o hero. Os assets anteriores permanecem no repositório/histórico.

## Rolagem, nitidez e mobile

O palco ocupa o viewport e continua o mesmo durante os oito capítulos. A rolagem pertence a um contêiner nativo com scroll snap obrigatório e parada por tela. O GSAP suaviza a progressão e interpola posição, tamanho, inclinação e acabamento dos O. Links, setas, indicadores e teclado usam os mesmos destinos da rolagem. O navegador não recebe um loop de scroll em estado React.

O mundo visual tem duas cópias alinhadas: uma desfocada e outra nítida, recortada somente nas aberturas. O renderer projeta as bordas internas da geometria em coordenadas de tela. O recorte acompanha a perspectiva, inclusive no zoom. O texto principal tem equivalentes semânticos acessíveis; o mundo duplicado é decorativo.

O acabamento cromado usa um shader analítico orientado pelas normais e pela câmera, com reflexos, bordas e brilho. A versão final não gera um mapa de ambiente no carregamento: esse custo foi identificado na auditoria mobile e removido. O shader é pré-compilado com `compileAsync`; as letras CSS e a navegação ficam disponíveis enquanto a GPU o prepara. A geometria, a perspectiva e a máscara permanecem em 3D.

Desktop e mobile carregam automaticamente o mesmo renderer e passam pelos mesmos capítulos. As poses se adaptam à proporção do viewport. Não há banner estático substituindo a experiência mobile. WebGL indisponível mantém os O em CSS e o efeito de foco. Pausa global e movimento reduzido interrompem a oscilação automática; a navegação continua disponível.

O vídeo original continua completo, vertical e com áudio, em diálogo com Escape, controles nativos e retorno de foco. O painel final prepara um briefing local, tenta copiá-lo e oferece o Instagram informado. Se a área de transferência falhar, o texto pode ser copiado manualmente. Não simula envio nem cria backend, agendamento, WhatsApp ou resultados comerciais.

## Assets e geração

- Arte cristal e filme: materiais enviados pelo proprietário, mantidos conforme `public/media/README.md`.
- O's: geometria própria de duas letras com aberturas, bevel e material metálico. Não é um master 3D extraído da arte cristal.
- `public/media/loomy-coast.webp`: 1536×1024, 107.422 bytes.
- `public/media/loomy-coast-mobile.webp`: 960×640, 38.150 bytes.
- Fotografia de litoral conceitual gerada com ImageGen integrado, sem marca ou texto embutido. Não documenta uma produção ou cliente real da Loomy.
- Original gerado: `C:\Users\anena\.codex\generated_images\01a1712d-ef5e-7830-a419-76b3890024ff\exec-99ca0027-18c1-436f-abcf-98e8d933907e.png`.

Prompt final, modo integrado, fundo opaco:

```text
Photorealistic editorial photograph, landscape 3:2. A tranquil tropical shoreline in Alagoas, Brazil, photographed in soft bright morning light. Clear pale turquoise sea across the middle, distant straight horizon near 42 percent image height, very pale blue sky, white sand in the lower half, a few natural low beach grasses at the lower left. No people, buildings, umbrellas or props. Clean balanced composition, realistically detailed water with restrained small reflections. Calm premium photographic art direction, bright almost white palette and subtle aqua. The image will be used as a fullscreen background behind a pair of interactive brand letter O lenses in a creative agency website. Leave the central area open and uncluttered. Image only, no typography, no logo, no interface, no watermark.
```

A fidelidade se refere à estrutura e à sequência demonstradas na prévia. Produtos, textos e o agendamento de uma ótica foram adaptados à agência e ao contato existente. Não houve reprodução do formulário comercial da ótica nem uso de seus modelos 3D.
