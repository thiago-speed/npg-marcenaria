import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { homeContent } from "../config/content";
import type { PortfolioCategory } from "../config/types";
import { DetailLightbox } from "../components/DetailLightbox";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";

export function Projects() {
  const { projects } = homeContent;
  const categories: readonly PortfolioCategory[] = projects.categories;
  const categoryIds = [projects.featuredCategory, ...projects.pairedCategories];
  const cases = categoryIds.flatMap((id) => categories.filter((category) => category.id === id));
  const photos = cases.flatMap((category) => category.photos);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  function renderCase(category: PortfolioCategory, lead = false) {
    return (
      <Reveal key={category.id} className={`project-case ${lead ? "is-lead" : "is-pair"} ${category.photos.length === 1 ? "has-single" : ""}`}>
        <div className={`case-media ${category.photos.length > 1 ? "has-companions" : "is-single"}`}>
          {category.photos.map((photo, index) => (
            <button
              key={photo.id}
              className={`photo-frame ${index === 0 ? "case-cover" : "case-side"}`}
              type="button"
              aria-label={`Ampliar foto: ${photo.label}`}
              aria-haspopup="dialog"
              onClick={() => setSelectedIndex(photos.findIndex((item) => item.id === photo.id))}
              onDragStart={(event) => event.preventDefault()}
            >
              <Photo {...photo.image} />
            </button>
          ))}
        </div>
        <div className="case-copy">
          <p className="case-category">{category.sector}</p>
          <h3 className="display">{category.title}</h3>
          <p className="case-blurb">{category.description}</p>
        </div>
      </Reveal>
    );
  }

  return (
    <section className="projects projects-editorial" id="projetos" aria-labelledby="portfolio-title">
      <div className="wrap">
        <Reveal className="projects-head">
          <p className="projects-kicker">{projects.kicker}</p>
          <h2 className="display" id="portfolio-title">{projects.title}</h2>
        </Reveal>
        {cases[0] ? renderCase(cases[0], true) : null}
        <div className="project-pair">
          {cases.slice(1).map((category) => renderCase(category))}
        </div>
      </div>
      <AnimatePresence>
        {selectedIndex !== null && photos[selectedIndex] ? (
          <DetailLightbox
            key="portfolio-lightbox"
            item={photos[selectedIndex]}
            index={selectedIndex}
            total={photos.length}
            onClose={() => setSelectedIndex(null)}
            onNavigate={(direction) => setSelectedIndex((current) =>
              ((current ?? 0) + direction + photos.length) % photos.length,
            )}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
