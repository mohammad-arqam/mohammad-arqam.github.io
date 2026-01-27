import React, { useEffect, useMemo, useState } from "react";

export default function CommandPalette({ open, onClose, actions }) {
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s
      ? actions.filter((a) =>
          (a.label + " " + (a.hint || "")).toLowerCase().includes(s)
        )
      : actions;
  }, [q, actions]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 backdrop-blur-sm">
      <div className="w-[92vw] max-w-xl overflow-hidden rounded-2xl border border-zinc-700/60 bg-zinc-950 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command… (e.g., projects, contact)"
            className="ml-3 w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 outline-none"
          />
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-700/60 px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-900"
          >
            Esc
          </button>
        </div>

        <div className="max-h-[60vh] overflow-auto p-2">
          {items.map((a) => (
            <button
              key={a.label}
              onClick={() => {
                a.run();
                onClose();
              }}
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left hover:bg-zinc-900"
            >
              <div>
                <div className="text-sm font-medium">{a.label}</div>
                {a.hint ? <div className="text-xs text-zinc-400">{a.hint}</div> : null}
              </div>
              <div className="text-xs text-zinc-500">{a.keyHint || ""}</div>
            </button>
          ))}

          {!items.length ? (
            <div className="px-3 py-10 text-center text-sm text-zinc-500">
              No matches.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
