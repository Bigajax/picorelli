/**
 * As portas da logo. "Roupas" junta duas categorias do catálogo (as
 * camisetas em pack e as camisas de futebol), então existe como um
 * grupo por cima das categorias: /catalogo/roupas mostra as duas.
 */
export const GRUPOS: Record<string, { nome: string; categorias: string[] }> = {
  roupas: { nome: "Roupas", categorias: ["camisetas", "camisas-de-futebol"] },
};

export function categoriasDoGrupo(slug: string): string[] | null {
  return GRUPOS[slug]?.categorias ?? null;
}
