import { useReveal } from "../useReveal";

export default function Resume() {
  const ref = useReveal();

  return (
    <section id="resume" ref={ref}>
      <div className="eyebrow reveal">My résumé</div>
      <h2 className="reveal" style={{ fontSize: "clamp(2rem,4vw,2.7rem)", maxWidth: "16ch" }}>
        Two ways to get the full picture.
      </h2>

      <div className="resume-grid reveal">
        <div className="card">
          <h3>Watch the video résumé</h3>
          <p>A three-minute walkthrough of what I build and why, in my own words.</p>
          <div className="frame">
            <div>
              <div className="play-btn">▶</div>
              video_resume.mp4
            </div>
          </div>
          <a href="#" className="btn ghost">
            Play video
          </a>
        </div>
        <div className="card">
          <h3>Read the file résumé</h3>
          <p>The traditional one-pager — roles, stack, and results, no fluff.</p>
          <div className="frame" style={{ flex: 1 }}>
            <div>
              <div className="play-btn">⬇</div>
              Khushi_Yadav_Resume.pdf
            </div>
          </div>
          <a href="/Khushi_Yadav_Resume.pdf" download className="btn primary">
            Download résumé
          </a>
        </div>
      </div>
    </section>
  );
}
