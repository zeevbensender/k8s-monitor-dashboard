import { useEffect, useState } from 'react';
import { fetchPods, fetchNodes } from './api/k8s';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

function App() {
  const [pods, setPods] = useState([]);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const load = async () => {
      setPods(await fetchPods());
      setNodes(await fetchNodes());
    };
    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>🧠 Kubernetes Dashboard</Typography>

      <Typography variant="h6">Pods</Typography>
      <Paper sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Namespace</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Node</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pods.map((pod, i) => (
              <TableRow key={i}>
                <TableCell>{pod.name}</TableCell>
                <TableCell>{pod.namespace}</TableCell>
                <TableCell>{pod.status}</TableCell>
                <TableCell>{pod.node_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h6">Nodes</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nodes.map((node, i) => (
              <TableRow key={i}>
                <TableCell>{node.name}</TableCell>
                <TableCell>{node.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default App;
