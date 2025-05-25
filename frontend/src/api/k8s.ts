// src/api/k8s.ts
import axios from 'axios';

const API_BASE = `${window.location.protocol}//${window.location.hostname}:5888`;

export const fetchPods = async () => {
  const res = await axios.get(`${API_BASE}/pods`);
  return res.data;
};

export const fetchNodes = async () => {
  const res = await axios.get(`${API_BASE}/nodes`);
  return res.data;
};
