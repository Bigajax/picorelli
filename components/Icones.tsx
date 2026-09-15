/**
 * Ícones de linha da loja, um traço fino só, no jeito dos ícones de
 * categoria das lojas de moda masculina (camiseta com manga, tênis de
 * perfil, frasco com tampa, a estrela das novidades, a grade das
 * marcas). Herdam a cor do texto; o tamanho vem da className.
 */
export type NomeIcone =
  | "novidade"
  | "camiseta"
  | "camisa"
  | "tenis"
  | "perfume"
  | "corrente"
  | "marca"
  | "lupa"
  | "whats"
  | "caminhao"
  | "conversa"
  | "etiqueta"
  | "coroa"
  | "seta"
  | "fechar";

const TRACOS: Record<Exclude<NomeIcone, "whats">, React.ReactNode> = {
  novidade: <path d="M12 3.4l2.5 5.6 6.1.6-4.6 4.1 1.4 6L12 16.6l-5.4 3.1 1.4-6-4.6-4.1 6.1-.6z" />,
  camiseta: (
    <>
      <path d="M8.6 3.8c.5 1.5 1.8 2.4 3.4 2.4s2.9-.9 3.4-2.4l5 2.2 1.1 4.3-3.3 1.1v9.1H5.8v-9.1L2.5 10.3l1.1-4.3z" />
      <path d="M9.6 3.8h4.8" />
    </>
  ),
  camisa: (
    <>
      <path d="M8.8 3.8L12 6.3l3.2-2.5 4.9 2.1 1.2 4.3-3.1.9v9.4H5.8v-9.4l-3.1-.9 1.2-4.3z" />
      <path d="M12 6.3v14.2" />
      <path d="M9.4 12.5h5.2" />
    </>
  ),
  tenis: (
    <>
      <path d="M2.6 16.2c0-1.5.9-2.4 2.5-2.7l3.2-.6c.9-.2 1.6-.6 2.2-1.3l1.8-2.2 1.7 1.2 1.9-1.3 5.4 3.1c1.3.8 1.8 1.6 1.8 3v1.2H2.6z" />
      <path d="M2.6 18.6h18.8" />
      <path d="M12.3 12.6l1.3 1.2M14.6 11.3l1.3 1.2M16.9 10.6l1.1 1" />
      <path d="M6.2 13.4c1 .6 2 1.4 2.8 2.6" />
    </>
  ),
  perfume: (
    <>
      <path d="M9.6 2.8h4.8v3H9.6z" />
      <path d="M10.6 5.8h2.8v1.9h-2.8z" />
      <path d="M8.4 7.7h7.2c.9 0 1.6.7 1.6 1.6v9.2c0 1.5-1.2 2.7-2.7 2.7H9.5c-1.5 0-2.7-1.2-2.7-2.7V9.3c0-.9.7-1.6 1.6-1.6z" />
      <path d="M9.4 13.3h5.2" />
      <path d="M14.4 3.4l2.4-1.2" />
    </>
  ),
  corrente: (
    <>
      <path d="M10.3 13.7a3.7 3.7 0 0 1 0-5.2l2.1-2.1a3.7 3.7 0 0 1 5.2 5.2l-1.1 1.1" />
      <path d="M13.7 10.3a3.7 3.7 0 0 1 0 5.2l-2.1 2.1a3.7 3.7 0 0 1-5.2-5.2l1.1-1.1" />
    </>
  ),
  marca: (
    <>
      <path d="M3.8 3.8h6.7v6.7H3.8zM13.5 3.8h6.7v6.7h-6.7zM3.8 13.5h6.7v6.7H3.8zM13.5 13.5h6.7v6.7h-6.7z" />
    </>
  ),
  lupa: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </>
  ),
  caminhao: (
    <>
      <path d="M3 6.5h11v10H3zM14 10h4l3 3v3.5h-7z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  conversa: (
    <>
      <path d="M4 5.5h16v10H9l-4 3.5z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  etiqueta: (
    <>
      <path d="M4 12.5V5h7.5l8.5 8.5-7.5 7.5z" />
      <path d="M8 9h.01" />
      <path d="M12 15l2.5-2.5" />
    </>
  ),
  coroa: (
    <>
      <path d="M4 17.5L3 7.5l5 4 4-6 4 6 5-4-1 10z" />
      <path d="M5 20h14" />
    </>
  ),
  seta: <path d="M9.5 6l6 6-6 6" />,
  fechar: <path d="M6 6l12 12M18 6L6 18" />,
};

export function Icone({ nome, className = "h-6 w-6", peso = 1.35 }: { nome: NomeIcone; className?: string; peso?: number }) {
  if (nome === "whats") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.2 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.9c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1 1 12 20.1zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2c.2-.6.2-1.1.2-1.2-.1-.2-.3-.3-.5-.4z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth={peso} strokeLinecap="round" strokeLinejoin="round">
      {TRACOS[nome]}
    </svg>
  );
}
