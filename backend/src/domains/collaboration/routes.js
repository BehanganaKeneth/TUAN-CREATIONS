import express from 'express';

const router = express.Router();

router.get('/collaboration', async (req, res) => {
  res.json({ message: 'Collaboration endpoint' });
});

router.post('/share', async (req, res) => {
  try {
    res.json({ message: 'Shared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
