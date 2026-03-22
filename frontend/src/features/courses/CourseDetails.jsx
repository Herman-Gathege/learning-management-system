import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../../api/client";

export default function CourseDetails() {
  const { courseId } = useParams();

  const [data, setData] = useState(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [activeModule, setActiveModule] = useState(null);

  const loadCourse = async () => {
    const res = await apiFetch(`/api/courses/${courseId}`);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const addLesson = async () => {
    if (!lessonTitle) return;

    await apiFetch(
      `/api/courses/${courseId}/modules/${activeModule}/lessons`,
      {
        method: "POST",
        body: JSON.stringify({
          title: lessonTitle,
          content: lessonContent,
          type: "text",
        }),
      }
    );

    setLessonTitle("");
    setLessonContent("");
    setActiveModule(null);

    await loadCourse();
  };

  if (!data) return <div className="p-6">Loading...</div>;

  const { course, content } = data;

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-md">{course.title}</h2>
      <p className="mb-md">{course.description}</p>

      <h3 className="text-md font-bold mb-sm">All Course Modules</h3>

      {content?.modules?.length ? (
        <table className="w-full border">
          <thead>
            <tr className="border-bottom">
              <th className="text-left p-sm">#</th>
              <th className="text-left p-sm">Module Title</th>
              <th className="text-left p-sm">Lessons</th>
              <th className="text-left p-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {content.modules.map((mod, i) => (
              <tr key={i} className="border-bottom">
                <td className="p-sm">{i + 1}</td>

                <td className="p-sm">{mod.title}</td>

                <td className="p-sm">
                  {mod.lessons?.length ? (
                    <ul className="list-disc pl-4">
                      {mod.lessons.map((lesson, index) => (
                        <li key={index}>
                          Lesson {index + 1}: {lesson.title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-muted">No lessons</span>
                  )}
                </td>

                <td className="p-sm">
                  <button
                    className="btn btn-primary"
                    onClick={() => setActiveModule(i)}
                  >
                    Add Lesson
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No modules yet</p>
      )}

      {activeModule !== null && (
        <div className="card mt-md p-md">
          <h4 className="font-bold mb-sm">
            Add Lesson to Module {activeModule + 1}
          </h4>

          <input
            className="input mb-sm"
            placeholder="Lesson title"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
          />

          <textarea
            className="input h-24 mb-sm"
            placeholder="Lesson content or video URL"
            value={lessonContent}
            onChange={(e) => setLessonContent(e.target.value)}
          />

          <button className="btn btn-primary mr-sm" onClick={addLesson}>
            Save Lesson
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => setActiveModule(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}