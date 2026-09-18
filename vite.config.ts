import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { homeContent } from "./src/config/content.ts";
import { siteConfig } from "./src/config/site.ts";

function htmlMeta() {
  return {
    name: "html-meta",
    transformIndexHtml(html: string) {
      const { seo, empresa } = siteConfig;
      let result = html
        .replaceAll("%SITE_TITLE%", seo.titulo)
        .replaceAll("%SITE_DESCRIPTION%", seo.descricao)
        .replaceAll("%SITE_KEYWORDS%", seo.keywords.join(", "))
        .replaceAll("%SITE_ROBOTS%", seo.robots)
        .replaceAll("%SITE_OG_IMAGE%", seo.imagemCompartilhamento)
        .replaceAll("%SITE_FAVICON%", empresa.favicon)
        .replaceAll("%SITE_CANONICAL%", seo.canonical)
        .replaceAll("%SITE_LOCALE%", seo.locale)
        .replaceAll("%SITE_HERO%", homeContent.hero.image.src);

      if (!seo.canonical) {
        result = result.replace(/\s*<link rel="canonical"[^>]*>/, "");
      }

      return result;
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), htmlMeta()],
});
