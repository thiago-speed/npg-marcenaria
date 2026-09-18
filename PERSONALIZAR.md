# PERSONALIZAR.md

Guia pratico para clonar este template e montar o site de um cliente. Na maior parte dos casos voce edita so:

1. `src/config/site.ts`
2. `src/config/content.ts`
3. `src/config/design.ts`
4. Arquivos em `public/images/`
5. `BRIEFING-NOVO-SITE.md`

Nao e necessario abrir 15 componentes para trocar nome, telefone, WhatsApp, textos ou fotos.

---

## Alterar nome

Arquivo:

```text
src/config/site.ts
```

Campos:

```text
empresa.nome
empresa.nomeCurto
```

`nomeCurto` aparece no manifesto, no wordmark (quando nao ha logo) e em marcas de capitulo.

Tambem atualize SEO em `site.seo.titulo`.

---

## Alterar logo

1. Coloque o arquivo em `public/images/branding/logo.png` (ou `.svg` / `.webp`).
2. Se existir versao clara, use `public/images/branding/logo-light.png`.

Arquivo:

```text
src/config/site.ts
```

Campos:

```text
empresa.logo
empresa.logoClaro
```

Exemplo:

```ts
logo: "/images/branding/logo.png",
logoClaro: "/images/branding/logo-light.png",
```

Se `logo` ficar vazio, o header e o footer usam o wordmark tipografico com `empresa.nomeCurto`.

Favicon:

```text
public/favicon.png
empresa.favicon
```

---

## Alterar telefone

Arquivo:

```text
src/config/site.ts
```

Campos:

```text
contato.telefone          // exibicao: (00) 00000-0000
contato.telefoneDigitos   // so numeros, com DDI: 5500000000000
```

---

## Alterar WhatsApp

Arquivo:

```text
src/config/site.ts
```

Campo:

```text
contato.whatsapp          // 5500000000000
contato.mensagemPadrao
```

Nao cole URLs `wa.me` nos componentes. Use:

```ts
import { getWhatsAppLink } from "../lib/whatsapp";

getWhatsAppLink();
getWhatsAppLink("Ola! Gostaria de saber mais sobre cozinhas planejadas.");
```

A funcao central esta em `src/lib/whatsapp.ts`.

Mensagens ja ligadas ao conteudo:

- Hero secundario: `homeContent.hero.secondaryCta.mensagem` em `src/config/content.ts`
- Qualifier: monta ambiente + prazo em cima da mensagem padrao

---

## Alterar email

Arquivo:

```text
src/config/site.ts
```

Campo:

```text
contato.email
```

O rodape so exibe o email se o campo nao estiver vazio. Nao existe backend de formulario neste template.

---

## Alterar endereco

Arquivo:

```text
src/config/site.ts
```

Campos:

```text
contato.endereco
contato.bairro
contato.cidade
contato.estado
contato.cep
contato.mapsUrl
```

Se `mapsUrl` ficar vazio, o site monta a busca do Google Maps com o endereco.

Showroom (titulo e texto da secao): `src/config/content.ts` em `showroom`.

Campo opcional de shopping/referencia:

```text
showroom.mall
```

---

## Alterar cores

Arquivo:

```text
src/config/design.ts
```

Caminho rapido (uma cor da marca):

```ts
colors: {
  accent: "#334A3D",
  signal: "#334A3D",
},
```

`accent` entra em botoes, marcas e bronze. `signal` entra na palavra do manifesto, hovers de rede e escolha ativa do qualifier.

Caminho completo: troque o `preset` (isso troca a paleta inteira) e, se precisar, os tokens em `presetTokens`.

Nao espalhe hex da marca pelos componentes. Os tokens vivem no CSS (`src/styles/global.css`) e sao aplicados em `src/lib/design.ts`.

---

## Alterar hero

Arquivo de texto:

```text
src/config/content.ts  ->  hero
```

Campos:

```text
hero.lines
hero.subtext
hero.image
hero.primaryCta
hero.secondaryCta
```

Arquivo da foto:

```text
public/images/hero/hero.jpg
```

Layout do hero:

```text
src/config/design.ts  ->  hero: "media" | "split"
```

- `media`: fotografia full-bleed com texto sobreposto (padrao architectural)
- `split`: texto de um lado, imagem do outro (padrao contemporary)

Headline: no maximo 2 linhas. Subtexto: no maximo 20 palavras.

---

## Alterar produtos

Neste template, produtos = ambientes.

Arquivo:

```text
src/config/content.ts  ->  environments.items
```

Cada item:

```text
id, name, index, text, body, href, layout, image, secondary?
```

Layouts de `signature`:

```text
split     // texto + foto
bleed     // foto full-bleed com texto sobreposto
overlap   // duas fotos com recorte
overlay   // foto com texto sobre fundo escuro
```

Fotos:

```text
public/images/produtos/
```

Grade alternativa:

```text
src/config/design.ts  ->  products: "showcase"
```

---

## Alterar projetos

Arquivo:

```text
src/config/content.ts  ->  projects.items
```

Marque um item com `featured: true` para ocupar a largura toda no layout `editorial`.

Fotos:

```text
public/images/projetos/
```

Layout:

