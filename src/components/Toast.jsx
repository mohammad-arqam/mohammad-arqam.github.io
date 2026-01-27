import React, { useEffect } from "react";

export default function Toast({ show, text, onHide }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onHide, 1800);
    return () => clearTimeout(t);
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="rounded-full border border-zinc-700/60 bg-zinc-950 px-4 py-2 text-sm text-zinc-200 shadow-xl">
        {text}
      </div>
    </div>
  );
}
