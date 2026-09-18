import { Play } from "@phosphor-icons/react";
import type { FilmVideo } from "../config/types";

type VideoPosterProps = {
  video: FilmVideo;
  onPlay: () => void;
};

export function VideoPoster({ video, onPlay }: VideoPosterProps) {
  return (
    <div className="video-shell">
      <img
        src={video.poster}
        alt=""
        width={video.width}
        height={video.height}
        loading="lazy"
        decoding="async"
      />
      <button className="play-btn" type="button" onClick={onPlay}>
        <span className="sr-only">Reproduzir {video.title}</span>
        <Play size={20} weight="fill" aria-hidden="true" />
      </button>
    </div>
  );
}
