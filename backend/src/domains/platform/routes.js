import express from 'express';

const router = express.Router();

router.get('/config', async (req, res) => {
  res.json({
    version: '1.0.0',
    features: {
      academy: true,
      marketplace: true,
      collaboration: true,
      iot: true
    }
  });
});

export default router;
