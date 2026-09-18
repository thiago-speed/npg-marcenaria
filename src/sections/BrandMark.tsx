import { homeContent } from "../config/content";
import { Reveal } from "../components/Reveal";

export function BrandMark() {
  const { brandMark } = homeContent;

  return (
    <section className="brand-lockup" aria-label="Marca NPG">
      <div className="wrap">
        <Reveal>
          <img
            className="brand-lockup-image"
            src={brandMark.image.src}
            alt={brandMark.image.alt}
            width={brandMark.image.width}
            height={brandMark.image.height}
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>
    </section>
  );
}
