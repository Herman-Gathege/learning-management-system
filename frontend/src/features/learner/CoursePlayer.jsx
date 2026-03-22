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
  const [openModules, setOpenModules] = useState({});

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    const c = await getCourseContent(courseId);
    const p = await getCourseProgress(courseId);

    setContent(c);
    setProgress(p);
  };

  const toggleModule = (index) => {
    setOpenModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleComplete = async (moduleIndex, lessonIndex) => {
    await markLessonComplete({
      course_id: Number(courseId),
      module_index: moduleIndex,
      lesson_index: lessonIndex,
    });

    await loadCourse();
  };

  if (!content)
    return (
      <div className="p-lg text-center text-muted">
        Loading course...
      </div>
    );

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
      <div className="w-1/3 border-r p-lg overflow-y-auto flex flex-col gap-md">

        <h3 className="text-lg text-bold">
          Course Content
        </h3>

        {content.modules?.map((mod, i) => (
          <div key={i} className="expanded-card">

            {/* Module Header */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleModule(i)}
            >
              <h4 className="text-bold">
                {mod.title}
              </h4>

              <span className="text-sm text-muted">
                {openModules[i] ? "▲" : "▼"}
              </span>
            </div>

            {/* Lessons */}
            {openModules[i] && (
              <ul className="flex flex-col gap-xs mt-sm">

                {mod.lessons?.map((lesson, j) => {

                  const completed = progress.find(
                    (p) =>
                      p.module_index === i &&
                      p.lesson_index === j
                  );

                  return (
                    <li
                      key={j}
                      className={`cursor-pointer text-sm ${
                        completed
                          ? "text-green-600"
                          : "hover:underline"
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
            )}

          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-lg flex flex-col gap-md">

        {/* Progress Bar */}
        <div className="card">

          <div className="flex justify-between mb-sm text-sm">
            <span className="text-bold">
              Course Progress
            </span>
            <span className="text-muted">
              {progressPercent}%
            </span>
          </div>

          <div className="w-full bg-gray-200 h-3 rounded">
            <div
              className="bg-blue-600 h-3 rounded transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

        </div>

        {/* Lesson Content */}
        {activeLesson ? (
          <div className="card">

            <h2 className="text-xl text-bold mb-md">
              {activeLesson.title}
            </h2>

            {activeLesson.type === "video" ? (
              <iframe
                src={activeLesson.content}
                className="w-full h-72 mb-md"
                title="Lesson Video"
              />
            ) : (
              <p className="mb-md">
                {activeLesson.content}
              </p>
            )}

            <button
              className="btn btn-primary"
              onClick={() =>
                handleComplete(activeLesson.i, activeLesson.j)
              }
            >
              Mark Complete
            </button>

          </div>
        ) : (
          <div className="card text-center text-muted">
            Select a lesson from the sidebar to start learning
          </div>
        )}

      </div>

    </div>
  );
}