import type { FilmVideo } from "../config/types";
import { homeContent } from "../config/content";
import { Reveal } from "../components/Reveal";
import { VideoPoster } from "../components/VideoPoster";

type CommercialProps = {
  onPlay: (video: FilmVideo) => void;
};

export function Commercial({ onPlay }: CommercialProps) {
  const video = homeContent.videos.commercial;
  if (!video.src) return null;

  return (
    <section className="chapter chapter-charcoal commercial" aria-label="Vídeo comercial">
      <div className="wrap">
        <Reveal>
          <h2 className="display">
            {homeContent.commercial.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="commercial-media">
          <VideoPoster video={video} onPlay={() => onPlay(video)} />
        </Reveal>
      </div>
    </section>
  );
}
