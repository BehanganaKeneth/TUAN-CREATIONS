import express from 'express';
import { Enrollment, Course, Quiz, QuizResult, ForumThread, ForumReply, StudyGroup, Certificate, Recording } from '../../models.js';

const router = express.Router();

// Enrollment endpoints
router.post('/enrollments', async (req, res) => {
  try {
    const { courseId } = req.body;
    const enrollment = new Enrollment({ student: req.userId, course: courseId });
    await enrollment.save();
    await Course.findByIdAndUpdate(courseId, { $push: { students: req.userId } });
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/enrollments/me', async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.userId }).populate('course');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Course endpoints
router.get('/courses/:courseId', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate('instructor');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Progress endpoints
router.post('/enrollments/:enrollmentId/progress', async (req, res) => {
  try {
    const { completedLessons, currentLesson, overallProgress } = req.body;
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.enrollmentId,
      {
        $set: {
          'progress.completedLessons': completedLessons,
          'progress.currentLesson': currentLesson,
          'progress.overallProgress': overallProgress,
          'progress.lastAccessDate': new Date()
        }
      },
      { new: true }
    );
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/enrollments/me/progress', authMiddleware, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.userId });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Recording endpoints
router.get('/courses/:courseId/recordings', async (req, res) => {
  try {
    const recordings = await Recording.find({ course: req.params.courseId });
    res.json(recordings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Course completion and certificates
router.post('/courses/:courseId/complete-course', authMiddleware, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({ course: req.params.courseId, student: req.userId });
    if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });

    enrollment.status = 'completed';
    enrollment.progress.overallProgress = 100;
    await enrollment.save();

    const certificate = new Certificate({
      user: req.userId,
      course: req.params.courseId,
      certificateNumber: `CERT-${Date.now()}`,
      grade: 'A'
    });
    await certificate.save();

    enrollment.certificateId = certificate._id;
    await enrollment.save();

    res.json({ enrollment, certificate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/certificates/me', authMiddleware, async (req, res) => {
  try {
    const certificates = await Certificate.find({ user: req.userId }).populate('course', 'title');
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Quiz endpoints
router.get('/courses/:courseId/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ course: req.params.courseId });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/quizzes/:quizId', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/quizzes/:quizId/submit', authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    let score = 0;
    answers.forEach((answer, index) => {
      if (quiz.questions[index] && answer === quiz.questions[index].correctAnswer) {
        score += quiz.questions[index].points;
      }
    });

    const totalPoints = quiz.questions.reduce((sum, q) => sum + (q.points || 1), 0);
    const percentage = (score / totalPoints) * 100;
    const passed = percentage >= quiz.passingScore;

    const result = new QuizResult({
      quiz: req.params.quizId,
      student: req.userId,
      answers,
      score,
      percentage,
      passed
    });
    await result.save();

    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/quizzes/:quizId/results', authMiddleware, async (req, res) => {
  try {
    const results = await QuizResult.find({ quiz: req.params.quizId, student: req.userId });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Forum endpoints
router.get('/courses/:courseId/forums/threads', async (req, res) => {
  try {
    const threads = await ForumThread.find({ course: req.params.courseId }).populate('author', 'name profile.avatar');
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/forums/threads', authMiddleware, async (req, res) => {
  try {
    const { courseId, title, content, category } = req.body;
    const thread = new ForumThread({
      course: courseId,
      title,
      content,
      category,
      author: req.userId
    });
    await thread.save();
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/forums/:threadId/replies', async (req, res) => {
  try {
    const replies = await ForumReply.find({ thread: req.params.threadId }).populate('author', 'name profile.avatar');
    res.json(replies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/forums/:threadId/replies', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const reply = new ForumReply({
      thread: req.params.threadId,
      author: req.userId,
      content
    });
    await reply.save();
    res.json(reply);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Study Group endpoints
router.get('/courses/:courseId/study-groups', async (req, res) => {
  try {
    const groups = await StudyGroup.find({ course: req.params.courseId }).populate('leader', 'name profile.avatar').populate('members', 'name');
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/study-groups', authMiddleware, async (req, res) => {
  try {
    const { name, description, courseId, topic } = req.body;
    const group = new StudyGroup({
      name,
      description,
      course: courseId,
      topic,
      leader: req.userId,
      members: [req.userId]
    });
    await group.save();
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/study-groups/:groupId/join', authMiddleware, async (req, res) => {
  try {
    const group = await StudyGroup.findByIdAndUpdate(
      req.params.groupId,
      { $push: { members: req.userId } },
      { new: true }
    );
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mentorship endpoints
router.get('/mentorship/partners', authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.query;
    const otherEnrollments = await Enrollment.find({ course: courseId, student: { $ne: req.userId } }).populate('student', 'name profile');
    res.json(otherEnrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
