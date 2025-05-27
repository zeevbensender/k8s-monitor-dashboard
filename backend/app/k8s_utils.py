from kubernetes import client, config

_config_loaded = False

def _ensure_config_loaded():
    global _config_loaded
    if not _config_loaded:
        config.load_kube_config()
        _config_loaded = True

def list_pods():
    _ensure_config_loaded()
    v1 = client.CoreV1Api()
    pods = v1.list_pod_for_all_namespaces(watch=False)
    result = []
    for pod in pods.items:
        result.append({
            "name": pod.metadata.name,
            "namespace": pod.metadata.namespace,
            "status": pod.status.phase,
            "node_name": pod.spec.node_name,
        })
    return result

def list_nodes():
    _ensure_config_loaded()
    v1 = client.CoreV1Api()
    nodes = v1.list_node()
    result = []
    for node in nodes.items:
        status = "Unknown"
        for condition in node.status.conditions:
            if condition.type == "Ready":
                status = "Ready" if condition.status == "True" else "NotReady"
        result.append({
            "name": node.metadata.name,
            "status": status,
        })
    return result
