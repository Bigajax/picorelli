import Image from "next/image";
import Link from "next/link";
import type { Categoria } from "@/lib/tipos";

/**
 * A abertura: a manchete em romana, centrada como a logo, e embaixo as
 * quatro portas que a própria logo anuncia (ROUPAS | TÊNIS | PERFUMES |
 * CORRENTES). Cada porta é uma foto segurada pela moldura de canto
 * aberto. Correntes ainda não tem foto nem preço: a porta abre a
 * conversa no WhatsApp, e diz isso.
 */
type Porta = { nome: string; href: string; foto?: Categoria | null; externa?: boolean; nota?: string };

export function Hero({ frase, categorias, linkWhats }: { frase: string; categorias: Categoria[]; linkWhats: string }) {
  const porSlug = new Map(categorias.map((c) => [c.slug, c]));
  const portas: Porta[] = [
    { nome: "Roupas", href: "/catalogo/roupas", foto: porSlug.get("camisas-de-futebol") ?? porSlug.get("camisetas") },
    { nome: "Tênis", href: "/catalogo/tenis", foto: porSlug.get("tenis") },
    { nome: "Perfumes", href: "/catalogo/perfumes", foto: porSlug.get("perfumes") },
    { nome: "Correntes", href: linkWhats, externa: true, nota: "Pergunte o que tem" },
  ];

  return (
    <section aria-labelledby="titulo-hero" className="mx-auto max-w-[72rem] px-4 pt-10 sm:px-6 lg:px-10 lg:pt-16">
      <div className="mx-auto max-w-[44rem] text-center">
        <p className="etiqueta">São Paulo, zona oeste. Pedido pelo WhatsApp</p>
        <h1 id="titulo-hero" className="manchete mt-4 text-[clamp(1.75rem,5.2vw,3.25rem)] text-marfim">
          {frase}
        </h1>
        <p className="falada mx-auto mt-5 max-w-[40ch] text-[1.0625rem] text-marfim-fraco">
          Você escolhe aqui, manda a mensagem e a loja confirma. Sem cadastro, sem carrinho.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <Link href="/catalogo" className="btn btn--cta w-full sm:w-auto">
            Ver o catálogo
          </Link>
          <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--texto">
            Chamar no WhatsApp
          </a>
        </div>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-5" aria-label="As quatro portas da loja">
        {portas.map((p, i) => (
          <li key={p.nome} className="group">
            {p.externa ? (
              <a href={p.href} target="_blank" rel="noreferrer" className="canto canto--grande block p-2">
                <span className="foto flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-[2px] bg-carvao p-4 text-center">
                  <span className="romana text-[clamp(1rem,2.4vw,1.375rem)] text-ouro">{p.nome}</span>
                  <span className="falada max-w-[16ch] text-[0.875rem] text-marfim-fraco">{p.nota}</span>
                  <span className="mono-rotulo mt-2 text-marfim transition-colors group-hover:text-ouro-claro">WhatsApp</span>
                </span>
              </a>
            ) : (
              <Link href={p.href} className="canto canto--grande block p-2">
                <span className="foto block aspect-[4/5] rounded-[2px]">
                  {p.foto?.capa ? (
                    <Image
                      src={p.foto.capa}
                      alt=""
                      fill
                      priority={i < 2}
                      sizes="(max-width: 1024px) 46vw, 17rem"
                      placeholder={p.foto.capaBlur ? "blur" : "empty"}
                      blurDataURL={p.foto.capaBlur ?? undefined}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  ) : null}
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(20,20,20,0.92)] to-transparent" />
                  <span className="romana absolute inset-x-0 bottom-5 text-center text-[clamp(1rem,2.4vw,1.375rem)] text-marfim transition-colors group-hover:text-ouro-claro">
                    {p.nome}
                  </span>
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
