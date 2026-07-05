export default function Hero() {
  const handleMouseMove = (e) => {
    const hero = e.currentTarget;
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    hero.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <section id="home" onMouseMove={handleMouseMove}>
      <div className="hero-grid">
        <div>
          <div className="status-line">
            <span className="pulse-dot"></span> currently fine-tuning a retrieval model &nbsp;·&nbsp; Bengaluru
          </div>
          <div className="eyebrow">AI Engineer</div>
          <h1 className="hero-name">
            Khushi
            <br />
            <em>Yadav</em>
          </h1>
          <p className="hero-tag">
            I build machine learning systems end to end — from the first messy notebook cell to the
            model quietly doing its job in production.
          </p>
          <div className="btn-row">
            <a href="#projects" className="btn primary">
              See my projects ↓
            </a>
            <a href="#contact" className="btn ghost">
              Say hello →
            </a>
          </div>
        </div>

        <div className="orbit-wrap">
          <div className="orbit-ring"></div>
          <div className="avatar">KY</div>
          <span className="chip c1">Python</span>
          <span className="chip c2">PyTorch</span>
          <span className="chip c3">LLMs</span>
          <span className="chip c4">MLOps</span>
          <span className="chip c5">RAG</span>
        </div>
      </div>
      <div className="scroll-hint">SCROLL</div>
    </section>
  );
}
