import { courses } from "../../services/mockApi";

export default function AcademyPage() {
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="font-display text-3xl">TUAN Live Academy</h2>
        <p className="mt-2 text-sm text-[var(--text-soft)]">
          Browse courses, enroll, join live sessions, and access recordings linked to verified instructors.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <article key={course.id} className="card card-hover">
            <p className="text-xs text-[var(--text-soft)]">{course.level}</p>
            <h3 className="mt-2 font-display text-xl">{course.title}</h3>
            <p className="mt-2 text-sm text-[var(--text-soft)]">Instructor: {course.instructor}</p>
            <p className="mt-1 text-sm text-[var(--text-soft)]">Duration: {course.duration}</p>
            <p className="mt-1 text-sm text-[var(--text-soft)]">Enrolled: {course.enrolled.toLocaleString()}</p>
            <div className="mt-4 flex gap-2">
              <button className="btn-primary text-xs">Enroll</button>
              <button className="btn-ghost text-xs">Join Live</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
