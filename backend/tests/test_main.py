from fastapi.testclient import TestClient
from app.main import app
import pytest
from unittest.mock import patch, MagicMock

client = TestClient(app)

@pytest.fixture(autouse=True)
def mock_kube_config_and_api(monkeypatch):
    # Mock the kube config loading
    monkeypatch.setattr("app.k8s_utils.config.load_kube_config", lambda: None)

    # Mock the Kubernetes client methods
    mock_pod = MagicMock()
    mock_pod.metadata.name = "my-pod"
    mock_pod.metadata.namespace = "default"
    mock_pod.status.phase = "Running"
    mock_pod.spec.node_name = "node-1"

    mock_node = MagicMock()
    mock_node.metadata.name = "node-1"
    mock_condition = MagicMock()
    mock_condition.type = "Ready"
    mock_condition.status = "True"
    mock_node.status.conditions = [mock_condition]

    mock_core_api = MagicMock()
    mock_core_api.list_pod_for_all_namespaces.return_value.items = [mock_pod]
    mock_core_api.list_node.return_value.items = [mock_node]

    monkeypatch.setattr("app.k8s_utils.client.CoreV1Api", lambda: mock_core_api)

def test_get_pods_returns_200():
    response = client.get("/pods")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert response.json()[0]["name"] == "my-pod"

def test_get_nodes_returns_200():
    response = client.get("/nodes")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert response.json()[0]["status"] == "Ready"
