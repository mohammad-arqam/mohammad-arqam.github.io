import React, { useEffect, useMemo, useState } from "react";
import { profile } from "./data/profile";
import { useReveal } from "./utils/useReveal";
import { useScrollProgress } from "./utils/useScrollProgress";
import CommandPalette from "./components/CommandPalette";
import MagneticButton from "./components/MagneticButton";
import Toast from "./components/Toast";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Pill({ children }) {
  return (
    <span className="rounded-full border border-zinc-700/70 bg-zinc-900/40 px-3 py-1 text-xs text-zinc-200">
      {children}
    </span>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="reveal">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-zinc-400">{subtitle}</p> : null}
    </div>
  );
}

export default function App() {

  const progress = useScrollProgress();

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, text: "" });

  const [filter, setFilter] = useState("All");
  
  useReveal(filter);
const tags = useMemo(() => {
    const set = new Set(profile.projects.map((p) => p.tag));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    if (filter === "All") return profile.projects;
    return profile.projects.filter((p) => p.tag === filter);
  }, [filter, profile.projects]);

  const actions = useMemo(
    () => [
      { label: "Go to: Top", hint: "Hero section", keyHint: "Enter", run: () => scrollToId("top") },
      { label: "Go to: Projects", hint: "Featured + filters", run: () => scrollToId("projects") },
      { label: "Go to: Skills", hint: "Stack + coursework", run: () => scrollToId("skills") },
      { label: "Go to: Experience", hint: "Work history", run: () => scrollToId("experience") },
      { label: "Go to: Resume", hint: "Download PDF", run: () => scrollToId("resume") },
      {
        label: "Copy email",
        hint: "Email is inside resume",
        keyHint: "↩",
        run: async () => {
          // Keep the UX, but point users to resume as requested
          setToast({ show: true, text: "Email is in the resume (Download below) 📄" });
        },
      },
    ],
    []
  );

  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div id="top" className="relative min-h-screen overflow-hidden">
      {/* Scroll progress */}
      <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-emerald-400 to-fuchsia-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 noise opacity-[0.22]" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute top-1/3 -left-24 h-[420px] w-[420px] rounded-full bg-emerald-500/12 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-zinc-700/60 bg-zinc-900/40">
            <span className="text-sm font-bold">⧉</span>
          </div>
          <div>
            <div className="text-sm font-semibold">{profile.name}</div>
            <div className="text-xs text-zinc-400">{profile.location}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MagneticButton
            onClick={() => setPaletteOpen(true)}
            className="rounded-xl border border-zinc-700/60 bg-zinc-900/40 px-3 py-2 text-xs text-zinc-200 hover:bg-zinc-900"
          >
            ⌘K / Ctrl+K
          </MagneticButton>

          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-zinc-700/60 bg-zinc-900/40 px-3 py-2 text-xs text-zinc-200 hover:bg-zinc-900"
          >
            GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-zinc-700/60 bg-zinc-900/40 px-3 py-2 text-xs text-zinc-200 hover:bg-zinc-900"
          >
            LinkedIn
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 md:grid-cols-[1.2fr_.8fr]">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-900/40 px-3 py-1 text-xs text-zinc-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Seeking internships (backend / frontend / full-stack)
          </div>

          <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">
            <span className="bg-gradient-to-r from-indigo-300 via-emerald-200 to-fuchsia-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-shimmer">
              {profile.headline}
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-zinc-300">
            {profile.about.join(" ")}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {profile.skills.slice(0, 12).map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton
              onClick={() => scrollToId("projects")}
              className="rounded-2xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
            >
              View Projects →
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollToId("resume")}
              className="rounded-2xl border border-zinc-700/60 bg-zinc-900/40 px-5 py-3 text-sm text-zinc-100 hover:bg-zinc-900"
            >
              Resume (PDF)
            </MagneticButton>
          </div>

          <p className="mt-3 text-xs text-zinc-500">
            Tip: Press <span className="text-zinc-300">⌘K</span> / <span className="text-zinc-300">Ctrl+K</span> to jump around.
          </p>
        </div>

        <div className="reveal">
          <div className="rounded-3xl border border-zinc-700/60 bg-zinc-900/30 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-zinc-200">Snapshot</div>
              <div className="text-xs text-zinc-500">v2.0</div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {profile.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl border border-zinc-700/60 bg-zinc-950/30 p-4 text-center"
                >
                  <div className="text-sm font-semibold">{h.value}</div>
                  <div className="mt-1 text-[11px] text-zinc-400">{h.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-700/60 bg-zinc-950/30 p-4">
              <div className="text-xs text-zinc-400">What I ship</div>
              <div className="mt-1 text-sm text-zinc-200">
                Clean UI + reliable APIs + measurable performance
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-zinc-400">
              <div className="h-2 w-2 rounded-full bg-indigo-400 animate-floaty" />
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-floaty [animation-delay:200ms]" />
              <div className="h-2 w-2 rounded-full bg-fuchsia-400 animate-floaty [animation-delay:400ms]" />
              <span className="ml-2">React • Tailwind • Node • Systems</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative z-10 mx-auto max-w-6xl px-5 py-14">
        <div className="reveal flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold">Projects</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Full list from my resume — filter to scan fast.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={[
                  "rounded-full px-3 py-1 text-xs border",
                  filter === t
                    ? "border-zinc-200 bg-zinc-100 text-zinc-950"
                    : "border-zinc-700/60 bg-zinc-900/30 text-zinc-200 hover:bg-zinc-900",
                ].join(" ")}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {filtered.map((p) => (
            <div
              key={p.title}
              className="reveal rounded-3xl border border-zinc-700/60 bg-zinc-900/20 p-6 hover:bg-zinc-900/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    {p.featured ? (
                      <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs text-emerald-200 border border-emerald-400/25">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">{p.tag}</div>
                </div>

                <div className="flex gap-2">
                  {p.links.repo ? (
                    <a
                      className="rounded-xl border border-zinc-700/60 bg-zinc-950/30 px-3 py-2 text-xs hover:bg-zinc-900"
                      href={p.links.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Repo
                    </a>
                  ) : null}
                  {p.links.demo ? (
                    <a
                      className="rounded-xl border border-zinc-700/60 bg-zinc-950/30 px-3 py-2 text-xs hover:bg-zinc-900"
                      href={p.links.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Demo
                    </a>
                  ) : null}
                </div>
              </div>

              <p className="mt-4 text-sm text-zinc-300">{p.blurb}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>

              {!p.links.repo && !p.links.demo ? (
                <div className="mt-4 text-xs text-zinc-500">
                  (Add repo/demo links in <span className="text-zinc-300">src/data/profile.js</span>)
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative z-10 mx-auto max-w-6xl px-5 py-14">
        <SectionHeader title="Skills & Coursework" subtitle="Proof I can ship + learn fast." />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="reveal rounded-3xl border border-zinc-700/60 bg-zinc-900/20 p-6">
            <h3 className="text-sm font-semibold text-zinc-200">Core Skills</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </div>

          <div className="reveal rounded-3xl border border-zinc-700/60 bg-zinc-900/20 p-6">
            <h3 className="text-sm font-semibold text-zinc-200">Relevant Coursework</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {profile.coursework.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-300" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="relative z-10 mx-auto max-w-6xl px-5 py-14">
        <SectionHeader title="Work Experience" subtitle="Fast-paced roles where I learned reliability + teamwork." />

        <div className="mt-8 grid gap-4">
          {profile.experience.map((x) => (
            <div key={x.role + x.company} className="reveal rounded-3xl border border-zinc-700/60 bg-zinc-900/20 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-zinc-100">
                    {x.role} <span className="text-zinc-400">— {x.company}</span>
                  </div>
                  <div className="mt-1 text-xs text-zinc-500">{x.dates}</div>
                </div>
                <div className="flex gap-2">
                  <Pill>Communication</Pill>
                  <Pill>Execution</Pill>
                  <Pill>Reliability</Pill>
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                {x.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Resume */}
      <section id="resume" className="relative z-10 mx-auto max-w-6xl px-5 py-14">
        <div className="reveal rounded-3xl border border-zinc-700/60 bg-zinc-900/20 p-8">
          <h2 className="text-2xl font-semibold">Resume</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Contact details are inside the PDF, along with full technical depth.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 hover:opacity-90"
            >
              Open Resume (PDF)
            </a>
            <a
              href={profile.resume}
              download
              className="rounded-2xl border border-zinc-700/60 bg-zinc-900/40 px-5 py-3 text-sm text-zinc-100 hover:bg-zinc-900"
            >
              Download
            </a>

            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-zinc-700/60 bg-zinc-900/40 px-5 py-3 text-sm hover:bg-zinc-900"
            >
              GitHub
            </a>

            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-zinc-700/60 bg-zinc-900/40 px-5 py-3 text-sm hover:bg-zinc-900"
            >
              LinkedIn
            </a>
          </div>

          <p className="mt-6 text-xs text-zinc-500">
            To update links/projects: edit <span className="text-zinc-300">src/data/profile.js</span>
          </p>
        </div>
      </section>

      <footer className="relative z-10 mx-auto max-w-6xl px-5 pb-10 text-xs text-zinc-500">
        Built with React + Tailwind • Press ⌘K/Ctrl+K
      </footer>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} actions={actions} />

      <Toast show={toast.show} text={toast.text} onHide={() => setToast({ show: false, text: "" })} />
    </div>
  );
}
