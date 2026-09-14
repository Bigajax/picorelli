import Image from "next/image";
import Link from "next/link";
import { precoBRL } from "@/lib/formato";
import { temDesconto } from "@/lib/filtro";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * O cartão: a foto segurada pela moldura de canto aberto (o quadrado do
 * R), a marca em etiqueta dourada, o nome, o preço com o antigo riscado
 * quando há, e o "Quero". Sem preço, diz que o preço é no WhatsApp em
 * vez de esconder.
 */
export function CardProduto({
  produto,
  categoria,
  prioridade = false,
  tamanhos = "(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw",
}: {
  produto: Produto;
  categoria?: Categoria | null;
  prioridade?: boolean;
  tamanhos?: string;
}) {
  const capa = produto.imagens[0];
  const promo = temDesconto(produto);
  const cheio = precoBRL(produto.preco);
  const vigente = precoBRL(produto.preco_promocional ?? produto.preco);
  const href = `/produto/${produto.slug}`;
  const rotulo = produto.marca ?? categoria?.nome;
  /* as artes dos perfumes são quadradas: cortá-las em 4/5 decepa o texto */
  const quadrada = Boolean(capa?.largura && capa?.altura && capa.largura >= capa.altura);

  return (
    <article className="group flex h-full flex-col">
      <Link href={href} className="canto block p-2" aria-label={produto.nome}>
        <span className={`foto block rounded-[2px] ${quadrada ? "aspect-square" : "aspect-[4/5]"}`}>
          {capa ? (
            <Image
              src={capa.url}
              alt={capa.alt ?? produto.nome}
              fill
              sizes={tamanhos}
              placeholder={capa.blur ? "blur" : "empty"}
              blurDataURL={capa.blur ?? undefined}
              priority={prioridade}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : null}
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-2 pt-3">
        {rotulo ? <p className="etiqueta">{rotulo}</p> : null}
        <h3 className="titulo-cartao mt-1.5 text-marfim">
          <Link href={href} className="hover:text-ouro-claro">
            {produto.nome}
          </Link>
        </h3>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          {vigente ? (
            <p className="preco flex flex-col leading-none text-ouro">
              {promo && cheio ? <span className="mb-1 text-[0.75rem] font-bold text-marfim-fraco line-through">{cheio}</span> : null}
              <span className="text-[1.125rem]">{vigente}</span>
            </p>
          ) : (
            <p className="miudo leading-tight">Preço no WhatsApp</p>
          )}
          <Link href={href} className="btn btn--texto shrink-0">
            Quero
          </Link>
        </div>
      </div>
    </article>
  );
}
