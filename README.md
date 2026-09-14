# KANTON — vitrine digital

Site público + painel da loja para a **KANTON, moda feminina** de Santos Dumont, MG.
Tênis feminino casual e esportivo, alfaiataria e multimarcas. A conversão é
**exclusivamente pelo WhatsApp** — não existe carrinho, checkout nem login de cliente.

- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Postgres, Auth e Storage)
- **Catálogo:** 44 peças reais, fotos extraídas do Instagram [@usekanton](https://instagram.com/usekanton)
- **Deploy:** pronto para Vercel

---

## Como rodar

```bash
npm install
npm run dev
```

O site sobe em `http://localhost:3000`.

Não precisa configurar nada para começar — não existe variável obrigatória.

**Sem as chaves do Supabase, o projeto roda em modo local:** lê e grava o
catálogo em `data/catalogo.json` e guarda as fotos em `public/produtos`. Serve
para desenvolver e para mostrar o site antes do banco existir. **Não serve para
produção** — a Vercel não deixa gravar em disco.

Nesse modo, a senha do painel é a de `PAINEL_SENHA_LOCAL` (padrão: `kanton`).

---

## Ligando o Supabase

1. Crie o projeto em [supabase.com](https://supabase.com).
2. Em **Project Settings › API**, copie a URL e a chave `anon` para o `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

3. No **SQL Editor**, rode os arquivos nesta ordem:
   - `supabase/migrations/0001_schema.sql` — tabelas, índices, RLS e o bucket `produtos`
   - `supabase/migrations/0002_seed.sql` — as 8 categorias, as 44 peças e a configuração

4. Reinicie o `npm run dev`. O site passa a ler do banco sozinho.

O seed aponta as fotos para `/produtos/*.webp`, que estão versionadas em
`public/`. Fotos novas enviadas pelo painel vão para o **Storage** (bucket
`produtos`, leitura pública, escrita só com sessão).

### Criando o usuário do painel

Não existe cadastro público, de propósito. O acesso é criado à mão:

**Authentication › Users › Add user** → e-mail e senha → marque **Auto Confirm User**.

Pronto: esse e-mail entra em `/painel/login`.

Para tirar o acesso de alguém, apague o usuário nessa mesma tela.

---

## Trocando o número do WhatsApp

Pelo painel, sem mexer em código: **/painel › Loja › WhatsApp**.
Escreva só números, com país e DDD — `5532991169200`.

O número entra em todos os botões do site e na mensagem que já vai preenchida
com o nome da peça e o link da página.

O valor de fábrica fica em `data/site.config.ts`; o banco (ou `data/config.json`,
no modo local) manda mais que ele.

---

## Deploy na Vercel

Importe o repositório e mande ver: **não é preciso configurar variável
nenhuma**. O endereço público é descoberto sozinho a partir do domínio que a
Vercel dá ao projeto — entra no sitemap, nas metatags e nos links do WhatsApp.

Nesse estado o site sobe completo e somente-leitura: a vitrine com as 44 peças
aparece, mas o painel não grava — o disco da Vercel é somente-leitura e o modo
local escreve em `data/catalogo.json`. Para o painel funcionar em produção,
ligue o Supabase; é a seção acima.

**Uma regra só:** na Vercel, ou a variável vai preenchida, ou não existe.
Criada e vazia é o pior caso — `NEXT_PUBLIC_SITE_URL=""` derrubava o build com
`TypeError: Invalid URL`.

---

## O painel

`/painel` — protegido por middleware; sem sessão, cai em `/painel/login`.

- **Peças:** busca, filtro por categoria, contadores, arrastar para reordenar a
  vitrine, ligar/desligar *Ativo* e *Destaque* direto na linha.
- **Nova peça / Editar:** o mesmo modal nos dois modos. Fotos com envio múltiplo,
  barra de progresso real, arrastar para reordenar (a primeira é a capa),
  categoria nova sem sair do modal, marca com autocomplete, preço com máscara em
  reais, tamanhos e cores em fichas.
- **Loja** (`/painel/config`): WhatsApp, recados da tarja do topo, frase da capa,
  endereço, horário, Instagram e cidade.

Toda imagem enviada é convertida para **WebP, no máximo 1600px, qualidade 82**,
com `blurDataURL` gerado na hora. Limite de 5MB por arquivo.

---

## Decisões que valem saber

**A moldura.** O retângulo nude do logotipo é o dispositivo do site inteiro. A
regra é uma só: *a linha é contínua e o conteúdo que a cruza a rompe* — igual ao
K e ao N atravessando o retângulo da marca. Ela aparece na abertura de seção, no
hover do card, no filtro ativo, na borda do modal e na legenda dentro das fotos.

**Nude só no escuro.** `#E9C2AE` sobre o cimento `#D9D8D4` dá **1,15:1** de
contraste — some. Por isso a moldura sobre o cimento é desenhada em **marrom
`#8A6A56`, 2px**, e o nude fica para fundo escuro: legenda sobre foto, logo do
rodapé, detalhes sobre tinta. Pelo mesmo motivo, textos pequenos usam
`--marrom-fundo` (5,1:1) e não `--marrom` (3,4:1).

**A parede é código, não foto.** Quatro camadas de `feTurbulence` convertidas em
mancha transparente (pó, veios, clareado e manchas) mais três gradientes. Cada
camada mora num pseudo-elemento `position: fixed` promovido para o compositor —
com `background-attachment: fixed` o navegador rerrasteriza as turbulências a
cada frame e a rolagem engasga.

**Tailwind v4 não tem `tailwind.config`.** Os tokens da paleta vivem em `@theme`,
dentro de `app/globals.css`. Cuidado com uma armadilha: CSS próprio declarado
depois do `@import "tailwindcss"` **ganha** das utilitárias. Foi por isso que
`.campo { width: 100% }` anulava `w-auto` — daí existir o modificador
`.campo--auto`.

**O mapa é imagem, não iframe.** `scripts/gerar-mapa.mjs` baixa os ladrilhos
do OpenStreetMap uma vez, costura, dessatura e puxa para o tom da parede,
marca a loja com a moldura da marca e compõe o crédito ao OSM na tipografia
da casa. Resultado: `public/mapa-loja.webp` (78kB) — sem botão de zoom, sem a
paleta do OSM por cima da nossa, sem requisição em tempo de execução. O
clique abre a rota no app de mapas da pessoa. Rode o script de novo só quando
o endereço da loja mudar:

```bash
node scripts/gerar-mapa.mjs
```

**Filtro em JS, não em SQL.** São dezenas de peças, não milhares: o catálogo
inteiro carrega em memória e `lib/filtro.ts` roda igual no servidor e no cliente.
Passando de umas 500 peças, mover para SQL.

**Lighthouse (mobile, build de produção).** Home 96 / 100 / 100 / 100,
catálogo 94 / 100 / 100 / 100, página de peça 99 / 100 / 96 / 100
(performance · acessibilidade · boas práticas · SEO). CLS zero nas três.

---

## Pendências antes de ir ao ar

- [ ] **Confirmar todos os preços com a loja.** Os valores em
      `data/catalogo.json` e no seed são **provisórios**, colocados para o site
      poder ser apresentado. O Instagram da KANTON não tem legenda em nenhum
      post, então não havia preço de onde tirar.
- [ ] **Endereço e horário** — estão vazios em `config`. Enquanto ficarem
      assim, a faixa "A loja" mostra só a cidade. Com endereço preenchido, o
      botão "Como chegar" passa a abrir a rota exata.
- [ ] **Logo da Olimpikus** — as outras seis marcas têm vetor
      (`public/marcas/`). A Olimpikus não tem vetor público disponível e entra
      como wordmark na fonte da casa. Tendo o SVG, é só jogar em
      `public/marcas/olimpikus.svg` e apontar em `data/marcas.ts`.
- [ ] **Tamanhos** — só uma peça tem numeração declarada (a única em que a
      própria foto trazia "34 ao 39"). O resto entra pelo painel.
- [ ] **Segunda foto por peça** — cada peça tem uma foto. O card já troca para a
      segunda no hover assim que ela existir.
- [ ] Trocar `PAINEL_SEGREDO` no ambiente de produção (só importa enquanto o
      painel roda em modo local).
- [ ] `NEXT_PUBLIC_SITE_URL` só quando a loja tiver domínio próprio. Até lá o
      site usa sozinho o domínio da Vercel. **Na Vercel, ou a variável vai
      preenchida, ou não existe** — criada e vazia derruba o build.

---

## Estrutura

```
app/
  (site)/            vitrine pública — home, catálogo, categoria, peça
  painel/            painel da loja — lista, modal, login, configuração
  api/upload/        recebe as fotos, converte para WebP e devolve a URL
components/          Moldura, Hero, Cabecalho, Rodape, Catalogo, cards…
components/painel/   lista, modal da peça, formulários
lib/
  dados.ts           lê o catálogo do Supabase ou do JSON local
  acoes.ts           server actions do painel
  filtro.ts          busca, filtros e ordenação (servidor e cliente)
  auth.ts            sessão do painel nos dois modos
data/
  catalogo.json      catálogo do modo local
  site.config.ts     dados fixos do negócio
  marcas.ts          marcas da faixa rotativa
public/
  produtos/          44 fotos em WebP
  categorias/        capas das categorias
  marcas/            logos das marcas (máscara CSS, cor da casa)
  og/                53 imagens de compartilhamento, geradas em build
  mapa-loja.webp     mapa estático da loja, na paleta da marca
  marca/             logotipo em PNG (lettering, cabeçalho e versão nude)
scripts/gerar-mapa.mjs  regera o mapa estático quando o endereço mudar
supabase/migrations/ schema com RLS + seed
_fonte/              originais do Instagram (arquivo, não vai para produção)
```
