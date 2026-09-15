import fs from "node:fs";
import path from "node:path";

/**
 * Os logos colhidos por scripts/colher-logos.mjs: o registro diz, para
 * cada marca do catálogo, o arquivo em public/marcas (ou null, quando o
 * logo não existe e a faixa mostra o nome).
 */
export type RegistroLogos = Record<string, { arquivo: string | null; origem?: string }>;

let cache: RegistroLogos | null = null;

export function lerLogos(): RegistroLogos {
  if (cache) return cache;
  try {
    cache = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", "marcas", "logos.json"), "utf8")) as RegistroLogos;
  } catch {
    cache = {};
  }
  return cache;
}
