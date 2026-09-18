import { homeContent } from "../config/content";
import { Reveal } from "../components/Reveal";

export function Intro() {
  const { intro, brandMark } = homeContent;

  return (
    <section className="intro" aria-label="Marca">
      <div className="wrap intro-block">
        <Reveal from="zoom">
          <img
            className="intro-lockup"
            src={brandMark.image.src}
            alt={brandMark.image.alt}
            width={brandMark.image.width}
            height={brandMark.image.height}
            decoding="async"
          />
        </Reveal>
        <Reveal delay={0.16}>
          <p className="intro-line">{intro.text}</p>
        </Reveal>
      </div>
    </section>
  );
}
