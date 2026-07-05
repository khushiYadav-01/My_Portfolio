import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECTS_FILE = path.join(__dirname, "data", "projects.json");
const MESSAGES_FILE = path.join(__dirname, "data", "messages.json");

const app = express();
app.use(cors());
app.use(express.json());

// ---------- helpers ----------
async function readJSON(file) {
  const raw = await fs.readFile(file, "utf-8");
  return JSON.parse(raw);
}
async function writeJSON(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

// ---------- projects ----------

// GET all projects (optionally filter by category: /api/projects?category=nlp)
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await readJSON(PROJECTS_FILE);
    const { category } = req.query;
    const result = category && category !== "all"
      ? projects.filter(p => p.category === category)
      : projects;
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Could not load projects." });
  }
});

// GET one project
app.get("/api/projects/:id", async (req, res) => {
  const projects = await readJSON(PROJECTS_FILE);
  const project = projects.find(p => p.id === Number(req.params.id));
  if (!project) return res.status(404).json({ error: "Project not found." });
  res.json(project);
});

// POST a new project
app.post("/api/projects", async (req, res) => {
  const { title, description, category, categoryLabel, stack, link } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json({ error: "title, description and category are required." });
  }
  const projects = await readJSON(PROJECTS_FILE);
  const newProject = {
    id: projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1,
    title,
    description,
    category,
    categoryLabel: categoryLabel || category,
    stack: Array.isArray(stack) ? stack : [],
    link: link || "#"
  };
  projects.push(newProject);
  await writeJSON(PROJECTS_FILE, projects);
  res.status(201).json(newProject);
});

// PUT (update) a project
app.put("/api/projects/:id", async (req, res) => {
  const projects = await readJSON(PROJECTS_FILE);
  const idx = projects.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Project not found." });
  projects[idx] = { ...projects[idx], ...req.body, id: projects[idx].id };
  await writeJSON(PROJECTS_FILE, projects);
  res.json(projects[idx]);
});

// DELETE a project
app.delete("/api/projects/:id", async (req, res) => {
  const projects = await readJSON(PROJECTS_FILE);
  const filtered = projects.filter(p => p.id !== Number(req.params.id));
  if (filtered.length === projects.length) {
    return res.status(404).json({ error: "Project not found." });
  }
  await writeJSON(PROJECTS_FILE, filtered);
  res.status(204).end();
});

// ---------- contact ----------
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email and message are required." });
  }
  const messages = await readJSON(MESSAGES_FILE);
  messages.push({ id: Date.now(), name, email, message, receivedAt: new Date().toISOString() });
  await writeJSON(MESSAGES_FILE, messages);
  // NOTE: this only stores the message on disk. Wire up an email service
  // (e.g. Resend, Nodemailer + SMTP) here if you want an actual email sent.
  res.status(201).json({ ok: true });
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Portfolio API running on http://localhost:${PORT}`));
