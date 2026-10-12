# Fix: “Failed to fetch” during conversion

This error usually means the browser cannot reach the API, or the browser blocked the request because the frontend origin is not allowed by CORS. A working `/docs` page proves the API server starts, but does not prove that the frontend is using the right API address or that CORS allows its origin.

## Local Windows setup

1. Open a terminal in this project folder (the folder containing `package.json`).
2. Create the root `.env` from `.env.example`, or create it with this line:

   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```

3. In a second terminal, start the backend from the `backend` folder:

   ```powershell
   cd backend
   python -m pip install -r requirements.txt
   python -m uvicorn app:app --reload --host 127.0.0.1 --port 8000
   ```

   If `python` is not recognized, use your installed Python executable in both commands, for example `& "C:\Program Files\Python312\python.exe" -m pip install -r requirements.txt` and `& "C:\Program Files\Python312\python.exe" -m uvicorn app:app --reload --host 127.0.0.1 --port 8000`.

4. Confirm `http://127.0.0.1:8000/health` displays JSON with `"ok": true`.
5. In another terminal at the project root, run `pnpm install` (or `npm install`) and then `pnpm dev` (or `npm run dev`). Open the exact URL printed by Vite. If you change `.env`, stop and restart Vite.
6. Try a small PDF again. This version allows local `localhost` and `127.0.0.1` frontend origins, including Vite ports 5173 and 5174, and gives a clearer error if the API cannot be reached.

## If this is deployed online

Do not use `localhost` as the API address for a public website: visitors' browsers interpret it as their own computer. Set `VITE_API_URL` to the public HTTPS address of your deployed backend, and set backend `CORS_ORIGINS` to the exact origin of your frontend (for example `https://your-domain.example`). Rebuild/redeploy the frontend after changing `VITE_API_URL` and restart/redeploy the backend after changing `CORS_ORIGINS`.

## Quick checks

- Frontend: use the exact URL shown by Vite.
- API: `http://127.0.0.1:8000/health` should return JSON.
- Browser DevTools → Console/Network: if the request is sent to the wrong host/port, correct `VITE_API_URL`; if the console says CORS, correct `CORS_ORIGINS`; if the API returns an HTTP status such as 413 or 415, the server is reachable and the response explains a different issue (file too large or unsupported file type).
