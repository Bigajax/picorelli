import { Icone } from "./Icones";

/**
 * A faixa preta de destaque, como a do "frete grátis" das lojas, só que
 * aqui o que a Picorelli tem para prometer é o jeito de comprar: pedido
 * pelo WhatsApp em três passos, numerados em romano porque é uma
 * sequência de fato. Nada de prazo: quem combina a entrega é a loja.
 */
const PASSOS = [
  { n: "I", texto: "Escolhe a peça aqui na vitrine" },
  { n: "II", texto: "Manda a mensagem que o botão já monta" },
  { n: "III", texto: "A loja confirma, fecha o valor e combina a entrega" },
];

export function FaixaWhats({ linkWhats }: { linkWhats: string }) {
  return (
    <section aria-labelledby="titulo-faixa" className="miolo pt-14 lg:pt-20">
      <div className="escuro bloco grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_1px_minmax(0,6fr)] lg:items-center lg:gap-12 lg:p-12">
        <div className="flex items-center gap-5">
          <Icone nome="whats" className="h-12 w-12 shrink-0 text-ouro sm:h-14 sm:w-14" />
          <div>
            <h2 id="titulo-faixa" className="manchete text-[clamp(1.5rem,3.4vw,2.375rem)] text-marfim">
              Pedido pelo WhatsApp
            </h2>
            <p className="mt-1 text-[0.9375rem] text-marfim-fraco">Sem cadastro, sem carrinho, sem fila.</p>
          </div>
        </div>

        <div className="hidden h-full bg-fio lg:block" aria-hidden="true" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between lg:gap-8">
          <ol className="flex flex-col gap-2.5">
            {PASSOS.map((p) => (
              <li key={p.n} className="flex items-baseline gap-3 text-[0.9375rem] text-marfim">
                <span className="romana w-8 shrink-0 text-[1rem] text-ouro">{p.n}</span>
                {p.texto}
              </li>
            ))}
          </ol>
          <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--placa btn--placa-ouro shrink-0">
            Chamar agora
          </a>
        </div>
      </div>
    </section>
  );
}
