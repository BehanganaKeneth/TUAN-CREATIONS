import express from 'express';

const router = express.Router();

router.get('/devices', async (req, res) => {
  res.json({ devices: [] });
});

router.post('/connect', authMiddleware, async (req, res) => {
  try {
    res.json({ message: 'Device connected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
