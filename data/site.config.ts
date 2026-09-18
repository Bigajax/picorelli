/**
 * Dados fixos do negócio. O que a dona da loja edita no dia a dia
 * (aviso do topo, frase do hero, endereço, horário, WhatsApp) vive na
 * tabela `config` e é editável em /painel/config — não aqui.
 */

/**
 * Endereço público do site — descoberto sozinho, sem precisar configurar
 * nada. Na Vercel ele cai no domínio do próprio projeto; em casa, em
 * localhost. Só vale a pena definir NEXT_PUBLIC_SITE_URL quando a loja
 * tiver domínio próprio.
 *
 * Uma variável de ambiente pode existir e estar VAZIA — e aí `??` não
 * salva, porque `""` não é `null`. Era isso que derrubava o build na
 * Vercel com `TypeError: Invalid URL, input: ''`. Aqui todo valor passa
 * por trim, só entra se tiver conteúdo, e ganha protocolo se vier sem.
 *
 * As variantes NEXT_PUBLIC_ valem também no bundle do navegador; as sem
 * prefixo só no servidor, e existem sempre na Vercel — por isso as duas
 * versões estão na fila.
 */
function resolverUrl(): string {
  const candidatos = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_URL,
  ];

  for (const bruto of candidatos) {
    const valor = bruto?.trim();
    if (!valor) continue;
    const comProtocolo = /^https?:\/\//i.test(valor) ? valor : `https://${valor}`;
    try {
      return new URL(comProtocolo).origin;
    } catch {
      // valor malformado: tenta o próximo em vez de derrubar o build
    }
  }

  return "http://localhost:3000";
}

export const site = {
  nome: "Picorelli Premium",
  marca: "Picorelli Premium",
  posicionamento: "Roupas, tênis, perfumes e correntes. Você escolhe, a gente entrega",
  cidade: "São Paulo | SP",
  /* o número do lead (o do formulário). Na prévia ele não é usado: ver PREVIA. */
  whatsapp: "5511989664408",
  /* o @ do lead; a loja não tem perfil próprio no Instagram ainda */
  instagram: "picorellii7",
  url: resolverUrl(),
  endereco: "",
  maps: "",
} as const;

/**
 * MODO PRÉVIA. Enquanto a vitrine é uma amostra, TODO botão de WhatsApp
 * aponta para o estúdio com a mesma mensagem. Quando a loja contratar:
 * PREVIA = null e o número acima passa a valer.
 */
export const PREVIA: { whatsapp: string; mensagem: string } | null = {
  whatsapp: "5544991246187",
  mensagem: "Oi! Vi a prévia da vitrine da Picorelli Premium e quero colocar no ar.",
};

/** Valores iniciais da tabela `config`. Sobrescritos pelo banco quando existirem. */
export const configPadrao: Record<string, string> = {
  whatsapp: site.whatsapp,
  instagram: site.instagram,
  cidade: site.cidade,
  /* frases separadas por "|": o cabeçalho reveza uma de cada vez */
  aviso_topo: "Pedido pelo WhatsApp, entrega em São Paulo | Perfumes importados com preço na vitrine | Tênis, camisa de time, perfume e corrente num lugar só | Correntes: pergunte no WhatsApp",
  frase_hero: "Tênis. Camisa. Perfume. Corrente.",
  endereco: "",
  horario: "",
};
