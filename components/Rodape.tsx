import Link from "next/link";
import { Letreiro, MarcaEstudio, Monograma } from "./Marca";
import { Icone } from "./Icones";
import { PREVIA, site } from "@/data/site.config";
import type { Categoria } from "@/lib/tipos";

/**
 * O rodapé preto em colunas, como o das lojas: a marca, o catálogo, o
 * atendimento e a loja. Sem endereço, sem horário fixo: o que existe é
 * o WhatsApp. No celular cada coluna vira uma sanfona fechada (details,
 * sem JS), para o rodapé não ser um rolo. A faixa de baixo leva o © e a
 * assinatura do estúdio.
 */
function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <>
      <details className="rodape-sanfona border-t border-fio sm:hidden">
        <summary className="etiqueta flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
          {titulo}
          <Icone nome="seta" className="rodape-seta h-4 w-4 text-marfim-fraco" />
        </summary>
        <div className="pb-5">{children}</div>
      </details>
      <div className="hidden sm:block">
        <h2 className="etiqueta">{titulo}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </>
  );
}
export function Rodape({
  linkWhats,
  instagram,
  categorias = [],
  horario,
}: {
  linkWhats: string;
  instagram: string;
  categorias?: Categoria[];
  horario?: string;
}) {
  return (
    <footer className="escuro mt-16 border-t border-ouro lg:mt-24">
      <div className="miolo grid gap-0 py-10 sm:grid-cols-2 sm:gap-10 sm:py-12 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-8 lg:py-16">
        <div className="pb-8 sm:pb-0">
          <Link href="/" aria-label="Picorelli Premium, página inicial" className="inline-flex items-center gap-3">
            <Monograma className="h-[3.25rem] w-[3.25rem]" />
            <Letreiro className="h-[3rem] w-auto" />
          </Link>
          <p className="mt-4 max-w-[30ch] text-[0.9375rem] text-marfim-fraco">{site.posicionamento}.</p>
        </div>

        <Bloco titulo="Catálogo">
          <ul className="flex flex-col gap-2 text-[0.9375rem]">
            <li>
              <Link href="/catalogo" className="font-bold text-marfim hover:text-ouro">
                Tudo
              </Link>
            </li>
            {categorias.map((c) => (
              <li key={c.slug}>
                <Link href={`/catalogo/${c.slug}`} className="text-marfim hover:text-ouro">
                  {c.nome}
                </Link>
              </li>
            ))}
            <li>
              <a href={linkWhats} target="_blank" rel="noreferrer" className="text-marfim hover:text-ouro">
                Correntes
              </a>
            </li>
          </ul>
        </Bloco>

        <Bloco titulo="Atendimento">
          <ul className="flex flex-col gap-2 text-[0.9375rem]">
            <li>
              <a href={linkWhats} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold text-marfim hover:text-ouro">
                <Icone nome="whats" className="h-4 w-4 text-ouro" />
                Pedido pelo WhatsApp
              </a>
            </li>
            <li className="text-marfim-fraco">Entrega em São Paulo, combinada com a loja.</li>
            {horario ? <li className="text-marfim-fraco">{horario}</li> : null}
          </ul>
        </Bloco>

        <Bloco titulo="A loja">
          <ul className="flex flex-col gap-2 text-[0.9375rem]">
            <li className="text-marfim-fraco">{site.cidade.replace(" | ", ", ")}, zona oeste.</li>
            <li>
              <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer" className="text-marfim hover:text-ouro">
                @{instagram}
              </a>
            </li>
          </ul>
        </Bloco>
      </div>

      <div className="border-t border-fio bg-carvao">
        <div className="miolo flex flex-col items-center gap-4 py-5 text-center lg:flex-row lg:justify-between lg:text-left">
          <p className="text-[0.8125rem] text-marfim-fraco">
            © {new Date().getFullYear()} Picorelli Premium, São Paulo. {PREVIA ? "Prévia da vitrine, ainda não é a loja." : ""}
          </p>
          <a
            href="https://rafaelrazeira.com.br/landing-page"
            target="_blank"
            rel="noreferrer"
            aria-label="Vitrine feita por Rafael Razeira Estúdio"
            className="flex items-center gap-3 text-marfim-fraco transition-colors hover:text-marfim"
          >
            <span className="text-[0.75rem]">vitrine por</span>
            <MarcaEstudio altura={40} />
          </a>
        </div>
      </div>
    </footer>
  );
}
