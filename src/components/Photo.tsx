import type { MediaImage } from "../config/types";

type PhotoProps = MediaImage & {
  className?: string;
  priority?: boolean;
  objectPosition?: string;
};

export function Photo({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  objectPosition,
}: PhotoProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      style={objectPosition ? { objectPosition } : undefined}
    />
  );
}
