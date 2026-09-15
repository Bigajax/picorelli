import type { Produto } from "./tipos";

/**
 * O menu das portas, montado do catálogo: cada porta do cabeçalho abre
 * uma aba ao passar o mouse, e o que está na aba vem das peças (as
 * marcas de cada categoria, contadas). Assim a aba nunca promete o que
 * a vitrine não tem.
 */
export type ItemMenu = {
  nome: string;
  href: string;
  icone?: "novidade" | "camiseta" | "camisa" | "tenis" | "perfume" | "corrente" | "etiqueta";
  nota?: string;
  externa?: boolean;
};

export type Aba = {
  chave: string;
  nome: string;
  href: string;
  icone: "novidade" | "camiseta" | "tenis" | "perfume" | "corrente" | "marca";
  externa?: boolean;
  titulo?: string;
  itens: ItemMenu[];
  colunas: 1 | 2 | 3 | 4;
};

function marcasDe(produtos: Produto[], categoria: string, limite = 8) {
  const contagem = new Map<string, number>();
  for (const p of produtos) {
    if (p.categoria_slug !== categoria || !p.marca) continue;
    contagem.set(p.marca, (contagem.get(p.marca) ?? 0) + 1);
  }
  return [...contagem.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR"))
    .slice(0, limite)
    .map(([nome, total]) => ({ nome, total }));
}

export function montarMenu(produtos: Produto[], linkWhats: string): Aba[] {
  const ativos = produtos.filter((p) => p.ativo);
  const conta = (slug: string) => ativos.filter((p) => p.categoria_slug === slug).length;
  const todas = new Map<string, number>();
  for (const p of ativos) if (p.marca) todas.set(p.marca, (todas.get(p.marca) ?? 0) + 1);

  const busca = (cat: string, marca: string) => `/catalogo/${cat}?busca=${encodeURIComponent(marca)}`;

  return [
    {
      chave: "novidades",
      nome: "Novidades",
      href: "/catalogo",
      icone: "novidade",
      colunas: 1,
      itens: [
        { nome: "Chegou agora", href: "/catalogo", icone: "novidade", nota: "as peças novas primeiro" },
        { nome: "Tênis", href: "/catalogo/tenis", icone: "tenis", nota: `${conta("tenis")} pares` },
        { nome: "Perfumes com preço", href: "/catalogo/perfumes", icone: "perfume", nota: `${conta("perfumes")} fragrâncias` },
      ],
    },
    {
      chave: "roupas",
      nome: "Roupas",
      href: "/catalogo/roupas",
      icone: "camiseta",
      colunas: 1,
      itens: [
        { nome: "Camisetas", href: "/catalogo/camisetas", icone: "camiseta", nota: `${conta("camisetas")} modelos` },
        { nome: "Camisas de time", href: "/catalogo/camisas-de-futebol", icone: "camisa", nota: `${conta("camisas-de-futebol")} camisas` },
        { nome: "Todas as roupas", href: "/catalogo/roupas", icone: "etiqueta" },
      ],
    },
    {
      chave: "tenis",
      nome: "Tênis",
      href: "/catalogo/tenis",
      icone: "tenis",
      titulo: "Por marca",
      colunas: 2,
      itens: [
        ...marcasDe(ativos, "tenis", 7).map((m) => ({ nome: m.nome, href: busca("tenis", m.nome), nota: `${m.total}` })),
        { nome: `Todos os ${conta("tenis")}`, href: "/catalogo/tenis", icone: "tenis" as const },
      ],
    },
    {
      chave: "perfumes",
      nome: "Perfumes",
      href: "/catalogo/perfumes",
      icone: "perfume",
      titulo: "Por marca, todos com preço",
      colunas: 3,
      itens: [
        ...marcasDe(ativos, "perfumes", 11).map((m) => ({ nome: m.nome, href: busca("perfumes", m.nome), nota: `${m.total}` })),
        { nome: `Todos os ${conta("perfumes")}`, href: "/catalogo/perfumes", icone: "perfume" as const },
      ],
    },
    {
      chave: "correntes",
      nome: "Correntes",
      href: linkWhats,
      icone: "corrente",
      externa: true,
      colunas: 1,
      itens: [{ nome: "Pergunte no WhatsApp", href: linkWhats, icone: "corrente", nota: "as correntes ainda não estão na vitrine", externa: true }],
    },
    {
      chave: "marcas",
      nome: "Marcas",
      href: "/#marcas",
      icone: "marca",
      titulo: `${todas.size} marcas na vitrine`,
      colunas: 4,
      itens: [...todas.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR"))
        .map(([nome, total]) => ({ nome, href: `/catalogo?busca=${encodeURIComponent(nome)}`, nota: `${total}` })),
    },
  ];
}
