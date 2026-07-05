import { useReveal } from "../useReveal";

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" ref={ref}>
      <div className="about-head reveal">
        <div className="eyebrow">How I got here</div>
        <h2>Every model starts with a high loss. So did I.</h2>
      </div>

      <div className="curve-wrap reveal">
        <svg viewBox="0 0 1000 260" preserveAspectRatio="xMidYMid meet">
          <path
            className="curve-path"
            d="M20,40 C 160,55 220,80 280,120 C 340,160 380,150 430,175 C 500,208 560,190 620,205 C 700,222 760,215 830,232 C 880,240 930,236 980,238"
          ></path>
          <g className="curve-pt"><circle cx="20" cy="40" r="5" /></g>
          <g className="curve-pt"><circle cx="280" cy="120" r="5" /></g>
          <g className="curve-pt"><circle cx="430" cy="175" r="5" /></g>
          <g className="curve-pt"><circle cx="620" cy="205" r="5" /></g>
          <g className="curve-pt"><circle cx="830" cy="232" r="5" /></g>
          <g className="curve-pt"><circle cx="980" cy="238" r="5" /></g>

          <text x="20" y="20" className="curve-year">2019</text>
          <text x="20" y="60" className="curve-label">wrote my first for-loop</text>

          <text x="230" y="105" className="curve-year">2021</text>
          <text x="230" y="145" className="curve-label">first ML model, mostly wrong</text>

          <text x="390" y="160" className="curve-year">2022</text>
          <text x="390" y="200" className="curve-label">internship, first real dataset</text>

          <text x="570" y="190" className="curve-year">2023</text>
          <text x="570" y="230" className="curve-label">shipped a model to production</text>

          <text x="880" y="222" className="curve-year">Now</text>
        </svg>
      </div>

      <div className="story-copy reveal">
        <div>
          <p>
            It started with a for-loop that refused to stop, a laptop fan that wouldn't quiet down,
            and a small, stubborn question: why did the model get this one wrong? That question
            turned into a habit, and the habit turned into a career.
          </p>
          <p className="pull">
            "I like the parts other people skip — the messy data, the failed run, the 3 a.m. bug
            that turns out to be one misplaced index."
          </p>
        </div>
        <div>
          <p>
            Since then I've worked across the stack that makes AI systems actually usable: cleaning
            and shaping data, training and fine-tuning models, and wiring them into products people
            rely on without ever thinking about the math underneath.
          </p>
          <p>
            I care less about chasing the newest architecture and more about whether the thing I
            built actually helps someone. When I'm not training models, I'm sketching interfaces in
            a notebook or reading papers on the train.
          </p>
        </div>
      </div>
    </section>
  );
}
