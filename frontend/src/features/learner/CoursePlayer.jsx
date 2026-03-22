// frontend/src/features/learner/CoursePlayer.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCourseContent,
  markLessonComplete,
  getCourseProgress
} from "../../api/learner";

export default function CoursePlayer() {
  const { courseId } = useParams();

  const [content, setContent] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    const c = await getCourseContent(courseId);
    const p = await getCourseProgress(courseId);

    setContent(c);
    setProgress(p);
  };

  const handleComplete = async (moduleIndex, lessonIndex) => {
    await markLessonComplete({
      course_id: Number(courseId),
      module_index: moduleIndex,
      lesson_index: lessonIndex,
    });

    await loadCourse();
  };

  if (!content) return <div className="p-6">Loading...</div>;

  /* -----------------------------
     Calculate progress
  ----------------------------- */

  const totalLessons =
    content.modules?.reduce(
      (sum, m) => sum + (m.lessons?.length || 0),
      0
    ) || 0;

  const completedLessons = progress.length;

  const progressPercent =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-1/3 border-r p-4 overflow-y-auto">

        <h3 className="font-bold mb-sm">Course Content</h3>

        {content.modules?.map((mod, i) => (
          <div key={i} className="mb-md">

            <h4 className="font-bold">{mod.title}</h4>

            <ul className="pl-4">

              {mod.lessons?.map((lesson, j) => {

                const completed = progress.find(
                  (p) =>
                    p.module_index === i &&
                    p.lesson_index === j
                );

                return (
                  <li
                    key={j}
                    className={`cursor-pointer hover:underline ${
                      completed ? "text-green-600" : ""
                    }`}
                    onClick={() =>
                      setActiveLesson({ ...lesson, i, j })
                    }
                  >
                    {completed ? "✔ " : ""}
                    {lesson.title}
                  </li>
                );
              })}

            </ul>

          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6">

        {/* Progress Bar */}

        <div className="mb-md">
          <div className="flex justify-between mb-xs text-sm">
            <span>Course Progress</span>
            <span>{progressPercent}%</span>
          </div>

          <div className="w-full bg-gray-200 h-3 rounded">
            <div
              className="bg-blue-600 h-3 rounded transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {activeLesson ? (
          <>
            <h2 className="font-bold mb-md">
              {activeLesson.title}
            </h2>

            {activeLesson.type === "video" ? (
              <iframe
                src={activeLesson.content}
                className="w-full h-64 mb-md"
                title="Lesson Video"
              />
            ) : (
              <p className="mb-md">{activeLesson.content}</p>
            )}

            <button
              className="btn btn-primary"
              onClick={() =>
                handleComplete(activeLesson.i, activeLesson.j)
              }
            >
              Mark Complete
            </button>
          </>
        ) : (
          <p>Select a lesson</p>
        )}
      </div>
    </div>
  );
}