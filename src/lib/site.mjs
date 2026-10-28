// Prefixes internal paths with the base path (/repositorio on GitHub Pages, empty on the final domain)
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path) => (/^(https?:|mailto:|tel:|#)/.test(path) ? path : BASE + path);
