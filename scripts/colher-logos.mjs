/**
 * Colhe os logos das marcas do catálogo no Wikimedia Commons (só SVG),
 * para a faixa de marcas da home. Para cada marca faz uma busca na API,
 * pega o primeiro SVG cujo título pareça logo/escudo, baixa para
 * public/marcas/<slug>.svg e escreve public/marcas/logos.json com o que
 * achou e o que ficou faltando. Conferir a folha de contato depois:
 * o Commons devolve coisa errada de vez em quando.
 *
 *   node scripts/colher-logos.mjs            (todas as marcas do catálogo)
 *   node scripts/colher-logos.mjs "Nike" ... (só algumas)
 */
import fs from "node:fs/promises";
import path from "node:path";

const UA = "PicorelliPremiumVitrine/1.0 (rafaelrazeira@hotmail.com) node";
const PASTA = "public/marcas";
const API = "https://commons.wikimedia.org/w/api.php";

/* o que procurar por marca, quando o nome sozinho não basta */
const CONSULTAS = {
  Nike: ["Logo NIKE.svg", "Nike logo"],
  adidas: ["Adidas Logo.svg", "Adidas logo"],
  Boss: ["Hugo-Boss-Logo.svg", "Hugo Boss logo"],
  "Hugo Boss": ["Hugo-Boss-Logo.svg", "Hugo Boss logo"],
  Givenchy: ["Givenchy logo"],
  "Abercrombie & Fitch": ["Abercrombie & Fitch logo"],
  Hollister: [], // não existe no Commons (o que aparece é a Gilly Hicks): fica o nome em romana
  "Louis Vuitton": ["Louis Vuitton logo and wordmark.svg", "Louis Vuitton logo"],
  Versace: ["Versace-3.svg", "Versace old logo.svg"],
  Chloé: ["Chloé logo"],
  "Giorgio Armani": ["Giorgio Armani.svg"],
  Milan: ["Logo of AC Milan.svg", "AC Milan logo"],
  Barcelona: [], // escudo é protegido, não está no Commons
  Boucheron: ["Boucheron logo"],
  Bvlgari: ["Bulgari logo"],
  "Calvin Klein": ["Calvin klein logo.svg", "Calvin Klein logo"],
  "Carolina Herrera": ["Carolina Herrera logo"],
  Corinthians: [], // idem
  "Dolce & Gabbana": ["Dolce & Gabbana logo"],
  Espanha: ["Royal Spanish Football Federation logo.svg"],
  Kenzo: ["Kenzo logo"],
  "Manchester United": [], // idem
  Rabanne: ["Paco Rabanne logo", "Rabanne logo"],
  Santos: ["Santos logo.svg"],
  "São Paulo": ["Brasao do Sao Paulo Futebol Clube.svg", "São Paulo FC logo"],
  "Tommy Hilfiger": ["Tommy Hilfiger logo"],
  "Yves Saint Laurent": ["Yves Saint Laurent logo", "YSL logo"],
};

const slug = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, "e")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function api(params) {
  const url = `${API}?${new URLSearchParams({ format: "json", origin: "*", ...params })}`;
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}

async function urlDoArquivo(titulo) {
  const j = await api({ action: "query", titles: titulo, prop: "imageinfo", iiprop: "url|mime" });
  const pagina = Object.values(j.query?.pages ?? {})[0];
  const info = pagina?.imageinfo?.[0];
  if (!info || info.mime !== "image/svg+xml") return null;
  return { titulo: pagina.title, url: info.url };
}

async function procurar(consulta) {
  /* nome exato primeiro */
  if (consulta.endsWith(".svg")) {
    const r = await urlDoArquivo(`File:${consulta}`);
    if (r) return r;
  }
  const j = await api({ action: "query", list: "search", srsearch: `${consulta} filetype:drawing`, srnamespace: 6, srlimit: 10 });
  const candidatos = (j.query?.search ?? []).filter((s) => /\.svg$/i.test(s.title) && /logo|crest|escudo|wordmark|brasao|brasão/i.test(s.title));
  for (const c of candidatos) {
    const r = await urlDoArquivo(c.title);
    if (r) return r;
  }
  return null;
}

const catalogo = JSON.parse(await fs.readFile("data/catalogo.json", "utf8"));
const marcas = [...new Set(catalogo.produtos.filter((p) => p.ativo && p.marca).map((p) => p.marca))];
const pedidas = process.argv.slice(2);
const alvo = pedidas.length ? marcas.filter((m) => pedidas.includes(m)) : marcas;

await fs.mkdir(PASTA, { recursive: true });
let registro = {};
try {
  registro = JSON.parse(await fs.readFile(path.join(PASTA, "logos.json"), "utf8"));
} catch {}

for (const marca of alvo) {
  const consultas = CONSULTAS[marca] ?? [`${marca} logo`];
  if (!consultas.length) {
    console.log(`· ${marca}: sem logo de propósito, fica o nome`);
    registro[marca] = { arquivo: null };
    continue;
  }
  let achou = null;
  for (const c of consultas) {
    try {
      achou = await procurar(c);
    } catch (e) {
      console.warn(`  ${marca}: ${e.message}`);
    }
    if (achou) break;
  }
  if (!achou) {
    console.log(`✗ ${marca}: nada`);
    registro[marca] = { arquivo: null };
    continue;
  }
  const r = await fetch(achou.url, { headers: { "User-Agent": UA } });
  const svg = await r.text();
  const arquivo = `${slug(marca)}.svg`;
  await fs.writeFile(path.join(PASTA, arquivo), svg);
  registro[marca] = { arquivo, origem: achou.titulo, url: achou.url };
  console.log(`✓ ${marca}: ${achou.titulo}`);
}

await fs.writeFile(path.join(PASTA, "logos.json"), `${JSON.stringify(registro, null, 2)}\n`);
