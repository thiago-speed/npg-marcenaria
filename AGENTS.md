# AGENTS.md

Antes de criar, alterar ou redesenhar qualquer interface deste projeto, leia integralmente:

1. `.agents/skills/design-taste-frontend/SKILL.md`
2. `.agents/skills/high-end-visual-design/SKILL.md`

## Hierarquia

1. `design-taste-frontend` e a autoridade principal.
2. `high-end-visual-design` e complementar (refinamento, percepcao premium, microinteracoes).
3. Identidade real do cliente (logo, cores, tipografia, fotografia, catalogo).
4. Qualidade e engenharia ja existentes neste template.
5. Decisoes proprias do agente.

Se as duas skills entrarem em conflito, siga `design-taste-frontend`.

As skills devem interpretar a marca. Nao devem substituir a marca.

Nao aplique automaticamente Double-Bezel, glass, pills, floating nav, bento ou uma estetica Awwwards. Use so quando o Design Read justificar.

## Antes de modificar o design de forma relevante

1. Leia o briefing (`BRIEFING-NOVO-SITE.md` e qualquer material do cliente).
2. Faca o Design Read em uma linha.
3. Determine `DESIGN_VARIANCE`.
4. Determine `MOTION_INTENSITY`.
5. Determine `VISUAL_DENSITY`.
6. Preserve a identidade do cliente.
7. Personalize `src/config/site.ts`, `src/config/content.ts` e `src/config/design.ts` antes de abrir dezenas de componentes.
8. Execute o pre-flight das skills antes de finalizar.

Estes dialos nao ficam fixos para todos os clientes. Cada empresa pede uma leitura diferente.

## O que este template e

Base reutilizavel para sites demonstrativos de prospeccao (moveis, marcenaria, interiores, decoracao, arquitetura).

Fluxo esperado:

1. Duplicar esta pasta.
2. Preencher `BRIEFING-NOVO-SITE.md`.
3. Trocar logo, textos, fotos, contato e identidade.
4. Ajustar preset/variantes em `src/config/design.ts`.
5. Rodar pre-flight.
6. Build e publicacao.

Objetivo: mesma engenharia e mesma qualidade, identidade visual diferente. Nao e "o mesmo site com logo trocado".

## Onde editar

- Empresa, contato, WhatsApp, redes, SEO: `src/config/site.ts`
- Textos e listas: `src/config/content.ts`
- Cores, preset, radius, density, variantes, secoes on/off: `src/config/design.ts`
- Imagens: `public/images/`
- Guia pratico: `PERSONALIZAR.md`
- Checklist: `CHECKLIST-NOVO-CLIENTE.md`
