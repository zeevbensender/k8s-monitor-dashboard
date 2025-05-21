import axios from 'axios';

const API_BASE = 'http://localhost:8000';  // backend URL

export const fetchPods = async () => {
  const res = await axios.get(`${API_BASE}/pods`);
  return res.data;
};

export const fetchNodes = async () => {
  const res = await axios.get(`${API_BASE}/nodes`);
  return res.data;
};
