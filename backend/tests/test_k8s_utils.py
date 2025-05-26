import pytest
from unittest.mock import MagicMock, patch
from app import k8s_utils

@patch("app.k8s_utils.client.CoreV1Api")
@patch("app.k8s_utils.config.load_kube_config")
def test_list_pods(mock_load_kube_config, mock_core_api):
    # Mock pod object
    mock_pod = MagicMock()
    mock_pod.metadata.name = "my-pod"
    mock_pod.metadata.namespace = "default"
    mock_pod.status.phase = "Running"
    mock_pod.spec.node_name = "node-1"

    mock_core_api.return_value.list_pod_for_all_namespaces.return_value.items = [mock_pod]

    pods = k8s_utils.list_pods()

    assert pods == [{
        "name": "my-pod",
        "namespace": "default",
        "status": "Running",
        "node_name": "node-1"
    }]

@patch("app.k8s_utils.client.CoreV1Api")
@patch("app.k8s_utils.config.load_kube_config")
def test_list_nodes(mock_load_kube_config, mock_core_api):
    mock_condition = MagicMock()
    mock_condition.type = "Ready"
    mock_condition.status = "True"

    mock_node = MagicMock()
    mock_node.metadata.name = "node-1"
    mock_node.status.conditions = [mock_condition]

    mock_core_api.return_value.list_node.return_value.items = [mock_node]

    nodes = k8s_utils.list_nodes()

    assert nodes == [{
        "name": "node-1",
        "status": "Ready"
    }]

