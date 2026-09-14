import Link from "next/link";
import { CardProduto } from "./CardProduto";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * Uma prateleira da home: régua com o título em romana e o caminho para
 * ver tudo, e os cartões em grade (quatro por linha no desktop) ou num
 * trilho que rola de lado. A grade é para o que tem preço e vende pela
 * foto (perfumes, tênis); o trilho, para o resto.
 */
export function Prateleira({
  id,
  titulo,
  href,
  verTudo,
  produtos,
  categorias,
  modo = "grade",
  prioridade = false,
}: {
  id: string;
  titulo: string;
  href: string;
  verTudo: string;
  produtos: Produto[];
  categorias: Map<string, Categoria>;
  modo?: "grade" | "trilho";
  prioridade?: boolean;
}) {
  if (!produtos.length) return null;

  const lista =
    modo === "grade" ? (
      <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-5">
        {produtos.map((p, i) => (
          <li key={p.id}>
            <CardProduto produto={p} categoria={categorias.get(p.categoria_slug ?? "")} prioridade={prioridade && i < 2} />
          </li>
        ))}
      </ul>
    ) : (
      <ul className="faixa-scroll -mx-4 mt-6 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:gap-4 sm:px-6 lg:-mx-10 lg:gap-5 lg:px-10">
        {produtos.map((p, i) => (
          <li key={p.id} className="w-[62vw] shrink-0 sm:w-[16rem] lg:w-[17rem]">
            <CardProduto produto={p} categoria={categorias.get(p.categoria_slug ?? "")} prioridade={prioridade && i < 2} tamanhos="(max-width: 640px) 62vw, (max-width: 1024px) 16rem, 17rem" />
          </li>
        ))}
      </ul>
    );

  return (
    <section aria-labelledby={id} className="mx-auto max-w-[72rem] px-4 pt-14 sm:px-6 lg:px-10 lg:pt-20">
      <div className="regua">
        <h2 id={id} className="secao">
          {titulo}
        </h2>
        <Link href={href} className="shrink-0 text-[0.9375rem] font-bold text-marfim hover:text-ouro">
          {verTudo}
        </Link>
      </div>
      {lista}
    </section>
  );
}
