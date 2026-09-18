import { designConfig, presetTokens, resolvedDesign } from "../config/design";

export function applyDesign() {
  const design = resolvedDesign();
  const root = document.documentElement;
  const tokens = { ...presetTokens[design.preset] };

  if (design.density === "regular") {
    tokens["--section-y"] = "4.25rem";
  }
  if (design.density === "airy") {
    tokens["--section-y"] = tokens["--section-y"] || "7.5rem";
  }
  if (design.radius === "soft") {
    tokens["--radius"] = "12px";
    tokens["--radius-media"] = "12px";
  }
  if (design.radius === "sharp") {
    tokens["--radius"] = tokens["--radius"] || "4px";
    tokens["--radius-media"] = tokens["--radius-media"] || "4px";
  }

  if (designConfig.colors.accent) {
    tokens["--color-accent"] = designConfig.colors.accent;
    tokens["--color-accent-strong"] = designConfig.colors.accent;
    tokens["--color-bronze"] = designConfig.colors.accent;
    if (!designConfig.colors.signal) {
      tokens["--color-signal"] = designConfig.colors.accent;
    }
  }
  if (designConfig.colors.signal) {
    tokens["--color-signal"] = designConfig.colors.signal;
  }

  Object.entries(tokens).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  root.dataset.preset = design.preset;
  root.dataset.radius = design.radius;
  root.dataset.density = design.density;
  root.dataset.hero = design.hero;
  root.dataset.products = design.products;
  root.dataset.projects = design.projects;
  root.dataset.motion =
    design.motion.enabled && design.motion.intensity > 3 ? "on" : "off";
}

export function isMotionEnabled() {
  const design = resolvedDesign();
  return design.motion.enabled && design.motion.intensity > 3;
}