```text
src/config/design.ts  ->  projects: "editorial" | "grid"
```

---

## Alterar galeria

Nao ha uma secao de galeria separada ligada por padrao. Use:

- Projetos (`projects`)
- Ambientes (`environments`)
- Pasta `public/images/galeria/` para extras e futuras secoes

Para uma galeria extra, ligue uma secao existente ou acrescente itens em `projects.items`.

---

## Alterar redes sociais

Arquivo:

```text
src/config/site.ts  ->  redesSociais
```

Campos:

```text
instagram
instagramHandle
facebook
linkedin
pinterest
```

Deixe vazio para ocultar o link. O footer e o showroom so renderizam redes preenchidas.

---

## Ocultar secao

Arquivo:

```text
src/config/design.ts  ->  sections
```

```ts
sections: {
  hero: true,
  transition: true,
  environments: true,
  philosophy: true,
  projects: true,
  film: false,
  commercial: false,
  proof: true,
  faq: false,
  showroom: true,
  qualifier: true,
}
```

`false` remove a secao da pagina e da navegacao, sem apagar o codigo.

Para video (`film` / `commercial`), alem de ligar a secao, preencha `homeContent.videos.*.src` em `content.ts`.

---

## Alterar SEO

Arquivo:

```text
src/config/site.ts  ->  seo
```

Campos:

```text
titulo
descricao
keywords
canonical
robots
imagemCompartilhamento
```

O `index.html` e preenchido na build a partir deste objeto. Schema.org (`FurnitureStore`) sai de `src/lib/seo.ts` usando os mesmos dados.

---

## Trocar preset visual

Arquivo:

```text
src/config/design.ts
```

```ts
preset: "architectural" | "contemporary" | "industrial"
```

O que cada preset define por padrao:

| Preset | Radius | Density | Hero | Ambientes | Projetos | Leitura |
| --- | --- | --- | --- | --- | --- | --- |
| architectural | sharp | airy | media | signature | editorial | capitulos, serif display, fotografia |
| contemporary | soft | airy | split | showcase | editorial | mais claro, sans no display, um acento |
| industrial | sharp | regular | media | showcase | grid | mais denso, um acento, cantos vivos |

Para forcar uma chave fora do preset:

```ts
preset: "architectural",
hero: "split",
```

Motion:

```ts
motion: {
  enabled: true,
  intensity: 5,
}
```

`intensity <= 3` ou `enabled: false` desliga animacoes automaticas (o site ainda respeita `prefers-reduced-motion`).

---

## Personalizacao visual com as Design Skills

Localizacao:

```text
.agents/skills/design-taste-frontend
.agents/skills/high-end-visual-design
```

Prioridade: `design-taste-frontend` manda. `high-end-visual-design` refina. A identidade do cliente manda sobre sugestao generica de estetica.

Como fornecer briefing: preencha `BRIEFING-NOVO-SITE.md` e anexe logo, paleta, fotos e referencias. Nao peca "deixe premium" sem contexto.

Como fornecer referencias: URLs de sites que o cliente gosta e de concorrentes, com o que copiar e o que evitar.

O que e `DESIGN_VARIANCE` (1-10): simetria previsivel versus composicao assimetrica. Moveis premium costumam ficar em 6-8. Nao deixe 8 para todo mundo.

O que e `MOTION_INTENSITY` (1-10): estatico versus cinematico. Este template nasceu em torno de 5 (reveal, hover, menu). Suba so se o briefing pedir.

O que e `VISUAL_DENSITY` (1-10): galeria arejada versus pagina compacta. Fotografia de interiores trabalha melhor em 3-4.

Como solicitar um redesign: diga se e Preserve (manter estrutura, adaptar identidade) ou Overhaul (nova linguagem visual sobre a mesma engenharia). Para prospeccao, o padrao e Preserve da base + variacao real de composicao.

Como evitar clones: troque preset e variantes, tipografia via tokens, ritmo das secoes (ligar/desligar), crops e fotografia, hero `media` vs `split`, ambientes `signature` vs `showcase`. Nao entregue so logo + cor.

Exemplo de prompt para um agente:

```text
Use o template existente para criar o site da Silva Moveis.

Leia primeiro:

.agents/skills/design-taste-frontend
.agents/skills/high-end-visual-design

Empresa:
Silva Moveis

Segmento:
Moveis planejados premium.

Publico:
Casais de 30-55 anos e arquitetos.

Identidade:
Logo preto.
Fotografia arquitetonica clara.
Madeira natural.

Direcao:
Contemporanea.
Arquitetonica.
Sofisticada.
Fotografia como protagonista.

Evite:
Aparencia de ecommerce.
Glassmorphism excessivo.
Layout com cara de startup.

DESIGN_VARIANCE: 7
MOTION_INTENSITY: 5
VISUAL_DENSITY: 3

Preserve a base tecnica, mas adapte composicao, tipografia, imagens, ritmo e layouts para que nao pareca apenas uma troca de marca.
```

Depois do prompt, o agente deve:

1. Preencher `src/config/site.ts` e `src/config/content.ts`
2. Ajustar `src/config/design.ts` (preset + variantes)
3. Trocar as fotos em `public/images/`
4. Rodar o pre-flight das skills
5. `npm run build`
