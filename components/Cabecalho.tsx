"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Letreiro, Monograma } from "./Marca";
import type { Categoria } from "@/lib/tipos";

/**
 * Preto, fio dourado embaixo: o monograma e o letreiro no centro, os
 * caminhos à esquerda, busca e WhatsApp à direita. O menu de categorias
 * abre por cima da página.
 */
export function Cabecalho({ categorias, linkWhats }: { categorias: Categoria[]; linkWhats: string }) {
  const [aberto, setAberto] = useState(false);
  const [termo, setTermo] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, [aberto]);

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    const q = termo.trim();
    router.push(q ? `/catalogo?busca=${encodeURIComponent(q)}` : "/catalogo");
  }

  return (
    <header className="relative z-50 border-b border-[color:var(--fio)] bg-veludo">
      <div className="relative z-50 mx-auto flex h-[5rem] max-w-[72rem] items-center justify-between gap-3 px-4 sm:px-6 lg:grid lg:h-[6.5rem] lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <nav aria-label="Principal" className="order-1 flex items-center gap-4 lg:gap-6">
          <Link href="/catalogo" className="mono-rotulo hidden text-marfim hover:text-ouro sm:block">
            Catálogo
          </Link>
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-categorias"
            className="mono-rotulo flex flex-col items-center gap-1 text-marfim hover:text-ouro lg:flex-row lg:gap-1.5"
          >
            <span aria-hidden="true" className="flex flex-col gap-[4px] lg:hidden">
              <span className="block h-[2px] w-6 bg-ouro" />
              <span className="block h-[2px] w-6 bg-ouro" />
              <span className="block h-[2px] w-6 bg-ouro" />
            </span>
            <span className="text-[0.625rem] lg:text-[0.6875rem]">
              <span className="lg:hidden">Menu</span>
              <span className="hidden lg:inline">Categorias</span>
            </span>
            <span aria-hidden="true" className={`hidden text-[0.625rem] transition-transform lg:inline ${aberto ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>
        </nav>

        <Link href="/" aria-label="Picorelli Premium, página inicial" className="order-2 flex shrink-0 items-center gap-3">
          <Monograma className="h-[3.25rem] w-[3.25rem] lg:h-[4rem] lg:w-[4rem]" />
          <Letreiro className="hidden h-[3.25rem] w-auto sm:block lg:h-[4rem]" />
        </Link>

        <div className="order-3 flex items-center justify-end gap-3">
          <form onSubmit={buscar} className="hidden lg:block">
            <input value={termo} onChange={(e) => setTermo(e.target.value)} placeholder="Buscar" aria-label="Buscar por nome ou marca" className="busca-linha w-[11rem]" />
          </form>
          <button
            type="button"
            onClick={() => {
              setAberto(true);
              setTimeout(() => document.getElementById("busca-gaveta")?.focus(), 50);
            }}
            className="mono-rotulo flex flex-col items-center gap-1 text-marfim hover:text-ouro lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-ouro" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.8-3.8" />
            </svg>
            <span className="text-[0.625rem]">Buscar</span>
          </button>
          <a href={linkWhats} target="_blank" rel="noreferrer" className="mono-rotulo hidden items-center gap-2 text-marfim hover:text-ouro lg:flex">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-ouro" aria-hidden="true" focusable="false" fill="currentColor">
              <path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.2 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.9c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1 1 12 20.1zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2c.2-.6.2-1.1.2-1.2-.1-.2-.3-.3-.5-.4z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>

      {aberto ? (
        <>
          <button type="button" aria-label="Fechar o menu" onClick={() => setAberto(false)} className="fixed inset-0 z-40 bg-black/60 lg:hidden" />
          <nav id="menu-categorias" aria-label="Categorias" className="absolute inset-x-0 top-full z-50 border-t border-[color:var(--fio)] bg-carvao shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)]">
            <div className="mx-auto max-w-[72rem] px-4 py-5 sm:px-6 lg:px-10">
              <form onSubmit={buscar} className="mb-4 lg:hidden">
                <input id="busca-gaveta" value={termo} onChange={(e) => setTermo(e.target.value)} placeholder="Buscar por nome ou marca" aria-label="Buscar por nome ou marca" className="busca-linha w-full" />
              </form>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-5">
                <li>
                  <Link href="/catalogo" onClick={() => setAberto(false)} className="mono-rotulo block py-2 text-ouro hover:text-ouro-claro">
                    Tudo
                  </Link>
                </li>
                {categorias.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/catalogo/${c.slug}`} onClick={() => setAberto(false)} className="block py-2 text-[0.9375rem] font-bold text-marfim hover:text-ouro">
                      {c.nome}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href={linkWhats} target="_blank" rel="noreferrer" onClick={() => setAberto(false)} className="block py-2 text-[0.9375rem] font-bold text-marfim hover:text-ouro">
                    Correntes: pergunte
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
