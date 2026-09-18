import { resolvedDesign } from "./config/design";
import { Grain } from "./components/Grain";
import { Seo } from "./components/Seo";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { SmoothScroll } from "./components/SmoothScroll";
import { Atmosphere } from "./sections/Atmosphere";
import { Contact } from "./sections/Contact";
import { Execution } from "./sections/Execution";
import { Hero } from "./sections/Hero";
import { Intro } from "./sections/Intro";
import { Materiality } from "./sections/Materiality";
import { Philosophy } from "./sections/Philosophy";
import { Projects } from "./sections/Projects";
import { Proof } from "./sections/Proof";

export default function App() {
  const { sections } = resolvedDesign();

  return (
    <SmoothScroll>
      <Seo />
      <a className="skip" href="#topo">
        Ir para o conteúdo
      </a>
      <Grain />
      <SiteHeader />
      <main>
        {sections.hero ? <Hero /> : null}
        {sections.intro ? <Intro /> : null}
        {sections.projects ? <Projects /> : null}
        {sections.materiality ? <Materiality /> : null}
        {sections.execution ? <Execution /> : null}
        {sections.philosophy ? <Philosophy /> : null}
        {sections.proof ? <Proof /> : null}
        {sections.atmosphere ? <Atmosphere /> : null}
        {sections.contact ? <Contact /> : null}
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}
