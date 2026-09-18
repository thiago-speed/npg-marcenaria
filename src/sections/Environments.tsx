import { homeContent } from "../config/content";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";

export function Environments() {
  const { environments } = homeContent;

  return (
    <section className="chapter chapter-ivory chapter-light solutions" id="solucoes">
      <div className="wrap">
        <Reveal className="solutions-head">
          <h2 className="display">{environments.title}</h2>
          <p>{environments.body}</p>
        </Reveal>
        <ul className="solutions-grid">
          {environments.items.map((item, index) => (
            <li key={item.id} className={index === 0 ? "is-lead" : undefined}>
              <Reveal delay={index * 0.04}>
                <a href={item.href} className="solutions-card">
                  <div className="photo-frame">
                    <Photo {...item.image} objectPosition={item.image.objectPosition} />
                  </div>
                  <h3 className="display">{item.name}</h3>
                  <p>{item.text}</p>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
