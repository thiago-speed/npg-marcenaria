import { homeContent } from "../config/content";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";

export function Transition() {
  const { transition } = homeContent;

  return (
    <section className="chapter chapter-ivory chapter-light" aria-label="Manifesto">
      <div className="wrap transition-block">
        <Reveal className="transition-copy">
          <p className="brand-word">
            <span>{transition.kicker}.</span>
          </p>
          <h2 className="display">
            {transition.title[0]}
            <span>{transition.title[1]}</span>
          </h2>
          <p className="lede">{transition.body}</p>
        </Reveal>
        <Reveal delay={0.08} className="transition-photo">
          <div className="photo-frame">
            <Photo {...transition.image} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
