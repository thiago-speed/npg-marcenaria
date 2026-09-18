import { homeContent } from "../config/content";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";

export function Execution() {
  const { photos, notes } = homeContent.execution;

  return (
    <section className="execution" id="execucao" aria-label="Fabricação">
      <div className="execution-grid">
        <Reveal className="execution-shot" from="left">
          <Photo {...photos[0]} objectPosition={photos[0].objectPosition} />
        </Reveal>
        <Reveal delay={0.08} className="execution-copy" from="up">
          <h2 className="display">{notes[0].title}</h2>
          <p>{notes[0].body}</p>
        </Reveal>
        <Reveal delay={0.12} className="execution-shot" from="up">
          <Photo {...photos[1]} objectPosition={photos[1].objectPosition} />
        </Reveal>
        <Reveal delay={0.16} className="execution-copy" from="up">
          <h2 className="display">{notes[1].title}</h2>
          <p>{notes[1].body}</p>
        </Reveal>
        <Reveal delay={0.2} className="execution-shot" from="right">
          <Photo {...photos[2]} objectPosition={photos[2].objectPosition} />
        </Reveal>
      </div>
    </section>
  );
}
