import { siteConfig } from "../config/site";

type ChapterMarkProps = {
  index: string;
  label?: string;
};

export function ChapterMark({ index, label }: ChapterMarkProps) {
  return (
    <p className="chapter-mark">
      <span>
        {siteConfig.empresa.nomeCurto} / {index}
      </span>
      {label ? <span className="chapter-mark-label">{label}</span> : null}
    </p>
  );
}
