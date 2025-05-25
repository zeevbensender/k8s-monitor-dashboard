// src/App.tsx
import { useEffect, useState } from 'react';
import { fetchPods, fetchNodes } from './api/k8s';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  CircularProgress,
} from '@mui/material';

interface Pod {
  name: string;
  namespace: string;
  status: string;
  node_name: string;
}

interface Node {
  name: string;
  status: string;
}

function App() {
  const [pods, setPods] = useState<Pod[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const load = async () => {
    try {
      const [podsData, nodesData] = await Promise.all([
        fetchPods(),
        fetchNodes(),
      ]);
      setPods(podsData);
      setNodes(nodesData);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>🧠 Kubernetes Monitoring Dashboard</Typography>
      <Typography variant="body2" gutterBottom>Last updated: {lastUpdated}</Typography>

      {loading ? (
        <Box mt={5} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h6" sx={{ mt: 4 }}>Pods</Typography>
          <Paper sx={{ mb: 4 }}>
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
        </>
      )}
    </Container>
  );
}

export default App;
