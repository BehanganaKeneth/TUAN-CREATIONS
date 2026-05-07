import express from 'express';
import { Enrollment, Course } from '../../models.js';

const router = express.Router();

router.get('/academy/analytics', async (req, res) => {
  try {
    const totalEnrollments = await Enrollment.countDocuments();
    const completedCourses = await Enrollment.countDocuments({ status: 'completed' });
    const activeCourses = await Course.countDocuments();

    const courses = await Course.find().select('title students');
    const popularCourses = courses.sort((a, b) => b.students.length - a.students.length).slice(0, 5);

    const enrollmentTrends = await Enrollment.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$enrollmentDate' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 30 }
    ]);

    const completionRate = ((completedCourses / totalEnrollments) * 100).toFixed(2);

    res.json({
      totalEnrollments,
      completedCourses,
      activeCourses,
      completionRate,
      popularCourses,
      enrollmentTrends
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
