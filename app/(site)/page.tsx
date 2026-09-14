import { ComoFunciona } from "@/components/ComoFunciona";
import { Hero } from "@/components/Hero";
import { Prateleira } from "@/components/Prateleira";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { linkGeral } from "@/lib/whatsapp";
import { configPadrao } from "@/data/site.config";

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

  const perfumes = da("perfumes");
  const tenis = da("tenis");
  const camisas = da("camisas-de-futebol");
  const camisetas = da("camisetas");

  return (
    <>
      <Hero frase={config.frase_hero || configPadrao.frase_hero} categorias={ativas} linkWhats={whats} />

      <Prateleira id="titulo-destaques" titulo="Chegou agora" href="/catalogo" verTudo="Ver tudo" produtos={destaques} categorias={porSlug} modo="trilho" prioridade />

      <Prateleira id="titulo-perfumes" titulo="Perfumes" href="/catalogo/perfumes" verTudo={`Ver os ${perfumes.length}`} produtos={perfumes.slice(0, 8)} categorias={porSlug} />

      <Prateleira id="titulo-tenis" titulo="Tênis" href="/catalogo/tenis" verTudo={`Ver os ${tenis.length}`} produtos={tenis.slice(0, 8)} categorias={porSlug} />

      <Prateleira id="titulo-camisas" titulo="Camisas de futebol" href="/catalogo/camisas-de-futebol" verTudo="Ver todas" produtos={camisas} categorias={porSlug} modo="trilho" />

      <Prateleira id="titulo-camisetas" titulo="Camisetas" href="/catalogo/camisetas" verTudo="Ver todas" produtos={camisetas} categorias={porSlug} modo="trilho" />

      <ComoFunciona linkWhats={whats} />
    </>
  );
}
