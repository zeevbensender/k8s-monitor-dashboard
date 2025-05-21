#!/bin/bash

echo "🔄 Starting Kubernetes Monitoring Dashboard (dev mode)..."

# Ensure backend venv is ready
if [ ! -d "backend/vnvk8s" ]; then
  echo "📦 Creating Python venv..."
  python3 -m venv backend/vnvk8s
  source backend/vnvk8s/bin/activate
  pip install -r backend/requirements.txt
else
  source backend/vnvk8s/bin/activate
fi

# Run backend
echo "🚀 Launching backend..."
uvicorn backend.app.main:app --reload &

# Run frontend
echo "🚀 Launching frontend..."
cd frontend
npm install
npm run dev
