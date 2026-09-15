"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Letreiro, Monograma } from "./Marca";
import { Icone } from "./Icones";
import type { Aba } from "@/lib/menu";
import type { Categoria } from "@/lib/tipos";

/**
 * Preto, como o chão da logo, em três linhas: o aviso (frases do painel,
 * separadas por "|", que se revezam subindo uma de cada vez), a linha da marca (logo à esquerda, busca no meio, WhatsApp
 * à direita) e a fila de portas com ícone de linha, cada uma separada
 * por um fio. No desktop, passar o mouse numa porta abre a aba dela
 * por baixo, com o que a vitrine tem (as marcas contadas, as
 * subcategorias); o clique na porta continua abrindo a página. O botão
 * Menu abre uma gaveta pela direita, preta e direta: a busca, as seis
 * portas com ícone, e a placa do WhatsApp no pé. Nada mais. No celular,
 * como nas lojas: menu à esquerda, marca no meio, WhatsApp à direita, a
 * busca larga logo abaixo, e a fila de portas com o ícone em cima do
 * nome, rolando de lado.
 */
export function Cabecalho({ linkWhats, aviso, menu }: { categorias?: Categoria[]; linkWhats: string; aviso?: string; menu: Aba[] }) {
  const [aberto, setAberto] = useState(false);
  const [termo, setTermo] = useState("");
  const router = useRouter();
  const caminho = usePathname();
  /* o revezamento do aviso é escrito para quatro frases: menos que isso, repete; mais, corta */
  const base = (aviso ?? "").split("|").map((f) => f.trim()).filter(Boolean);
  const frases = base.length ? Array.from({ length: 4 }, (_, i) => base[i % base.length]) : [];

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fechar);
      document.body.style.overflow = "";
    };
  }, [aberto]);

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    const q = termo.trim();
    setAberto(false);
    router.push(q ? `/catalogo?busca=${encodeURIComponent(q)}` : "/catalogo");
  }

  return (
    <header className="escuro relative z-50">
      {frases.length ? (
        <p className="aviso border-b border-fio bg-carvao text-[0.75rem] font-bold tracking-[0.06em] text-marfim" aria-live="off">
          {frases.map((f, i) => (
            <span key={i} className="aviso-item" style={{ "--i": i } as React.CSSProperties}>
              {f}
            </span>
          ))}
        </p>
      ) : null}

      <div className="miolo flex h-[4.25rem] items-center justify-between gap-3 lg:grid lg:h-[6rem] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-10">
        {/* no celular o menu fica à esquerda, como nas lojas; no desktop vai para a direita */}
        <button type="button" onClick={() => setAberto(true)} aria-expanded={aberto} aria-controls="menu-categorias" aria-label="Abrir o menu" className="flex h-10 w-10 items-center justify-center lg:hidden">
          <span aria-hidden="true" className="flex flex-col gap-[5px]">
            <span className="block h-[2px] w-6 bg-ouro" />
            <span className="block h-[2px] w-6 bg-ouro" />
            <span className="block h-[2px] w-6 bg-ouro" />
          </span>
        </button>

        <Link href="/" aria-label="Picorelli Premium, página inicial" className="flex shrink-0 items-center gap-2.5 lg:gap-3">
          <Monograma className="h-[2.5rem] w-[2.5rem] lg:h-[3.75rem] lg:w-[3.75rem]" />
          <Letreiro className="h-[2.5rem] w-auto lg:h-[3.75rem]" />
        </Link>

        <form onSubmit={buscar} role="search" className="mx-auto hidden w-full max-w-[30rem] lg:block">
          <label className="busca-cabecalho">
            <span className="sr-only">Buscar por nome ou marca</span>
            <input value={termo} onChange={(e) => setTermo(e.target.value)} placeholder="O que você procura? Nike, Milan, Versace..." />
            <button type="submit" aria-label="Buscar">
              <Icone nome="lupa" className="h-5 w-5" />
            </button>
          </label>
        </form>

        <div className="flex items-center gap-4 lg:gap-6">
          <a href={linkWhats} target="_blank" rel="noreferrer" className="mono-rotulo hidden items-center gap-2 text-marfim hover:text-ouro lg:flex">
            <Icone nome="whats" className="h-5 w-5 text-ouro" />
            Pedido pelo WhatsApp
          </a>
          <a href={linkWhats} target="_blank" rel="noreferrer" aria-label="Pedido pelo WhatsApp" className="flex h-10 w-10 items-center justify-center text-ouro lg:hidden">
            <Icone nome="whats" className="h-6 w-6" />
          </a>
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-categorias"
            className="mono-rotulo hidden items-center gap-2 text-marfim hover:text-ouro lg:flex"
          >
            <span aria-hidden="true" className="flex flex-col gap-[4px]">
              <span className="block h-[2px] w-5 bg-ouro" />
              <span className="block h-[2px] w-5 bg-ouro" />
              <span className="block h-[2px] w-5 bg-ouro" />
            </span>
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* a busca do celular, larga, logo abaixo da marca, como nas lojas */}
      <form onSubmit={buscar} role="search" className="miolo pb-3 lg:hidden">
        <label className="busca-cabecalho">
          <span className="sr-only">Buscar por nome ou marca</span>
          <input value={termo} onChange={(e) => setTermo(e.target.value)} placeholder="O que você procura?" />
          <button type="submit" aria-label="Buscar">
            <Icone nome="lupa" className="h-5 w-5" />
          </button>
        </label>
      </form>

      <nav aria-label="Portas da loja" className="border-t border-fio">
        <ul className="miolo faixa-scroll flex overflow-x-auto lg:grid lg:grid-cols-6 lg:overflow-visible">
          {menu.map((aba, i) => (
            <li key={aba.chave} className={`porta ${i > 0 ? "lg:border-l lg:border-fio" : ""}`}>
              {aba.externa ? (
                <a href={aba.href} target="_blank" rel="noreferrer" className="porta-link">
                  <Icone nome={aba.icone} className="h-7 w-7 lg:h-9 lg:w-9" peso={1.2} />
                  {aba.nome}
                </a>
              ) : (
                <Link href={aba.href} className="porta-link" aria-current={aba.href !== "/catalogo" && aba.href.startsWith("/catalogo") && caminho.startsWith(aba.href) ? "page" : undefined}>
                  <Icone nome={aba.icone} className="h-7 w-7 lg:h-9 lg:w-9" peso={1.2} />
                  {aba.nome}
                </Link>
              )}

              <div className={`porta-aba ${i >= menu.length - 2 ? "porta-aba--direita" : ""}`} aria-label={`${aba.nome}: atalhos`}>
                {aba.titulo ? <p className="etiqueta mb-3">{aba.titulo}</p> : null}
                <ul className={`grid gap-x-8 gap-y-1 ${aba.colunas === 4 ? "grid-cols-4" : aba.colunas === 3 ? "grid-cols-3" : aba.colunas === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {aba.itens.map((item) => {
                    const conteudo = (
                      <>
                        {item.icone ? <Icone nome={item.icone} className="h-7 w-7 shrink-0 text-tinta" peso={1.2} /> : null}
                        <span className="min-w-0">
                          <span className="block text-[0.9375rem] text-tinta group-hover:underline group-hover:underline-offset-4">{item.nome}</span>
                          {item.nota && item.icone ? <span className="block text-[0.75rem] text-tinta-fraca">{item.nota}</span> : null}
                        </span>
                        {item.nota && !item.icone ? <span className="ml-auto text-[0.6875rem] font-bold tracking-[0.1em] text-tinta-fraca">{item.nota}</span> : null}
                      </>
                    );
                    return (
                      <li key={item.nome}>
                        {item.externa ? (
                          <a href={item.href} target="_blank" rel="noreferrer" className="porta-item group">
                            {conteudo}
                          </a>
                        ) : (
                          <Link href={item.href} className="porta-item group">
                            {conteudo}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {aberto ? (
        <>
          <button type="button" aria-label="Fechar o menu" onClick={() => setAberto(false)} className="gaveta-veu" />
          <nav id="menu-categorias" aria-label="Menu" className="escuro gaveta">
            <div className="flex items-center justify-between px-5 pt-5">
              <span className="etiqueta">Menu</span>
              <button type="button" onClick={() => setAberto(false)} aria-label="Fechar o menu" className="grid h-10 w-10 place-items-center rounded-full border border-fio text-marfim hover:border-ouro hover:text-ouro">
                <Icone nome="fechar" className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={buscar} role="search" className="px-5 pt-4">
              <label className="busca-cabecalho">
                <span className="sr-only">Buscar por nome ou marca</span>
                <input id="busca-gaveta" value={termo} onChange={(e) => setTermo(e.target.value)} placeholder="O que você procura?" />
                <button type="submit" aria-label="Buscar">
                  <Icone nome="lupa" className="h-5 w-5" />
                </button>
              </label>
            </form>

            <ul className="mt-3 flex-1 overflow-y-auto px-3 pb-4">
              {menu.map((aba) => {
                const conteudo = (
                  <>
                    <Icone nome={aba.icone} className="h-8 w-8 shrink-0 text-ouro" peso={1.2} />
                    <span className="romana text-[0.9375rem] text-marfim">{aba.nome}</span>
                  </>
                );
                return (
                  <li key={aba.chave} className="border-b border-fio last:border-b-0">
                    {aba.externa ? (
                      <a href={aba.href} target="_blank" rel="noreferrer" onClick={() => setAberto(false)} className="gaveta-porta">
                        {conteudo}
                      </a>
                    ) : (
                      <Link href={aba.href} onClick={() => setAberto(false)} className="gaveta-porta">
                        {conteudo}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-fio px-5 py-5">
              <a href={linkWhats} target="_blank" rel="noreferrer" onClick={() => setAberto(false)} className="btn btn--placa btn--placa-ouro w-full">
                <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
                Pedir no WhatsApp
              </a>
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
