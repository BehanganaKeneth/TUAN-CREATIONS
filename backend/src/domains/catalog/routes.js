import express from 'express';
import { Course } from '../../models.js';

const router = express.Router();

router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name profile.avatar');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/courses/:courseId', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate('instructor', 'name profile');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/courses', authMiddleware, async (req, res) => {
  try {
    const course = new Course({ ...req.body, instructor: req.userId });
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
