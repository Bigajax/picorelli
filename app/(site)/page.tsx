import { FaixaWhats } from "@/components/FaixaWhats";
import { Garantias } from "@/components/Garantias";
import { Hero } from "@/components/Hero";
import { Marcas } from "@/components/Marcas";
import { Portas } from "@/components/Portas";
import { Prateleira } from "@/components/Prateleira";
import { Vitrines } from "@/components/Vitrines";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { lerLogos } from "@/lib/logos";
import { linkGeral } from "@/lib/whatsapp";
import { configPadrao } from "@/data/site.config";

/**
 * A home no molde das lojas de moda masculina: banner, garantias, as
 * portas com foto, a prateleira do que chegou, duas vitrines grandes,
 * as prateleiras por categoria, a faixa preta do WhatsApp e a fila de
 * marcas (um letreiro que roda, logo abaixo da dobra). Tudo montado do catálogo: as fotos das portas e das vitrines
 * são peças reais, a estrela de cada categoria.
 */
export default async function Home() {
  const [{ categorias, produtos, hero }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);

  const whats = linkGeral(config.whatsapp);
  const ativos = produtos.filter((p) => p.ativo);
  const ativas = categorias.filter((c) => c.ativo);
  const porSlug = new Map(ativas.map((c) => [c.slug, c]));
  const da = (slug: string) => ativos.filter((p) => p.categoria_slug === slug).sort((a, b) => a.ordem - b.ordem);

  /* as estrelas abrem a página, na ordem em que foram estreladas */
  const destaques = hero
    .map((h) => ativos.find((p) => p.slug === h.slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 8);
  /* a estrela de uma categoria: a primeira estrelada dela, senão a primeira da lista */
  const estrelaDe = (slug: string) => destaques.find((p) => p.categoria_slug === slug) ?? da(slug)[0] ?? null;
  /* uma peça pelo slug, para as portas e vitrines não repetirem a foto do hero e do "Chegou agora" */
  const peca = (slug: string, senao: string) => ativos.find((p) => p.slug === slug) ?? estrelaDe(senao);

  /* as prateleiras por categoria mostram primeiro o que NÃO está no "Chegou agora", para a home não repetir foto */
  const inedito = (lista: typeof ativos) => [...lista.filter((p) => !destaques.includes(p)), ...lista.filter((p) => destaques.includes(p))];
  const perfumes = inedito(da("perfumes"));
  const tenis = inedito(da("tenis"));
  const camisas = inedito(da("camisas-de-futebol"));
  const camisetas = inedito(da("camisetas"));

  const logos = lerLogos();
  const marcas = Object.entries(
    ativos.reduce<Record<string, number>>((acc, p) => {
      if (p.marca) acc[p.marca] = (acc[p.marca] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .map(([nome, total]) => ({ nome, total, logo: logos[nome]?.arquivo ?? null }))
    .sort((a, b) => b.total - a.total || a.nome.localeCompare(b.nome, "pt-BR"));

  return (
    <>
      <Hero frase={config.frase_hero || configPadrao.frase_hero} estrelas={destaques} linkWhats={whats} />

      <Garantias />

      <Marcas marcas={marcas} />

      <Portas
        portas={[
          { nome: "Tênis", href: "/catalogo/tenis", peca: peca("tenis-nike-court-azul", "tenis") },
          { nome: "Camisas de time", href: "/catalogo/camisas-de-futebol", peca: peca("camisa-espanha-retro-adidas", "camisas-de-futebol") },
          { nome: "Camisetas", href: "/catalogo/camisetas", peca: peca("camiseta-abercrombie-los-angeles", "camisetas") },
          { nome: "Perfumes", href: "/catalogo/perfumes", peca: estrelaDe("perfumes") },
          { nome: "Correntes", href: whats, externa: true, nota: "Pergunte no WhatsApp" },
        ]}
      />

      <Prateleira id="titulo-destaques" titulo="Chegou agora" href="/catalogo" verTudo="Ver o catálogo" produtos={destaques} categorias={porSlug} prioridade total={ativos.length} nomeDaPorta="peças" feminino />

      <Vitrines
        vitrines={[
          tenis[0] && { titulo: "Tênis", texto: `${tenis.length} pares: Nike, adidas, Boss e LV.`, href: "/catalogo/tenis", peca: peca("tenis-lv-trainer-cinza", "tenis") ?? tenis[0] },
          camisas[0] && { titulo: "Camisas de time", texto: "Retrô e da temporada, dos times daqui e da Europa.", href: "/catalogo/camisas-de-futebol", peca: peca("camisa-corinthians-pre-jogo-nike", "camisas-de-futebol") ?? camisas[0] },
        ].filter((v): v is NonNullable<typeof v> => Boolean(v))}
      />

      <Prateleira id="titulo-perfumes" titulo="Perfumes" href="/catalogo/perfumes" verTudo={`Ver os ${perfumes.length}`} produtos={perfumes} categorias={porSlug} nomeDaPorta="perfumes" />

      <Prateleira id="titulo-tenis" titulo="Tênis" href="/catalogo/tenis" verTudo={`Ver os ${tenis.length}`} produtos={tenis} categorias={porSlug} nomeDaPorta="pares" />

      <Prateleira id="titulo-camisas" titulo="Camisas de time" href="/catalogo/camisas-de-futebol" verTudo={`Ver as ${camisas.length}`} produtos={camisas} categorias={porSlug} nomeDaPorta="camisas" feminino />

      <Prateleira id="titulo-camisetas" titulo="Camisetas" href="/catalogo/camisetas" verTudo={`Ver as ${camisetas.length}`} produtos={camisetas} categorias={porSlug} nomeDaPorta="camisetas" feminino />

      <FaixaWhats linkWhats={whats} />
    </>
  );
}
