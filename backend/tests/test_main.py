from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_pods_returns_200():
    response = client.get("/pods")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_nodes_returns_200():
    response = client.get("/nodes")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

