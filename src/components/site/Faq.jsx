"use client";
import { useId, useState } from "react";

export default function Faq({ items = [] }) {
  const [open, setOpen] = useState(null);
  const faqId = useId();
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <div key={i} className={"faq-item" + (open === i ? " open" : "")}>
          <button type="button" id={`${faqId}-question-${i}`} className="faq-q" aria-expanded={open === i} aria-controls={`${faqId}-answer-${i}`} onClick={() => setOpen((current) => current === i ? null : i)}>
            <span>{item.q}</span>
            <span className="faq-icon" aria-hidden="true">{open === i ? "−" : "+"}</span>
          </button>
          <div id={`${faqId}-answer-${i}`} className="faq-a" role="region" aria-labelledby={`${faqId}-question-${i}`} hidden={open !== i}>{item.a}</div>
        </div>
      ))}
    </div>
  );
}
