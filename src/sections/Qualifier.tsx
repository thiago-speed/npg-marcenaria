import { useMemo, useState } from "react";
import { homeContent } from "../config/content";
import { ButtonLink } from "../components/ButtonLink";
import { Reveal } from "../components/Reveal";
import { getWhatsAppLinkFromQualifier } from "../lib/whatsapp";

export function Qualifier() {
  const [environment, setEnvironment] = useState("");
  const [timing, setTiming] = useState("");
  const { qualifier } = homeContent;

  const href = useMemo(
    () =>
      getWhatsAppLinkFromQualifier({
        environment: environment || undefined,
        timing: timing || undefined,
      }),
    [environment, timing],
  );

  return (
    <section className="chapter chapter-charcoal qualifier" id="contato">
      <div className="wrap qualifier-grid">
        <Reveal className="qualifier-copy">
          <h2 className="display">{qualifier.title}</h2>
        </Reveal>
        <Reveal delay={0.08} className="q-panel">
          <div className="q-block">
            <p>{qualifier.environmentLabel}</p>
            <div className="choices" role="group" aria-label="Ambiente">
              {qualifier.environments.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`choice${environment === item ? " is-on" : ""}`}
                  aria-pressed={environment === item}
                  onClick={() => setEnvironment(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="q-block">
            <p>{qualifier.timingLabel}</p>
            <div className="choices" role="group" aria-label="Previsão">
              {qualifier.timings.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`choice${timing === item ? " is-on" : ""}`}
                  aria-pressed={timing === item}
                  onClick={() => setTiming(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <ButtonLink href={href} target="_blank" rel="noreferrer">
            {qualifier.cta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
