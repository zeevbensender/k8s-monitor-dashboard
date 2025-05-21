# TODO — Kubernetes Monitoring Dashboard (React + FastAPI)

---

## ✅ Week 2 — Project Setup

- [x] Decide on architecture (React + FastAPI)
- [ ] Initialize `backend/` with FastAPI project
  - [ ] Add `GET /pods` and `GET /nodes` endpoints
  - [ ] Connect to current K8s context using `kubernetes` Python client
- [ ] Initialize `frontend/` with Vite or CRA
  - [ ] Set up Axios client
  - [ ] Create minimal layout with MUI or Chakra UI
- [ ] Add CORS handling between frontend and backend

---

## 🔄 Week 3 — Data Display

- [ ] Fetch and display pod list in table
- [ ] Fetch and display node list in table
- [ ] Add status tags (Running, Pending, CrashLoopBackOff, etc.)
- [ ] Implement auto-refresh every 10–30 seconds
- [ ] Show “Last updated” timestamp

---

## 🧪 Tests

- [ ] Unit tests for `k8s_utils.py`
- [ ] Backend route tests with `pytest`
- [ ] Frontend component tests (React Testing Library)

---

## 🚢 Week 4 — Containerization

- [ ] Dockerfile for backend
- [ ] Dockerfile for frontend
- [ ] `docker-compose.yml` for local full-stack run
- [ ] Add volume for kubeconfig (or mount in-cluster secret)
- [ ] (Optional) K8s manifests for deploying dashboard in a cluster

---

## 💡 Future Ideas

- [ ] Namespace filtering
- [ ] WebSocket live updates (instead of polling)
- [ ] Notifications (Slack/webhook) for crashing pods
- [ ] Resource usage from metrics-server
- [ ] Dark mode UI toggle

---