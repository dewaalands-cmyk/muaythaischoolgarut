"use client";
import { useEffect } from "react";

export default function ScrollFX() {
  useEffect(() => {
    // 1. Scroll reveal — ALWAYS runs
    const els = document.querySelectorAll(".reveal");
    let io;
    if (els.length) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("revealed");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      els.forEach((el) => io.observe(el));
    }

    // 2. Drag-to-scroll for gallery — only if element exists
    const slider = document.querySelector(".gallery-scroll");
    let onDown, onUp, onMove;
    if (slider) {
      let isDown = false, startX = 0, scrollLeft = 0;
      onDown = (e) => { isDown = true; startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; };
      onUp = () => { isDown = false; };
      onMove = (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - slider.offsetLeft; slider.scrollLeft = scrollLeft - (x - startX) * 1.5; };
      slider.addEventListener("mousedown", onDown);
      slider.addEventListener("mouseleave", onUp);
      slider.addEventListener("mouseup", onUp);
      slider.addEventListener("mousemove", onMove, { passive: false });
    }

    return () => {
      if (io) io.disconnect();
      if (slider) {
        slider.removeEventListener("mousedown", onDown);
        slider.removeEventListener("mouseleave", onUp);
        slider.removeEventListener("mouseup", onUp);
        slider.removeEventListener("mousemove", onMove);
      }
    };
  }, []);

  return null;
}
