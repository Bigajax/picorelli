import Link from "next/link";

export type MarcaDaFaixa = { nome: string; total: number; logo: string | null };


/**
 * A faixa de marcas, logo abaixo da dobra do hero: um letreiro que
 * roda sozinho, devagar, com o logo de cada marca do catálogo nas cores
 * originais. Os logos carregam de uma vez (sem lazy): as duas cópias do
 * trilho precisam medir igual desde o primeiro quadro, senão abre um
 * buraco na emenda. Marca sem logo no
 * Commons (escudo protegido) entra com o nome em romana, no mesmo
 * tamanho. Cada logo abre a busca já filtrada. Para na mão e respeita
 * quem pediu menos movimento.
 */
export function Marcas({ marcas }: { marcas: MarcaDaFaixa[] }) {
  if (!marcas.length) return null;
  const trilho = (escondido: boolean) => (
    <ul className="letreiro-trilho" aria-hidden={escondido || undefined}>
      {marcas.map((m) => (
        <li key={m.nome} className="letreiro-item">
          <Link href={`/catalogo?busca=${encodeURIComponent(m.nome)}`} className="letreiro-link" tabIndex={escondido ? -1 : undefined} title={`${m.nome}: ${m.total} ${m.total === 1 ? "peça" : "peças"}`}>
            {m.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/marcas/${m.logo}`} alt={m.nome} className="letreiro-logo" loading="eager" decoding="sync" />
            ) : (
              <span className="romana text-[1.0625rem] text-tinta">{m.nome}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <section id="marcas" aria-label="Marcas na vitrine" className="scroll-mt-24 pt-14 lg:pt-16">
      <div className="letreiro">
        {trilho(false)}
        {trilho(true)}
      </div>
    </section>
  );
}
