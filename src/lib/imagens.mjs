// Images in src/assets/img/ by file name without extension, for <Image>/<Picture> from astro:assets
const arquivos = import.meta.glob('../assets/img/*.{jpg,jpeg,png}', { eager: true, import: 'default' });

export const imagem = (nome) => {
  const encontrada = Object.entries(arquivos).find(([caminho]) => caminho.replace(/^.*\/|\.\w+$/g, '') === nome);
  if (!encontrada) throw new Error(`Imagem não encontrada em src/assets/img/: ${nome}`);
  return encontrada[1];
};
