import { siteConfig } from "../config/site";

type LogoProps = {
  className?: string;
  inverted?: boolean;
};

export function Logo({ className, inverted = false }: LogoProps) {
  const { empresa } = siteConfig;
  const src = inverted && empresa.logoClaro ? empresa.logoClaro : empresa.logo;

  if (src) {
    return (
      <img
        className={["logo-img", inverted ? "is-inverted" : "", className]
          .filter(Boolean)
          .join(" ")}
        src={src}
        alt={empresa.nome}
        width={40}
        height={36}
      />
    );
  }

  return (
    <span className={["logo-word", className].filter(Boolean).join(" ")}>
      {empresa.nomeCurto}
    </span>
  );
}
