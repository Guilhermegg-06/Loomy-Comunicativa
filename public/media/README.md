# Assets e procedência

## Abertura no vale — 05/11/2026

- Origem: `Trabalho solitário diante do vale.png`, 1448×1086, enviada pelo usuário.
- `loomy-valley.webp`: 1448×1086, 205.442 bytes; conversão WebP para a abertura.
- `loomy-valley-mobile.webp`: 1024×768, 101.906 bytes; variante responsiva.
- A marca é a mesma arte cristal documentada abaixo, com reflexo animado em shader e fallback CSS. Não há logo ou texto gravado na paisagem.
- Composição, recorte de primeiro plano e extração dos O: [abertura-vale.md](../../docs/abertura-vale.md). Nenhuma nova geração de imagem nesta atualização.

## Loomy em foco — 04/11/2026

- `loomy-coast.webp`: litoral conceitual original gerado com ImageGen integrado, 1536×1024, 107.422 bytes.
- `loomy-coast-mobile.webp`: versão responsiva 960×640, 38.150 bytes.
- A foto serve à demonstração de foco e não representa um cliente ou trabalho real da agência.
- As duas letras O são geometria nativa Three.js, sem textura fotográfica de óculos e sem assets do pacote comercial da referência.
- Materiais enviados pelo proprietário (arte cristal e vídeo completo) continuam sendo usados na nova experiência.
- Referência pública, decisões, prompt e caminho do original: [design-grau.md](../../docs/design-grau.md).

Atualizados em 25/10/2026 a pedido do proprietário.

## Cristal

- Origem: `Logotipo “loomy” em cristal de gelo.png`, RGBA 1448×1086, fornecido pelo usuário.
- `loomy-crystal.webp`: remoção apenas da margem transparente (bounds 28,252 a 1427,834), redimensionamento para 1100×458 e compressão WebP. Sem redesenho ou alteração da marca.
- `loomy-crystal-small.webp`: versão de 280px para navegação e rodapé.
- `loomy-crystal-mobile.webp`: variante responsiva de 700px para a imagem inicial no celular. A cena 3D continua usando a textura de 1100px.
- `loomy-crystal-contours.json`: contorno medido do canal alpha em grade de 440px, simplificado para 953 vértices, um contorno e cinco aberturas. Usado em `ExtrudeGeometry` com bevel para produzir volume.
- `favicon.ico`: os mesmos pixels reduzidos, centralizados sobre o fundo escuro.

A face da cena 3D usa a arte enviada, com volume/laterais gerados por código e iluminação dinâmica. A fotografia do material da face já contém reflexos. O volume é uma interpretação extrudada do contorno 2D, não um arquivo 3D original do proprietário. Um futuro GLB pode substituir a cena sem alterar a navegação ou o player.

## Vídeo

- Origem: MP4 `SaveInta.com_AQNJlwT…ZdBdup8.mp4`, fornecido pelo usuário.
- `loomy-film.mp4`: vídeo integral de 20,87s, 720×1280, H.264 30fps e áudio AAC original. Streams copiados, sem crop, cortes ou remoção do áudio; apenas o índice MP4 foi movido para permitir fast start.
- `loomy-film-poster.webp`: frame em 8s, preservando o enquadramento vertical.
- As legendas visíveis fazem parte do vídeo fornecido. Não foi gerada transcrição adicional.

Os assets anteriores `loomy-reference-*`, `loomy-wordmark-*` e `loomy-motion*` foram preservados como histórico local/versionado e não são mais usados pela homepage. A filmagem de monitor anterior não é exibida.

Não foram adicionados clientes, depoimentos, nomes de equipe ou resultados comerciais.

## Campo — 04/11/2026

- `loomy-field.webp`: cena original gerada com ImageGen integrado, 1536×1024, WebP 73.158 bytes. Campo ao entardecer, pessoa anônima vista de costas e mesa com laptop. É ambientação conceitual, não fotografia documental da Loomy.
- `loomy-field-mobile.webp`: variante 1024×683, WebP 28.618 bytes.
- `loomy-field-contours.json`: cinco letras de “Loomy”, contornos de Space Grotesk Bold em grade de 720×222, usados para geometria extrudada. A fonte e sua licença OFL estão em `public/fonts`.
- A referência visual é o componente [Campo da Profitize](https://profitize.com.br/build/componentes/campo), consultado por sua página pública e pela captura enviada pelo proprietário. As fotografias da referência não são distribuídas neste projeto; código, cena e tipografia foram implementados localmente.
- A marca cromada e seus reflexos são renderizados por código, sem texto ou marca embutidos na fotografia.

Prompt integral, caminho do original gerado e decisões: [design-campo.md](../../docs/design-campo.md).
