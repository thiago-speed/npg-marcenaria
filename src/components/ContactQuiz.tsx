import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CaretRight } from "@phosphor-icons/react";
import { useState } from "react";
import { homeContent } from "../config/content";
import { isMotionEnabled } from "../lib/design";

export function ContactQuiz() {
  const { contact } = homeContent;
  const questions = contact.quiz.questions;
  const reduce = useReducedMotion() || !isMotionEnabled();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() => questions.map(() => ""));

  const total = questions.length;
  const isReview = step >= total;
  const current = questions[step];

  const choose = (option: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = option;
      return next;
    });
    setStep((value) => value + 1);
  };

  const recap = answers.filter(Boolean).join(", ");

  return (
    <div className="contact-quiz">
      <AnimatePresence mode="wait">
        {isReview ? (
          <motion.div
            key="review"
            className="contact-quiz-pane"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="contact-quiz-recap">{recap}.</p>
            <button type="button" className="btn" onClick={() => undefined}>
              {contact.cta}
              <span className="btn-icon" aria-hidden="true">
                <ArrowRight size={14} weight="light" />
              </span>
            </button>
            <button type="button" className="contact-quiz-back" onClick={() => setStep(total - 1)}>
              {contact.quiz.back}
            </button>
          </motion.div>
        ) : current ? (
          <motion.div
            key={current.id}
            className="contact-quiz-pane"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="contact-quiz-step">
              {step + 1} de {total}
            </p>
            <p className="contact-quiz-prompt">{current.prompt}</p>
            <div className="contact-quiz-options" role="group" aria-label={current.prompt}>
              {current.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`contact-quiz-option${answers[step] === option ? " is-on" : ""}`}
                  onClick={() => choose(option)}
                >
                  <span>{option}</span>
                  <CaretRight size={14} weight="light" aria-hidden="true" />
                </button>
              ))}
            </div>
            {step > 0 ? (
              <button type="button" className="contact-quiz-back" onClick={() => setStep(step - 1)}>
                {contact.quiz.back}
              </button>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
