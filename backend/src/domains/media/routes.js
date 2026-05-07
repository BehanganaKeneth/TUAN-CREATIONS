import express from 'express';

const router = express.Router();

router.get('/media', async (req, res) => {
  res.json({ message: 'Media endpoint' });
});

router.post('/upload', async (req, res) => {
  try {
    res.json({ message: 'File uploaded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
