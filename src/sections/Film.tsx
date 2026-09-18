import type { FilmVideo } from "../config/types";
import { homeContent } from "../config/content";
import { Reveal } from "../components/Reveal";
import { VideoPoster } from "../components/VideoPoster";

type FilmProps = {
  onPlay: (video: FilmVideo) => void;
};

export function Film({ onPlay }: FilmProps) {
  const video = homeContent.videos.film;
  if (!video.src) return null;

  return (
    <section className="chapter chapter-ivory chapter-light film" aria-label="Em movimento">
      <div className="wrap film-grid">
        <Reveal>
          <VideoPoster video={video} onPlay={() => onPlay(video)} />
        </Reveal>
        <Reveal delay={0.08} className="film-copy">
          <h2 className="display">
            {homeContent.film.title[0]}
            <span>{homeContent.film.title[1]}</span>
          </h2>
          <p>{homeContent.film.text}</p>
        </Reveal>
      </div>
    </section>
  );
}
