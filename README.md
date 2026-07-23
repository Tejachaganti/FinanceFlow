# FinanceFlow

FinanceFlow is a full-stack personal finance platform for tracking expenses, managing budgets, exploring analytics, generating reports, and receiving AI-assisted financial guidance.

## Highlights

- JWT-authenticated accounts with password recovery via expiring, single-use email links
- Expense CRUD with attachments, filtering, voice-assisted entry, and category insights
- Monthly budget planning, income tracking, savings visibility, and budget alerts
- Analytics, reports, CSV/PDF exports, notifications, global search, and an AI assistant
- Responsive React UI for desktop and mobile, with a Capacitor Android project

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, React Router, Framer Motion, Recharts |
| Backend | Node.js, Express, Mongoose, JWT, bcrypt, Nodemailer |
| Data | MongoDB Atlas |
| AI | Google GenAI (server-side only) |
| Deployment | Vercel, Render, MongoDB Atlas |

## Architecture

`frontend` is a Vite SPA using an authenticated Axios client and route-level code splitting. `backend` exposes protected REST endpoints for finance, profile, analytics, AI, notifications, and password recovery. MongoDB stores user-scoped records.

## Local development

```bash
git clone <your-repository-url>
cd financeflow
cd backend && npm install
cd ../frontend && npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=use_a_long_random_secret
GEMINI_API_KEY=...
FRONTEND_URL=http://localhost:5173
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=...
SMTP_PASS=...
EMAIL_FROM="FinanceFlow <no-reply@example.com>"
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start each service:

```bash
cd backend && npm run dev
cd frontend && npm run dev
```

## Deployment

Deploy the frontend to Vercel with `VITE_API_URL` set to the public backend `/api` URL. Deploy `backend` to Render with the environment variables above, set `FRONTEND_URL` to the Vercel URL, configure MongoDB Atlas network access, and provide valid SMTP credentials for password-reset emails.

Before production, configure a strict CORS allowlist, use a strong JWT secret, and verify SMTP sender/domain settings.

## Screenshots

Add screenshots under `screenshots/` for Landing, Dashboard, Expenses, Analytics, Budget, Reports, and AI Assistant.

## Future enhancements

- HttpOnly-cookie session migration
- Automated unit, API, and browser E2E tests
- Excel export endpoint and scheduled reports
- Investment and recurring-expense tracking

## License

MIT
