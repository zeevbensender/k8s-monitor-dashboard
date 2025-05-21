# Kubernetes Monitoring Dashboard

A lightweight, developer-friendly Kubernetes monitoring dashboard with a modern **React frontend** and a **FastAPI backend**. Designed for small teams or solo developers who want quick visibility into their K8s clusters — without the overhead of Prometheus or Grafana.

---

## 🚀 Features

- View real-time pod and node status
- Detect and highlight pending or crashing pods
- Auto-refreshing dashboard
- Clean, modular architecture (React + FastAPI)
- Works locally or in a container

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite or Create React App), Axios, Material UI (or Chakra UI)
- **Backend:** Python, FastAPI, Kubernetes Python client
- **Deployment:** Docker, optional K8s manifests
- **Testing:** `pytest`, `react-testing-library`

---

## 📦 Folder Structure

```
k8s-monitoring-dashboard/
├── backend/         # FastAPI app for querying K8s cluster
│   └── app/
│       ├── main.py
│       └── k8s_utils.py
├── frontend/        # React dashboard (with Vite or CRA)
│   └── src/
├── deploy/          # Dockerfile, Kubernetes manifests
├── tests/           # Unit and integration tests
├── docker/          # Entrypoint scripts and compose files
├── README.md        # This file
└── TODO.md          # Project roadmap and dev checklist
```

---

## 🧪 Local Development

### Prerequisites

- Python 3.10+
- Node.js + npm
- Access to a K8s cluster (`kubectl config current-context` must be valid)

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### API Example

`GET /pods` → returns list of pods  
`GET /nodes` → returns list of nodes  
All data comes directly from your current K8s context.

---

## 📦 Docker (Coming Soon)

Full containerization with multi-service Docker Compose or Helm.

---

## 🙋‍♂️ Why This Exists

Prometheus/Grafana are powerful, but overkill for many developers who just want to know “what’s wrong with my cluster.” This dashboard gives you just that — fast, visual, and easy to maintain.

---
## Building Dev Environment
### Prerequisites:
* nvm v18 or v20
* python 3.10
```commandline
sudo apt install -y npm
npm create vite@latest frontend --template react # Choose React and Typescript
cd frontend
npm install
npm install @mui/material @emotion/react @emotion/styled axios
```
