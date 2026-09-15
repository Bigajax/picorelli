import Image from "next/image";
import Link from "next/link";
import { Icone } from "./Icones";
import { precoBRL } from "@/lib/formato";
import { temDesconto } from "@/lib/filtro";
import { linkPeca } from "@/lib/whatsapp";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * O cartão de peça. A foto é sempre quadrada (as fotos vêm de fontes
 * diferentes, e o quadrado é o único corte que iguala todas), a marca
 * em etiqueta, o nome (até duas linhas), e a placa de
 * ação no pé: "Pedir no WhatsApp" já leva a mensagem montada com a
 * peça. O preço, quando há, é uma etiqueta preta sobre a foto (com o
 * antigo riscado), então o miolo de texto é igual para toda peça e a
 * prateleira alinha sem buraco, com ou sem preço. Peça sem preço não
 * diz nada: o botão do WhatsApp já é a resposta.
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
  const vigenteNumero = produto.preco_promocional ?? produto.preco;
  const vigente = precoBRL(vigenteNumero);
  const href = `/produto/${produto.slug}`;
  const rotulo = produto.marca ?? categoria?.nome;
  const pedir = linkPeca(produto, { preco: vigenteNumero ?? null });

  return (
    <article className="group flex h-full flex-col">
      <Link href={href} className="foto block aspect-square" aria-label={produto.nome}>
        {vigente ? (
          <span className="placa-etiqueta absolute bottom-3 left-3 z-[1] !flex items-baseline gap-2.5 normal-case tracking-normal">
            <span className="preco text-[0.9375rem]">{vigente}</span>
            {promo && cheio ? <span className="text-[0.6875rem] tracking-normal text-marfim-fraco line-through decoration-marfim-fraco">{cheio}</span> : null}
          </span>
        ) : null}
        {capa ? (
          <Image
            src={capa.url}
            alt={capa.alt ?? produto.nome}
            fill
            sizes={tamanhos}
            placeholder={capa.blur ? "blur" : "empty"}
            blurDataURL={capa.blur ?? undefined}
            priority={prioridade}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col pt-2.5">
        <p className="etiqueta min-h-[1em]">{rotulo ?? ""}</p>
        <h3 className="titulo-cartao mb-3 mt-1 line-clamp-2 text-tinta">
          <Link href={href} className="hover:text-ouro-texto">
            {produto.nome}
          </Link>
        </h3>

        <a href={pedir} target="_blank" rel="noreferrer" className="btn btn--placa btn--placa-ouro mt-auto w-full">
          <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
          Pedir no WhatsApp
        </a>
      </div>
    </article>
  );
}
