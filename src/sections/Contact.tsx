import { homeContent } from "../config/content";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";
import { ContactQuiz } from "../components/ContactQuiz";

export function Contact() {
  const { contact } = homeContent;

  return (
    <section className="contact chapter-close" id="contato">
      <Reveal className="contact-media" from="left">
        <div className="photo-frame">
          <Photo {...contact.image} objectPosition={contact.image.objectPosition} />
        </div>
      </Reveal>
      <div className="contact-copy">
        <Reveal from="right" delay={0.1}>
          <h2 className="display">{contact.title}</h2>
          <p>{contact.body}</p>
          <ContactQuiz />
          <p className="contact-location">{contact.locationLabel}</p>
        </Reveal>
      </div>
    </section>
  );
}
