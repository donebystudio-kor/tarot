"use client";

import { useEffect, useRef } from "react";

export default function StarBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const count = 80;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 2 + 1;
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        --duration: ${Math.random() * 4 + 2}s;
        --delay: ${Math.random() * 4}s;
        --max-opacity: ${Math.random() * 0.6 + 0.2};
      `;
      fragment.appendChild(star);
    }

    container.appendChild(fragment);
    return () => { container.innerHTML = ""; };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
