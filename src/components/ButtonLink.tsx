import { ArrowUpRight } from "@phosphor-icons/react";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
  target,
  rel,
  onClick,
}: ButtonLinkProps) {
  const classes = ["btn", variant === "ghost" ? "btn-ghost" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} className={classes} target={target} rel={rel} onClick={onClick}>
      {children}
      <span className="btn-icon" aria-hidden="true">
        <ArrowUpRight size={14} weight="light" />
      </span>
    </a>
  );
}
