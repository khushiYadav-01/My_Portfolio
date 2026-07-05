import { useEffect, useState } from "react";
import { useReveal } from "../useReveal";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "nlp", label: "NLP / LLMs" },
  { key: "cv", label: "Computer Vision" },
  { key: "data", label: "Data / MLOps" }
];

const ACCENTS = { nlp: "var(--amber)", cv: "var(--teal)", data: "var(--amber)" };

export default function Projects() {
  const ref = useReveal();
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const visible =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" ref={ref}>
      <div className="eyebrow reveal">Selected projects</div>
      <h2
        className="reveal"
        style={{ fontSize: "clamp(2rem,4vw,2.7rem)", maxWidth: "18ch", marginBottom: "6px" }}
      >
        Problems I got paid — or curious enough — to obsess over.
      </h2>

      <div className="filter-row reveal">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter ${activeFilter === f.key ? "active" : ""}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {status === "loading" && <p className="proj-empty">Loading projects…</p>}
      {status === "error" && (
        <p className="proj-error">
          Couldn't reach the API. Make sure the backend is running on port 4000.
        </p>
      )}

      {status === "ready" && (
        <div className="project-grid reveal">
          {visible.map((p) => (
            <article
              key={p.id}
              className="proj-card"
              style={{ "--accent": ACCENTS[p.category] || "var(--amber)" }}
            >
              <span className="proj-tag">{p.categoryLabel || p.category}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="proj-stack">
                {(p.stack || []).map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <a href={p.link || "#"} className="proj-link">
                View project →
              </a>
            </article>
          ))}
          {visible.length === 0 && <p className="proj-empty">No projects in this category yet.</p>}
        </div>
      )}
    </section>
  );
}
