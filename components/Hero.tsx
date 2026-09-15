import Image from "next/image";
import Link from "next/link";
import type { Produto } from "@/lib/tipos";

/**
 * O banner de abertura, de largura total como nas lojas: a estrela da
 * vez em foto grande à direita, o preto da logo subindo por cima dela
 * até virar chão do texto à esquerda. No celular a foto ocupa o alto
 * (com o tênis inteiro à vista) e o texto vem centrado logo abaixo,
 * sobre o preto. A manchete (do painel, as quatro
 * coisas que a loja vende) em romana grande; embaixo, as duas placas
 * chanfradas. Uma linha diz qual é a
 * peça da foto, porque banner de loja mostra o que tem.
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
  const capa = principal?.imagens[0];

  return (
    <section aria-labelledby="titulo-hero" className="escuro relative overflow-hidden">
      {capa ? (
        <div className="absolute inset-x-0 top-0 h-[20rem] sm:h-[24rem] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[58%]">
          <Image
            src={capa.url}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            placeholder={capa.blur ? "blur" : "empty"}
            blurDataURL={capa.blur ?? undefined}
            className="object-cover object-[center_62%] lg:object-[center_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-veludo from-8% via-veludo/35 via-45% to-veludo/10 lg:bg-gradient-to-r lg:from-veludo lg:from-0% lg:via-veludo/55 lg:to-transparent" />
        </div>
      ) : null}

      <div className="miolo relative pb-10 pt-[16rem] sm:pt-[19.5rem] lg:py-20">
        {/* no celular tudo centrado sobre a foto, como o banner das lojas; no desktop, à esquerda */}
        <div className="mx-auto flex max-w-[34rem] flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left">
          <span className="placa-etiqueta">Chegou agora</span>

          <div className="mt-6">
            <h1 id="titulo-hero" className="manchete max-w-[19ch] text-[clamp(1.75rem,7.5vw,2.25rem)] text-marfim lg:text-[clamp(1.875rem,4.2vw,3.125rem)]">
              {frase}
            </h1>
          </div>

          <p className="falada mt-5 max-w-[34ch] text-[1rem] text-marfim lg:mt-6 lg:max-w-[40ch] lg:text-[1.0625rem]">
            As peças mais pedidas da zona oeste, com pedido pelo WhatsApp. Sem cadastro, sem carrinho, sem fila.
          </p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4 lg:mt-8">
            <Link href="/catalogo" className="btn btn--placa btn--placa-ouro">
              Ver o catálogo
            </Link>
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--placa btn--placa-fio">
              Chamar no WhatsApp
            </a>
          </div>

          {principal ? (
            <p className="mt-6 text-[0.8125rem] text-marfim-fraco lg:mt-8">
              Na foto:{" "}
              <Link href={`/produto/${principal.slug}`} className="font-bold text-marfim underline decoration-ouro underline-offset-4 hover:text-ouro-claro">
                {principal.nome}
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
