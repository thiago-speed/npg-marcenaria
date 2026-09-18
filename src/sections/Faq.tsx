import { CaretDown } from "@phosphor-icons/react";
import { useId, useState } from "react";
import { homeContent } from "../config/content";
import { Reveal } from "../components/Reveal";

export function Faq() {
  const [openId, setOpenId] = useState(homeContent.faq.items[0]?.id ?? "");
  const baseId = useId();

  return (
    <section className="chapter chapter-ivory chapter-light faq" id="faq">
      <div className="wrap faq-grid">
        <Reveal>
          <h2 className="display">{homeContent.faq.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="faq-list">
            {homeContent.faq.items.map((item) => {
              const expanded = openId === item.id;
              const panelId = `${baseId}-${item.id}`;
              return (
                <div key={item.id} className="faq-item">
                  <h3>
                    <button
                      type="button"
                      className="faq-trigger"
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => setOpenId(expanded ? "" : item.id)}
                    >
                      <span>{item.question}</span>
                      <CaretDown size={18} weight="light" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    className="faq-panel"
                    hidden={!expanded}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
