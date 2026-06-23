"use client";
import { useState } from "react";

export default function Faq({ items = [] }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <div key={i} className={"faq-item" + (open === i ? " open" : "")}>
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.q}</span>
            <span className="faq-icon">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <div className="faq-a">{item.a}</div>}
        </div>
      ))}
    </div>
  );
}
