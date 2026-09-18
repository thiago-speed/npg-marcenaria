import { homeContent } from "../config/content";
import type { MediaImage } from "../config/types";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";

function Frame({ image, className }: { image: MediaImage; className?: string }) {
  return (
    <div className={["photo-frame", className].filter(Boolean).join(" ")}>
      <Photo {...image} objectPosition={image.objectPosition} />
    </div>
  );
}

export function Materiality() {
  const { materiality } = homeContent;

  return (
    <section className="materiality" aria-label="Materialidade">
      <div className="wrap">
        <Reveal className="materiality-head">
          <h2 className="display">{materiality.title}</h2>
          <p className="materiality-lead">{materiality.body}</p>
        </Reveal>
        <div className="materiality-gallery">
          {materiality.items.map((item, index) =>
            item.detail ? (
              <Reveal
                key={item.id}
                delay={index * 0.09}
                className="materiality-compose-item"
                from="zoom"
              >
                <figure>
                  <div className="materiality-compose">
                    <Frame image={item.image} className="photo-main" />
                    <div className="photo-side-shell">
                      <Frame image={item.detail} className="photo-side" />
                    </div>
                  </div>
                  <figcaption>{item.label}</figcaption>
                </figure>
              </Reveal>
            ) : (
              <Reveal
                key={item.id}
                delay={index * 0.09}
                className={`materiality-item is-${item.id}`}
                from="zoom"
              >
                <figure>
                  <Frame image={item.image} />
                  <figcaption>{item.label}</figcaption>
                </figure>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
