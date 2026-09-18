import { defaultNav } from "../config/site";
import { resolvedDesign } from "../config/design";

export function getVisibleNav() {
  const { sections } = resolvedDesign();
  return defaultNav.filter((item) => sections[item.section]);
}
