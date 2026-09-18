import { homeContent } from "../config/content";
import type { MediaImage, Project } from "../config/types";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";

function Frame({ image, className }: { image: MediaImage; className?: string }) {
  return (
    <div className={["photo-frame", className].filter(Boolean).join(" ")}>
      <Photo {...image} objectPosition={image.objectPosition} />
    </div>
  );
}

function CaseCopy({ project }: { project: Project }) {
  return (
    <div className="case-copy">
      <p className="case-category">{project.category}</p>
      <h3 className="display">{project.title}</h3>
      <p className="case-blurb">{project.blurb}</p>
    </div>
  );
}

export function Projects() {
  const { projects } = homeContent;
  const [lead, ...rest] = projects.items;
  const pair = rest.slice(0, 2);
  const closing = rest.slice(2);

  return (
    <section className="projects" id="projetos">
      <div className="wrap">
        <Reveal className="projects-head">
          <p className="projects-kicker">{projects.kicker}</p>
          <h2 className="display">{projects.title}</h2>
        </Reveal>

        {lead ? (
          <Reveal delay={0.08} className="project-case is-lead" from="zoom">
            <div className="case-media">
              <Frame image={lead.image} className="case-cover" />
              {lead.images?.[0] ? (
                <Frame image={lead.images[0]} className="case-side" />
              ) : null}
            </div>
            <CaseCopy project={lead} />
          </Reveal>
        ) : null}

        {pair.length ? (
          <div className="project-pair">
            {pair.map((project, index) => (
              <Reveal
                key={project.id}
                delay={0.1 + index * 0.1}
                className={`project-case is-pair project-${project.id}`}
              >
                <Frame image={project.image} className="case-cover" />
                <CaseCopy project={project} />
              </Reveal>
            ))}
          </div>
        ) : null}

        {closing.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.08} className="project-case is-narrow" from="zoom">
            <Frame image={project.image} className="case-cover" />
            <CaseCopy project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
