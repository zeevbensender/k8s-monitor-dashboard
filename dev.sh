#!/bin/bash

# Create logs directory if it doesn't exist
mkdir -p logs

echo "🔄 Starting Kubernetes Monitoring Dashboard (dev mode)..."

# Setup Python venv
if [ ! -d "backend/vnvk8s" ]; then
  echo "📦 Creating Python venv..."
  python3 -m venv backend/vnvk8s
  source backend/vnvk8s/bin/activate
  pip install -r backend/requirements.txt
else
  source backend/vnvk8s/bin/activate
fi

# Start backend and log output
echo "🚀 Launching backend..."
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 5888 > logs/backend.log 2>&1 &
BACKEND_PID=$!

# Start frontend
echo "🚀 Launching frontend..."
cd frontend
npm install
npm run dev -- --host &
FRONTEND_PID=$!

# Handle Ctrl+C to clean up both processes
trap 'echo -e "\n🛑 Shutting down..."; kill $BACKEND_PID $FRONTEND_PID; exit 0' INT

# Keep script running
wait
