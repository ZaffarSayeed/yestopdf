# YesToPDF Launch Candidate

This project now contains a real React/Vite frontend and a FastAPI conversion backend.

## 1. Local Windows setup

### Frontend

```powershell
pnpm install
Copy-Item .env.example .env
pnpm dev
```

Set `VITE_API_URL=http://127.0.0.1:8000` in the project-root `.env` for local development. Restart Vite after changing environment variables. The backend accepts the usual Vite localhost ports (5173/5174) by default. For production, set `VITE_API_URL` to the public HTTPS URL of your deployed API and set backend `CORS_ORIGINS` to the exact frontend origin(s).

### Backend

```powershell
cd backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

Open `http://localhost:5173`.

## 2. Better Office conversion on Windows

For the highest Word-to-PDF fidelity, install Microsoft Word on the conversion worker. The API automatically tries Word COM first.

For PDF-to-Word, install the optional `pdf2docx` package in the worker environment:

```powershell
pip install pdf2docx
```

The application automatically uses it when available. Without it, the built-in editable reconstruction fallback is used.

## 3. Production architecture

Do not run heavy conversions in the same web process at scale. Use:

`Browser -> HTTPS frontend -> FastAPI upload API -> queue -> isolated conversion worker -> object storage -> one-time download -> automatic deletion`

For an initial launch, a single worker process is acceptable. As traffic grows, move conversion jobs to Redis/Celery/RQ or a managed queue.

## 4. Security checklist before public launch

- Put the API behind HTTPS.
- Set `CORS_ORIGINS` to your real frontend origin, not `*`.
- Keep temporary files on non-public storage.
- Run workers as an unprivileged OS user/container.
- Add rate limiting and per-IP/user quotas.
- Add authentication before offering persistent user history.
- Delete uploaded and generated files automatically after the download window.
- Add malware/file-type validation before processing untrusted files.
- Add reverse-proxy upload limits in Nginx/Cloudflare/load balancer.
- Never log document contents.

## 5. SEO

The app now maps tools to real crawlable paths such as `/pdf-to-word/`, `/word-to-pdf/`, `/pdf-to-excel/`, and `/pdf-to-powerpoint/` using the browser History API. Each route gets its own title, description and canonical URL at runtime.

Before production, replace `YOUR-DOMAIN.example` in `public/sitemap.xml`, `public/robots.txt`, and the deployment configuration.

## 6. Important fidelity note

No open-source fallback can honestly guarantee iLovePDF-level reconstruction for every PDF. PDFs may contain positioned glyphs, clipping paths, embedded fonts, vector graphics, scanned pages and complex tables. The architecture therefore supports optional specialist conversion engines and has editable fallbacks.

For a commercial-grade competitor, benchmark the product against a fixed corpus of real invoices, resumes, forms, tables, multi-column reports, scanned documents and presentations before advertising a specific accuracy percentage.

## 7. Conversion fidelity upgrade (this build)

The backend requirements now install `pdf2docx` and `pikepdf` by default. `pdf2docx` is used for editable PDF-to-Word reconstruction when its dependencies are available; the fallback is less accurate for complex page layouts. Microsoft Word COM is preferred for Word-to-PDF on Windows; LibreOffice is used when available elsewhere.

For scanned PDFs, install the Tesseract OCR application on the worker host and add `pytesseract` to the Python environment before enabling an OCR workflow. OCR must be exposed as an explicit tool/option and should not silently replace the original document text.

PDF-to-Excel currently prioritizes extractable tables and text. Image-only scans need OCR/table recognition; complex visual page layouts will not become a perfect spreadsheet automatically. PDF-to-PowerPoint preserves a visual page background and adds editable text overlays; this is a compromise between appearance and editability, not fully reconstructed PowerPoint objects.

Before release, test with your own sample corpus and review the converted documents manually. Do not promise 100% fidelity for every input.
