# Preparação para Vercel

Preparação de 05/11/2026, após a integração da versão aprovada na `main` pelo commit `2241cb7`.

## Configuração do projeto

| Campo | Valor |
| --- | --- |
| Repositório | `Guilhermegg-06/Loomy-Comunicativa` |
| Branch de produção | `main` |
| Root Directory | Raiz do repositório (`.`) |
| Framework | Next.js |
| Node.js | `22.x`, conforme `package.json` e `.nvmrc` |
| Install Command | `npm ci --include=dev` |
| Build Command | `npm run build` |
| Output Directory | Padrão do Next.js, sem override |
| Variáveis obrigatórias | Nenhuma |

`vercel.json` registra o framework e os comandos de instalação e build. Não há exportação estática, rewrite de SPA ou comando de servidor persistente: o adaptador nativo do Next.js prepara a saída para a plataforma. As versões das dependências permanecem no lockfile, sem atualização de framework nesta preparação.

A `.vercelignore` exclui documentação, capturas, gravações de revisão, testes e arquivos locais do pacote enviado. Os assets usados pelo site continuam em `public/`. Arquivos `.env` e o vínculo local `.vercel/` não são versionados nem necessários para a aplicação atual.

## Publicar quando solicitado

No painel da Vercel, importar o repositório acima e confirmar a raiz, o framework e a branch `main`. Os comandos vêm de `vercel.json`; o runtime vem de `package.json`. O projeto usa fontes e mídia locais e não depende de banco, token ou serviço externo para renderizar.

Depois de importar o repositório, a integração Git da Vercel pode publicar automaticamente os próximos pushes da branch de produção. Branches de trabalho geram previews conforme as configurações do projeto.

Para usar a CLI, autenticar deliberadamente, vincular a equipe/projeto corretos e confirmar o destino com `vercel project inspect --non-interactive` antes de um deploy. Não colocar tokens em arquivos versionados ou argumentos de comandos. O deploy não faz parte desta preparação.

## Validação e estado

A preparação deve passar por instalação limpa com o lockfile, lint, tipos, build de produção e suíte de navegação. Os resultados efetivamente executados estão em [VALIDATION.md](VALIDATION.md).

A consulta ao conector da Vercel não encontrou projeto associado a este repositório nem equipes na conta acessível. Não foi criado ou vinculado projeto remoto, alterado domínio, configurado segredo ou executado deploy. O ambiente do repositório está preparado para essa próxima etapa.

O `noindex` continua ativo na revisão. A publicação definitiva deve considerar o domínio canônico, a imagem OG final e os limites de desempenho mobile já registrados; esta preparação não altera o conteúdo ou as animações aprovadas.

## Referências verificadas

- [Configuração do projeto](https://vercel.com/docs/project-configuration).
- [Versões e seleção do Node.js](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
- [Arquivos excluídos com .vercelignore](https://vercel.com/docs/deployments/vercel-ignore).
- [Build de Next.js na Vercel](https://vercel.com/docs/frameworks/nextjs).
