import Image from "next/image";
import Link from "next/link";
import type { Produto } from "@/lib/tipos";

/**
 * A abertura. À esquerda a manchete em romana, grande, como um letreiro.
 * À direita a vitrine de verdade: a estrela da vez segurada pela moldura
 * de canto aberto (o quadrado do R), com uma segunda peça encostada por
 * cima, como duas fotos na bancada. Embaixo, a linha que a própria logo
 * carrega, ROUPAS | TÊNIS | PERFUMES | CORRENTES, vira a navegação: uma
 * faixa entre dois fios de ouro, cada porta separada por um fio vertical.
 */
export function Hero({
  frase,
  estrelas,
  linkWhats,
}: {
  frase: string;
  estrelas: Produto[];
  linkWhats: string;
}) {
  const principal = estrelas.find((p) => p.categoria_slug === "tenis") ?? estrelas[0];
  const segunda = estrelas.find((p) => p !== principal && p.categoria_slug !== "perfumes") ?? estrelas[1];

  return (
    <section aria-labelledby="titulo-hero">
      <div className="mx-auto grid max-w-[72rem] gap-10 px-4 pt-10 sm:px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16 lg:px-10 lg:pt-16">
        <div>
          <p className="etiqueta">São Paulo, zona oeste. Pedido pelo WhatsApp</p>
          <h1 id="titulo-hero" className="manchete mt-4 max-w-[16ch] text-[clamp(2rem,5.2vw,3.5rem)] text-marfim">
            {frase}
          </h1>
          <p className="falada mt-6 max-w-[38ch] text-[1.0625rem] text-marfim-fraco">
            Você escolhe aqui, manda a mensagem e a loja confirma. Sem cadastro, sem carrinho.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Link href="/catalogo" className="btn btn--cta w-full sm:w-auto">
              Ver o catálogo
            </Link>
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--texto">
              Chamar no WhatsApp
            </a>
          </div>
        </div>

        {principal ? (
          <div className="relative mx-auto w-full max-w-[26rem] pb-14 pr-10 sm:pr-14 lg:mx-0 lg:max-w-none lg:justify-self-end">
            <Link href={`/produto/${principal.slug}`} className="canto canto--grande canto--entra group block p-3">
              <span className="foto block aspect-[4/5] rounded-[2px]">
                <Foto produto={principal} sizes="(max-width: 1024px) 90vw, 26rem" prioridade />
              </span>
            </Link>

            {segunda ? (
              /* o .canto é relative, então o absoluto fica no invólucro */
              <div className="absolute bottom-0 right-0 w-[46%]">
                <Link
                  href={`/produto/${segunda.slug}`}
                  className="canto canto--entra group block bg-veludo p-2 shadow-[0_30px_50px_-20px_rgba(0,0,0,0.9)]"
                  style={{ animationDelay: "160ms" }}
                >
                  <span className="foto block aspect-square rounded-[2px]">
                    <Foto produto={segunda} sizes="(max-width: 1024px) 40vw, 12rem" />
                  </span>
                </Link>
              </div>
            ) : null}

            <p className="absolute bottom-3 left-0 max-w-[50%] text-[0.8125rem] leading-snug text-marfim-fraco">
              <span className="etiqueta block">Chegou agora</span>
              <Link href={`/produto/${principal.slug}`} className="text-marfim hover:text-ouro">
                {principal.nome}
              </Link>
            </p>
          </div>
        ) : null}
      </div>

      <nav aria-label="As quatro portas da loja" className="mt-12 border-y border-ouro/60 lg:mt-16">
        <ul className="mx-auto grid max-w-[72rem] grid-cols-2 lg:grid-cols-4">
          {[
            { nome: "Roupas", href: "/catalogo/roupas", nota: "camisetas e camisas de futebol" },
            { nome: "Tênis", href: "/catalogo/tenis", nota: "Nike, adidas, Boss, LV" },
            { nome: "Perfumes", href: "/catalogo/perfumes", nota: "importados, com preço" },
            { nome: "Correntes", href: linkWhats, nota: "pergunte no WhatsApp", externa: true },
          ].map((p, i) => {
            const classes = `group flex flex-col items-center gap-1 px-4 py-6 text-center transition-colors hover:bg-carvao lg:py-7 ${i % 2 === 1 ? "border-l border-fio" : ""} ${i >= 2 ? "border-t border-fio lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`;
            const conteudo = (
              <>
                <span className="romana text-[clamp(0.9375rem,1.8vw,1.25rem)] text-marfim transition-colors group-hover:text-ouro-claro">{p.nome}</span>
                <span className="text-[0.8125rem] text-marfim-fraco">{p.nota}</span>
              </>
            );
            return (
              <li key={p.nome}>
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
      </nav>
    </section>
  );
}

function Foto({ produto, sizes, prioridade = false }: { produto: Produto; sizes: string; prioridade?: boolean }) {
  const capa = produto.imagens[0];
  if (!capa) return null;
  return (
    <Image
      src={capa.url}
      alt={capa.alt ?? produto.nome}
      fill
      priority={prioridade}
      sizes={sizes}
      placeholder={capa.blur ? "blur" : "empty"}
      blurDataURL={capa.blur ?? undefined}
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  );
}
