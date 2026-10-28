// Site-wide content and contact data. Page texts live in the pages themselves.

const WHATSAPP = '5551989200458';

// WhatsApp link, optionally with a message already typed for the visitor
export const whatsapp = (mensagem) => `https://wa.me/${WHATSAPP}${mensagem ? `?text=${encodeURIComponent(mensagem)}` : ''}`;

export const SITE = {
  nome: 'H.Lar Construções',
  titulo: 'H.Lar Construções – Qualidade, detalhe por detalhe',
  descricao:
    'H.Lar Construções, uma empresa do Grupo Herval. Conheça os empreendimentos Esplêndido Residências e Partec Green em Novo Hamburgo (RS) e encontre seu novo lar.',
  idioma: 'pt-BR',
  instagram: 'https://www.instagram.com/hlarconstrucoes/',
  linktree: 'https://linktr.ee/hlar',
  blog: 'https://blog.hlar.com.br/',
};

export const CONTATO = {
  endereco: 'Rua General Osório, 644 – Hamburgo Velho, Novo Hamburgo – RS',
  // Google Maps search for the embedded map and the "Como chegar" link
  mapa: 'Rua General Osório, 644, Hamburgo Velho, Novo Hamburgo - RS',
  responsavel: { cargo: 'Coordenador Comercial', nome: 'Fernando Marques' },
  whatsapp: { texto: '(51) 98920-0458', link: whatsapp() },
  email: 'fernando.marques@hlar.com.br',
  horario: ['Segunda a sexta: 08h às 18h', 'Sábados, domingos e feriados: conforme agendamento'],
};

export const NAVEGACAO = [
  { titulo: 'Início', href: '/' },
  { titulo: 'Sobre', href: '/#sobre' },
  { titulo: 'Empreendimentos', href: '/#empreendimentos' },
  { titulo: 'Contato', href: '/#contato' },
  { titulo: 'Blog', href: SITE.blog, externo: true },
];

// `imagem` is a file name in src/assets/img/; `fundo` matches the image background so the card has no seams.
// `link` is where "Quero saber mais" goes: WhatsApp with the development's name, until each one has its own page.
export const EMPREENDIMENTOS = [
  {
    nome: 'Esplêndido Residências',
    imagem: 'esplendido-residencias',
    fundo: '#373435',
    descricao: 'Localização privilegiada e acabamento premium. Ideal para quem busca sofisticação e conforto.',
    link: whatsapp('Olá! Gostaria de saber mais sobre o Esplêndido Residências.'),
  },
  {
    nome: 'Partec Green',
    imagem: 'partec-green',
    fundo: '#e5eae1',
    descricao: 'Empreendimento sustentável e moderno, com foco em bem-estar e praticidade.',
    link: whatsapp('Olá! Gostaria de saber mais sobre o Partec Green.'),
  },
];
