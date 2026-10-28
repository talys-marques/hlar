# H.Lar Construções

Site institucional estático da [H.Lar Construções](https://www.hlar.com.br), uma empresa do Grupo Herval, feito em [Astro](https://astro.build). Substitui o WordPress: não há banco de dados nem painel, cada alteração no repositório gera o site de novo.

O site original é uma página só, e este também: início, sobre, empreendimentos em destaque e contato (com mapa), mais a página 404. O menu leva às seções da própria página (`/#sobre`, `/#empreendimentos`, `/#contato`). O blog continua sendo o WordPress de [blog.hlar.com.br](https://blog.hlar.com.br/), aberto pelo link "Blog" do menu.

## Rodar no computador

Requer Node.js 22.23 ou mais novo.

```bash
npm install
npm run dev        # site em http://localhost:4321, atualiza ao salvar
npm run build      # gera o site final em dist/
npm run preview    # serve o dist/ para conferir antes de publicar
npm run verificar  # depois do build: procura links internos quebrados
npm run icones     # só se o logo mudar: refaz favicons e og.jpg a partir de src/assets/img/logo.png
```

## Onde fica cada coisa

| Arquivo | O que tem |
|---|---|
| `src/config.mjs` | Redes sociais, link do blog, contato (endereço, responsável, WhatsApp, e-mail, horário e `mapa`, o texto buscado no Google Maps), menu e empreendimentos |
| `src/pages/index.astro` | A página inicial, com os textos de todas as seções |
| `src/assets/img/` | Logo, foto do topo e logos dos empreendimentos. São convertidos para WebP/AVIF no build |
| `public/` | Favicons e `og.jpg` (imagem de compartilhamento em redes sociais), gerados por `npm run icones` |

### Empreendimentos

Cada empreendimento em `EMPREENDIMENTOS` (`src/config.mjs`) tem nome, descrição, imagem (nome do arquivo em `src/assets/img/`, sem extensão), `fundo` (a cor de fundo da imagem, para o cartão não ficar com emenda) e `link`. No WordPress, o "Saiba mais" levava ao Linktree, que só tem links para o blog, o site e o Facebook. Aqui o botão "Quero saber mais" abre o WhatsApp do comercial com uma mensagem citando o empreendimento. Quando cada um tiver página própria, troque o `link` pelo endereço dela.

## Publicação

`.github/workflows/deploy-pages.yml` publica no GitHub Pages a cada push na `main`. Em **Settings > Pages**, escolha **GitHub Actions** como fonte. Sem domínio próprio o site fica em `usuario.github.io/hlar/`; com o domínio `www.hlar.com.br` configurado ali, ele passa a rodar na raiz, sem mudar nada no código.

Para gerar localmente como no GitHub Pages:

```bash
SITE_URL=https://usuario.github.io BASE_PATH=/hlar npm run build
BASE_PATH=/hlar npm run verificar
```

No Git Bash do Windows, coloque `MSYS_NO_PATHCONV=1` antes dos comandos; sem isso ele troca `/hlar` por `C:/Program Files/Git/hlar`.

## O que mudou em relação ao WordPress

- **Logo**: o do WordPress tinha 199 px de largura e ficava borrado em telas de alta densidade. Foi usada a versão maior (390 px, fundo transparente) que está no blog.
- **Foto do topo**: é a mesma do WordPress, que só existe em 1280 × 336 px. Em telas largas ela é ampliada; vale trocar por uma foto maior (1920 px ou mais) em `src/assets/img/hero.jpg`.
- **Botão flutuante do WhatsApp** e **mapa** na seção de contato, que não existiam no original.
- **Post "Hello world!"** (`/2025/05/20/hello-world/`): post padrão do WordPress, não foi trazido.
