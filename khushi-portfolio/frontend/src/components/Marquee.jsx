const SKILLS = [
  { label: "PYTHON", accent: true },
  { label: "PYTORCH" },
  { label: "TRANSFORMERS" },
  { label: "LLM FINE-TUNING", accent: true },
  { label: "RAG SYSTEMS" },
  { label: "SQL" },
  { label: "MLOPS", accent: true },
  { label: "DOCKER" },
  { label: "AWS" },
  { label: "FASTAPI", accent: true },
  { label: "LANGCHAIN" }
];

export default function Marquee() {
  const items = [...SKILLS, ...SKILLS]; // duplicated for seamless loop

  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((s, i) => (
          <span key={i} className={s.accent ? "acc" : ""}>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
