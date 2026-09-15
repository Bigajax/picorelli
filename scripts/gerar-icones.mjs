/**
 * Gera o favicon e a imagem de compartilhamento a partir da marca:
 *   app/icon.png (512), app/apple-icon.png (180): só o monograma R no
 *   quadrado aberto, que é o que se lê em 16px; a logo inteira virava
 *   um borrão.
 *   public/og/site.jpg (1200x630): o que aparece no WhatsApp e nas redes
 *   quando alguém manda o link: monograma e letreiro sobre o preto da
 *   logo, com um fio de ouro embaixo.
 *
 *   node scripts/gerar-icones.mjs
 */
import sharp from "sharp";

const PRETO = "#000000"; /* os PNGs da marca têm fundo preto puro: o canvas tem que ser o mesmo, senão aparece a caixa */
const OURO = "#c9a227";

async function icone(tamanho, destino) {
  const miolo = Math.round(tamanho * 0.78);
  const r = await sharp("public/marca/monograma.png").resize(miolo, miolo, { fit: "inside" }).toBuffer();
  await sharp({ create: { width: tamanho, height: tamanho, channels: 3, background: PRETO } })
    .composite([{ input: r, gravity: "center" }])
    .png()
    .toFile(destino);
  console.log(destino, tamanho);
}

async function og() {
  const L = 1200, A = 630;
  const mono = await sharp("public/marca/monograma.png").resize(300, 300).toBuffer();
  const letreiro = await sharp("public/marca/letreiro.png").resize({ height: 240 }).toBuffer();
  const { width: lw } = await sharp(letreiro).metadata();
  const folga = 48;
  const total = 300 + folga + lw;
  const x0 = Math.round((L - total) / 2);
  const fio = Buffer.from(`<svg width="${L}" height="${A}"><rect x="${x0}" y="${A / 2 + 190}" width="${total}" height="2" fill="${OURO}"/></svg>`);
  await sharp({ create: { width: L, height: A, channels: 3, background: PRETO } })
    .composite([
      { input: mono, left: x0, top: Math.round(A / 2 - 150) },
      { input: letreiro, left: x0 + 300 + folga, top: Math.round(A / 2 - 120) },
      { input: fio, left: 0, top: 0 },
    ])
    .jpeg({ quality: 92 })
    .toFile("public/og/site.jpg");
  console.log("public/og/site.jpg", L, A);
}

await icone(512, "app/icon.png");
await icone(180, "app/apple-icon.png");
await og();
