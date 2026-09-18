import { homeContent } from "../config/content";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";

export function Philosophy() {
  const { philosophy } = homeContent;

  return (
    <section className="philosophy" id="sobre" aria-label="Sobre">
      <div className="philosophy-grid">
        <Reveal className="philosophy-media" from="left">
          <Photo {...philosophy.imageLeft} objectPosition={philosophy.imageLeft.objectPosition} />
        </Reveal>
        <Reveal delay={0.08} className="philosophy-copy" from="up">
          <h2 className="display">
            {philosophy.title[0]}
            <span>{philosophy.title[1]}</span>
          </h2>
          <p>{philosophy.body}</p>
          <p>{philosophy.after}</p>
        </Reveal>
        <Reveal delay={0.12} className="philosophy-media" from="right">
          <Photo {...philosophy.image} objectPosition={philosophy.image.objectPosition} />
        </Reveal>
      </div>
    </section>
  );
}
