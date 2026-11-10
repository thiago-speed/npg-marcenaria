export function finishInitialLoading() {
  const overlay = document.getElementById("site-loader");
  const root = document.getElementById("root");
  if (!overlay || !root || overlay.hidden) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Use the same presentation window on every device. Asset decoding,
  // fonts and application startup must not restart or prolong that window.
  const startedAt = Number(overlay.dataset.startedAt ?? performance.now());
  const elapsed = Math.max(0, performance.now() - startedAt);
  const timeout = window.setTimeout(dismiss, reduce ? 0 : Math.max(0, 1700 - elapsed));
  let dismissed = false;

  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    window.clearTimeout(timeout);
    window.clearTimeout(Number(overlay!.dataset.failsafe));
    if (!overlay!.isConnected) return;

    overlay!.classList.add("is-leaving");
    document.documentElement.classList.remove("is-loading");
    root!.inert = false;
    root!.removeAttribute("aria-busy");
    window.setTimeout(() => overlay!.remove(), reduce ? 0 : 350);
  }
}
