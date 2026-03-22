// frontend/src/features/learner/CoursePlayer.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCourseContent,
  markLessonComplete,
} from "../../api/learner";

export default function CoursePlayer() {
  const { courseId } = useParams();

  const [content, setContent] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    getCourseContent(courseId).then(setContent);
  }, [courseId]);

  const handleComplete = async (moduleIndex, lessonIndex) => {
    await markLessonComplete({
      course_id: Number(courseId),
      module_index: moduleIndex,
      lesson_index: lessonIndex,
    });

    alert("Lesson marked complete");
  };

  if (!content) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <h3 className="font-bold mb-sm">Course Content</h3>

        {content.modules?.map((mod, i) => (
          <div key={i} className="mb-md">
            <h4 className="font-bold">{mod.title}</h4>

            <ul className="pl-4">
              {mod.lessons?.map((lesson, j) => (
                <li
                  key={j}
                  className="cursor-pointer hover:underline"
                  onClick={() =>
                    setActiveLesson({ ...lesson, i, j })
                  }
                >
                  {lesson.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {activeLesson ? (
          <>
            <h2 className="font-bold mb-md">
              {activeLesson.title}
            </h2>

            {activeLesson.type === "video" ? (
              <iframe
                src={activeLesson.content}
                className="w-full h-64 mb-md"
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