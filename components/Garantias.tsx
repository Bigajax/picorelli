import { Icone, type NomeIcone } from "./Icones";

/**
 * As garantias, logo abaixo do banner, como a faixa das lojas, só que
 * na gramática da Picorelli: quatro placas brancas chanfradas penduradas
 * na borda do banner, o ícone de linha em ouro, o que é em romana, uma
 * linha explicando. No celular as quatro cabem numa placa só, em duas
 * colunas, centradas como nas lojas: ocupa um terço da altura de antes. Só o que a loja cumpre de fato: nada de prazo, nada
 * de "envio para o Brasil".
 */
const ITENS: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: "conversa", titulo: "Pedido pelo WhatsApp", texto: "sem cadastro, sem carrinho" },
  { icone: "caminhao", titulo: "Entrega em São Paulo", texto: "a loja combina com você" },
  { icone: "etiqueta", titulo: "Perfumes com preço", texto: "o resto você pergunta" },
  { icone: "coroa", titulo: "Só peça premium", texto: "roupa, tênis, perfume e corrente" },
];

export function Garantias() {
  return (
    <section aria-label="Como a loja funciona" className="miolo relative z-10 lg:-mt-9">
      {/* celular: uma placa só, duas colunas, centrado */}
      <ul className="placa-bloco mt-4 grid grid-cols-2 gap-x-3 gap-y-5 border border-linha bg-white px-3 py-5 shadow-[0_18px_40px_-24px_rgba(10,10,10,0.45)] sm:hidden">
        {ITENS.map((i) => (
          <li key={i.titulo} className="flex flex-col items-center gap-1.5 text-center">
            <Icone nome={i.icone} className="h-7 w-7 text-ouro-texto" peso={1.4} />
            <span className="romana text-[0.6875rem] leading-tight text-tinta">{i.titulo}</span>
            <span className="text-[0.75rem] leading-snug text-tinta-fraca">{i.texto}</span>
          </li>
        ))}
      </ul>
      {/* tablet e desktop: uma placa por garantia */}
      <ul className="hidden grid-cols-2 gap-3 pt-4 sm:grid lg:grid-cols-4 lg:gap-4 lg:pt-0">
        {ITENS.map((i) => (
          <li key={i.titulo} className="placa-bloco flex items-center gap-4 border border-linha bg-white px-5 py-4 shadow-[0_18px_40px_-24px_rgba(10,10,10,0.45)] lg:gap-5 lg:px-6 lg:py-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ouro/50 text-ouro-texto">
              <Icone nome={i.icone} className="h-6 w-6" peso={1.4} />
            </span>
            <span className="min-w-0">
              <span className="romana block text-[0.8125rem] text-tinta">{i.titulo}</span>
              <span className="mt-1 block text-[0.8125rem] leading-snug text-tinta-fraca">{i.texto}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
