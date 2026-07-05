import { useState } from "react";
import { useReveal } from "../useReveal";

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={ref}>
      <div className="eyebrow reveal">Get in touch</div>
      <h2 className="contact-head reveal">Working on something with AI in it? Let's talk.</h2>

      <form className="contact-form reveal" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="What are you building?"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="btn primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "sent" && <span className="form-status">Message sent — I'll get back to you soon.</span>}
        {status === "error" && (
          <span className="form-status err">Something went wrong. Try the email link below instead.</span>
        )}
      </form>

      <a href="mailto:khushi.yadav@email.com" className="email-link reveal">
        khushi.yadav@email.com
      </a>
      <div className="social-row reveal">
        <a href="#">LinkedIn ↗</a>
        <a href="#">GitHub ↗</a>
        <a href="#">Twitter / X ↗</a>
      </div>

      <footer>
        <span>© 2026 Khushi Yadav</span>
        <span>Every version of this page is a checkpoint, not a final model.</span>
      </footer>
    </section>
  );
}
