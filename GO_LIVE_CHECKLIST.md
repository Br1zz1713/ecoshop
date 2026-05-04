# EcoShop Go-Live Checklist

## 1) Environment And Secrets

- Set `DEBUG=false`
- Set `SECRET_KEY` to a strong unique value
- Set `ALLOWED_HOSTS` for real domains
- Set valid `DATABASE_URL` (Supabase/PostgreSQL)
- Set `FORCE_SQLITE=false` for production
- Set Supabase storage vars (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_STORAGE_BUCKET`)

## 2) Reliability And Overload Protection

- Keep DB timeouts configured (`DB_CONNECT_TIMEOUT`, `DB_SERVER_OPTIONS`)
- Keep throttling configured (`DRF_THROTTLE_ANON`, `DRF_THROTTLE_USER`)
- Keep cache timeout configured (`CACHE_DEFAULT_TIMEOUT`)
- Keep storage retries/timeouts configured (`AWS_S3_MAX_RETRIES`, `AWS_S3_CONNECT_TIMEOUT`, `AWS_S3_READ_TIMEOUT`)

## 3) Backend Verification

- Run `python manage.py check`
- Run `python manage.py migrate --noinput`
- Run `python manage.py test accounts.tests blog.tests shop.tests`
- Verify health endpoints:
  - `/health/live/` returns 200
  - `/health/ready/` returns 200
  - `/ping/` returns 200

## 4) Frontend Verification

- Run `npm ci` in `frontend`
- Run `npm run build` in `frontend`
- Verify login, register, product list, checkout, and blog pages

## 5) CI/CD Guardrails

- Confirm GitHub Actions `CI` workflow passes on main branch
- Ensure migrations are committed (CI has `makemigrations --check`)
- Ensure backend and frontend jobs both pass

## 6) Rollback And Incident Plan

- Keep previous working deployment revision available for rollback
- If Supabase is unavailable, use documented rescue runbook in `DEPLOYMENT.md`