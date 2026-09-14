import { Letreiro, MarcaEstudio, Monograma } from "./Marca";
import { PREVIA, site } from "@/data/site.config";

/** O fecho, curto: a marca, os caminhos, e a assinatura do estúdio. */
export function Rodape({ linkWhats, instagram }: { linkWhats: string; instagram: string; categorias?: unknown; horario?: string }) {
  return (
    <footer className="mt-16 border-t border-[color:var(--fio)] lg:mt-24">
      <div className="mx-auto max-w-[72rem] px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Monograma className="h-[3.5rem] w-[3.5rem]" />
            <div>
              <Letreiro className="mx-auto h-[3.25rem] w-auto sm:mx-0" />
              <p className="mt-1 text-[0.875rem] text-marfim-fraco">{site.posicionamento}.</p>
            </div>
          </div>

          <nav aria-label="Caminhos" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[0.9375rem] font-bold">
            <a href={linkWhats} target="_blank" rel="noreferrer" className="text-ouro hover:text-ouro-claro">
              WhatsApp
            </a>
            <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer" className="text-marfim hover:text-ouro">
              @{instagram}
            </a>
          </nav>
        </div>
      </div>

      <div className="border-t border-[color:var(--fio)]">
        <div className="mx-auto flex max-w-[72rem] flex-col items-center gap-4 px-4 py-5 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-10 lg:text-left">
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
