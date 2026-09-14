import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Catalogo } from "@/components/Catalogo";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { GRUPOS } from "@/lib/grupos";
import { linkGeral } from "@/lib/whatsapp";

type Props = { params: Promise<{ categoria: string }> };

/* uma porta pode ser uma categoria do catálogo ou um grupo delas (Roupas) */
async function resolver(slug: string) {
  const { categorias, produtos } = await carregarCatalogo();
  const grupo = GRUPOS[slug];
  const atual = categorias.find((c) => c.slug === slug);
  if (!grupo && !atual) return null;
  const escopo = grupo ? grupo.categorias : [slug];
  const pecas = produtos.filter((p) => p.ativo && escopo.includes(p.categoria_slug ?? ""));
  return { nome: grupo?.nome ?? atual!.nome, escopo, pecas, categorias: categorias.filter((c) => c.ativo), grupo: Boolean(grupo) };
}

export async function generateStaticParams() {
  const { categorias } = await carregarCatalogo();
  return [...categorias.map((c) => ({ categoria: c.slug })), ...Object.keys(GRUPOS).map((categoria) => ({ categoria }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const r = await resolver(categoria);
  if (!r) return {};
  const quantas = r.pecas.length;
  return {
    title: r.nome,
    description: `${r.nome} na Picorelli Premium: ${quantas} ${quantas === 1 ? "peça" : "peças"} em São Paulo. Pedido pelo WhatsApp.`,
    alternates: { canonical: `/catalogo/${categoria}` },
  };
}

export default async function PaginaCategoria({ params }: Props) {
  const { categoria } = await params;
  const [r, config] = await Promise.all([resolver(categoria), obterConfig()]);
  if (!r) notFound();

  const quantas = r.pecas.length;

  return (
    <>
      <header className="mx-auto max-w-[72rem] px-4 pb-6 pt-8 sm:px-6 lg:px-10 lg:pb-8 lg:pt-12">
        <p className="etiqueta">Picorelli Premium</p>
        <h1 className="manchete mt-2 text-[clamp(1.75rem,4vw,2.5rem)] text-marfim">{r.nome}</h1>
        <p className="falada mt-2 text-[1.0625rem] text-marfim-fraco">
          {quantas} {quantas === 1 ? "peça" : "peças"}
          {r.grupo ? ", entre camisetas e camisas de futebol." : "."}
        </p>
      </header>
      <Catalogo produtos={r.pecas} categorias={r.categorias} categoriaAtual={r.grupo ? undefined : categoria} escopoFechado linkWhats={linkGeral(config.whatsapp)} />
    </>
  );
}
