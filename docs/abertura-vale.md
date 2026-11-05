# Abertura cristal no vale

Alteração de 05/11/2026 na branch `design/vale-cristal`, baseada em `8c4144d` de `design/grau-loomy`.

## Pedido e composição

A abertura antecede os oito capítulos aprovados. Usa a paisagem `Trabalho solitário diante do vale.png` enviada pelo proprietário e a arte cristal já usada no projeto, no lugar do nome da referência [Campo](https://profitize.com.br/build/componentes/campo).

A primeira tela mostra a paisagem e a marca inteira em destaque. Menu, títulos, legendas, CTA e indicadores aparecem na etapa seguinte. O controle de pausa permanece como ícone acessível. A pessoa tem um recorte de primeiro plano que posiciona a marca atrás da cabeça, conforme a composição da referência. O recorte desaparece antes de a paisagem escurecer, evitando um halo na transição.

Não há imagem nova gerada por IA nesta alteração. Os materiais fornecidos são compostos pelo site, mantendo os arquivos de origem intactos. A imagem não recebe nome de cidade, cliente ou alegação comercial.

## Continuidade no primeiro scroll

Os centros das aberturas dos dois O foram medidos nos contornos da arte cristal existente: X normalizados 0,3375 e 0,515909; Y médio 0,572404. O tamanho inicial das aberturas também segue a arte. A logo e os O pertencem ao mesmo grupo 3D, com o mesmo referencial de câmera e escala.

Ao rolar, os O crescem a partir dessas posições. As outras letras se afastam com a ampliação e desaparecem gradualmente. As aberturas se expandem para as proporções da experiência aprovada. A paisagem cede ao fundo escuro; os textos entram depois da saída da marca inteira. Não é necessário clicar em botão para iniciar essa passagem.

As etapas existentes permanecem com seus enquadramentos e interações; seus índices recebem apenas o deslocamento da nova abertura. Há nove telas no total. `#inicio` aponta à abertura e `#foco` à apresentação dos OO. Os links de serviços, projetos, processo e contato continuam com os mesmos destinos semânticos.

## Logo e movimento

A face da marca usa a textura cristal fornecida, sem reconstrução ou troca da tipografia. Um shader acrescenta uma faixa de reflexão que percorre somente os pixels da marca. A pausa e o movimento reduzido congelam o reflexo automático. A compilação é assíncrona; a imagem da logo e uma reflexão CSS ficam disponíveis durante a carga e quando WebGL falha.

O desktop e o mobile usam a mesma sequência. O enquadramento responsivo posiciona o nome junto à pessoa e calcula as aberturas usando as dimensões efetivas da tela. A rolagem é nativa e continua funcionando com mouse, toque e teclado. O primeiro painel foi incluído na ordem de foco para permitir sua navegação por teclado mesmo com menu e CTA ocultos.

## Assets

- Origem da paisagem: `C:\Users\anena\Downloads\Trabalho solitário diante do vale.png`, 1448×1086, fornecida pelo usuário.
- `public/media/loomy-valley.webp`: 1448×1086, 205.442 bytes.
- `public/media/loomy-valley-mobile.webp`: 1024×768, 101.906 bytes.
- Conversão WebP e redimensionamento responsivo, sem recorte permanente, regeneração ou texto gravado na imagem.
- Arte da marca: `loomy-crystal.webp` e `loomy-crystal-mobile.webp`, já documentadas em `public/media/README.md`.

As máscaras de primeiro plano e a composição da marca são código CSS/WebGL. As letras O usam a geometria da experiência aprovada e ampliam suas aberturas durante a entrada.

Resultados dos testes, capturas e limites de desempenho: [VALIDATION.md](VALIDATION.md).
