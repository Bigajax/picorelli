import Link from "next/link";

export default function NaoEncontrado() {
  return (
    <div className="mx-auto flex max-w-[86rem] items-center justify-center px-4 py-32 sm:px-6 lg:px-10">
      <div className="canto canto--grande max-w-md bg-carvao p-10 text-center">
        <p className="romana text-[0.9375rem] text-ouro">Página não encontrada</p>
        <p className="mt-3 text-sm leading-relaxed text-marfim">O endereço mudou ou a peça saiu da vitrine. Comece pelo catálogo.</p>
        <Link href="/catalogo" className="btn btn--cta mt-7">
          Ver o catálogo
        </Link>
      </div>
    </div>
  );
}
