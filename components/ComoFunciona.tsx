/**
 * A loja não tem balcão: é a zona oeste de São Paulo pelo WhatsApp. Em
 * vez de mapa, o caminho em três passos, numerados em romano porque é
 * de fato uma sequência. Nada de prazo prometido: quem combina é a loja.
 */
const PASSOS = [
  { n: "I", titulo: "Escolhe", texto: "Pelo catálogo ou pela porta que te interessa. Sem cadastro." },
  { n: "II", titulo: "Chama", texto: "O botão da peça já monta a mensagem com o que você escolheu. É só mandar." },
  { n: "III", titulo: "Recebe", texto: "A loja confirma se tem, fecha o valor e combina a entrega com você." },
];

export function ComoFunciona({ linkWhats }: { linkWhats: string }) {
  return (
    <section aria-labelledby="titulo-como-funciona" className="mx-auto max-w-[72rem] px-4 pt-14 sm:px-6 lg:px-10 lg:pt-20">
      <div className="canto canto--grande bg-carvao p-6 sm:p-10 lg:p-14">
        <div className="mx-auto max-w-[36rem] text-center">
          <h2 id="titulo-como-funciona" className="secao">
            Como funciona
          </h2>
          <p className="manchete mt-3 text-[clamp(1.375rem,3vw,2rem)] text-marfim">Sem loja física. Sem fila.</p>
          <p className="falada mt-3 text-[1rem] text-marfim-fraco">A Picorelli atende pelo WhatsApp e entrega em São Paulo. Você fala com quem vende.</p>
        </div>

        <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:mt-12">
          {PASSOS.map((p) => (
            <li key={p.n} className="text-center sm:text-left">
              <p className="romana text-[1.75rem] text-ouro">{p.n}</p>
              <h3 className="romana mt-3 text-[0.9375rem] text-marfim">{p.titulo}</h3>
              <p className="falada mx-auto mt-2 max-w-[28ch] text-[0.9375rem] text-marfim-fraco sm:mx-0">{p.texto}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center lg:mt-12">
          <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--cta w-full sm:w-auto">
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
