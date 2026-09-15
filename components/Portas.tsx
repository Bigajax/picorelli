import Image from "next/image";
import Link from "next/link";
import { Monograma } from "./Marca";
import type { Produto } from "@/lib/tipos";

export type Porta = {
  nome: string;
  href: string;
  peca?: Produto | null;
  externa?: boolean;
  nota?: string;
};

/**
 * As portas da loja com foto, como a fileira de categorias das lojas de
 * moda: a foto de uma peça com os cantos redondos e, embaixo, o nome
 * da porta numa placa de fio. Correntes não tem foto
 * ainda: a porta é preta, com o monograma, e abre o WhatsApp.
 */
export function Portas({ portas }: { portas: Porta[] }) {
  return (
    <section aria-labelledby="titulo-portas" className="miolo pt-12 lg:pt-16">
      <h2 id="titulo-portas" className="sr-only">
        Categorias
      </h2>
      <ul className="faixa-scroll sangra flex gap-3 overflow-x-auto pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0">
        {portas.map((p) => {
          const capa = p.peca?.imagens[0];
          const classes = "group block";
          const conteudo = (
            <>
              <span className="block">
                <span className="foto block aspect-[3/4]">
                  {capa ? (
                    <Image
                      src={capa.url}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 14rem"
                      placeholder={capa.blur ? "blur" : "empty"}
                      blurDataURL={capa.blur ?? undefined}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span className="flex h-full flex-col items-center justify-center gap-4 bg-veludo px-4 text-center">
                      <Monograma className="h-20 w-20" />
                      <span className="text-[0.8125rem] text-marfim-fraco">{p.nota}</span>
                    </span>
                  )}
                </span>
              </span>
              <span className="btn btn--placa btn--placa-fio mt-3 w-full">{p.nome}</span>
            </>
          );
          return (
            <li key={p.nome} className="w-[44vw] shrink-0 sm:w-[13rem] lg:w-auto">
              {p.externa ? (
                <a href={p.href} target="_blank" rel="noreferrer" className={classes}>
                  {conteudo}
                </a>
              ) : (
                <Link href={p.href} className={classes}>
                  {conteudo}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
