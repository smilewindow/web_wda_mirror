const express = require('express');
const axios = require('axios');
const path = require('path');

const WDA_URL = process.env.WDA_URL || 'http://127.0.0.1:8100';
const MJPEG_URL = process.env.MJPEG_URL || 'http://127.0.0.1:9100';

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let sessionId = null;

async function ensureSession() {
  if (sessionId) return sessionId;
  try {
    const status = await axios.get(`${WDA_URL}/status`);
    sessionId = status.data.sessionId || status.data.value?.sessionId;
    if (sessionId) return sessionId;
  } catch (err) {
    console.error('Failed to get WDA status:', err.message);
  }
  try {
    const res = await axios.post(`${WDA_URL}/session`, { capabilities: {} });
    sessionId = res.data.sessionId || res.data.value?.sessionId;
    return sessionId;
  } catch (err) {
    console.error('Failed to create WDA session:', err.message);
    throw err;
  }
}

app.get('/config', (req, res) => {
  res.json({ mjpegUrl: MJPEG_URL });
});

app.post('/tap', async (req, res) => {
  const { x, y } = req.body || {};
  if (typeof x !== 'number' || typeof y !== 'number') {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }
  try {
    const id = await ensureSession();
    await axios.post(`${WDA_URL}/session/${id}/wda/tap`, { x, y });
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Tap failed:', err.message);
    res.status(500).json({ error: 'Tap failed', details: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
