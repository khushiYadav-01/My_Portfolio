# Khushi Yadav — AI Engineer Portfolio

A React (Vite) frontend backed by a small Node/Express API. The Projects
section is data-driven — projects live in the backend and are fetched over
HTTP, so you can add as many as you want without touching any component code.

```
khushi-portfolio/
├── backend/     Express API (projects CRUD + contact form)
└── frontend/    React app (Vite)
```

## 1. Run the backend

```bash
cd backend
npm install
npm start          # runs on http://localhost:4000
```

Projects are stored in `backend/data/projects.json`. Contact form messages
land in `backend/data/messages.json` (no email is actually sent — see the
note in `server.js` if you want to wire up something like Resend or
Nodemailer).

### API endpoints
| Method | Route              | Purpose                        |
|--------|--------------------|---------------------------------|
| GET    | `/api/projects`          | List all projects (optional `?category=nlp`) |
| GET    | `/api/projects/:id`      | Get one project |
| POST   | `/api/projects`          | Add a project |
| PUT    | `/api/projects/:id`      | Update a project |
| DELETE | `/api/projects/:id`      | Remove a project |
| POST   | `/api/contact`           | Submit the contact form |

Example — add a new project with curl:
```bash
curl -X POST http://localhost:4000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My new project",
    "description": "What it does and the result you got.",
    "category": "nlp",
    "categoryLabel": "NLP",
    "stack": ["Python", "PyTorch"],
    "link": "https://github.com/you/project"
  }'
```

## 2. Run the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev         # runs on http://localhost:5173
```

The dev server proxies any `/api/*` request to the backend on port 4000
(see `vite.config.js`), so the two just work together with no extra config.

## 3. Make it yours

- Swap in your real photo (replace the "KY" avatar circle in `Hero.jsx`)
- Update the email, LinkedIn, and GitHub links in `Contact.jsx`
- Drop your real `Khushi_Yadav_Resume.pdf` into `frontend/public/` — the
  download button in `Resume.jsx` already points at `/Khushi_Yadav_Resume.pdf`
- Add real projects either by editing `backend/data/projects.json` directly
  or by POSTing to `/api/projects`
- If you add a new project category, add a matching button in the `FILTERS`
  array in `Projects.jsx`

## 4. Build for production

```bash
cd frontend
npm run build        # outputs static files to frontend/dist
```

Deploy `frontend/dist` to any static host (Vercel, Netlify, etc.) and the
`backend` folder to any Node host (Render, Railway, Fly.io, etc.) — just
update the frontend's fetch calls to point at your deployed API URL instead
of the `/api` proxy path, or keep a proxy/rewrite rule on your host.
