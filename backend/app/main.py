from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.k8s_utils import list_pods, list_nodes

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update if your frontend runs elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/pods")
def get_pods():
    return list_pods()

@app.get("/nodes")
def get_nodes():
    return list_nodes()
