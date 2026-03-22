// frontend/src/features/courses/AddCourseContent.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addCourseContent } from "../../api/courses";

export default function AddCourseContent() {
  const { courseId } = useParams();

  const [modules, setModules] = useState([
    {
      title: "",
      lessons: [
        {
          title: "",
          type: "text",
          content: "",
        },
      ],
    },
  ]);

  const handleSubmit = async () => {
    try {
      await addCourseContent(courseId, { modules });
      alert("Content saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save content");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-md">Add Course Content</h2>

      {modules.map((mod, modIndex) => (
        <div key={modIndex} className="card mb-md p-md">
          <input
            className="input"
            placeholder="Module Title"
            value={mod.title}
            onChange={(e) => {
              const updated = [...modules];
              updated[modIndex].title = e.target.value;
              setModules(updated);
            }}
          />

          {mod.lessons.map((lesson, lessonIndex) => (
            <div key={lessonIndex} className="mt-sm">
              <input
                className="input"
                placeholder="Lesson Title"
                value={lesson.title}
                onChange={(e) => {
                  const updated = [...modules];
                  updated[modIndex].lessons[lessonIndex].title =
                    e.target.value;
                  setModules(updated);
                }}
              />

              <select
                className="input mt-sm mb-sm"
                value={lesson.type}
                onChange={(e) => {
                  const updated = [...modules];
                  updated[modIndex].lessons[lessonIndex].type =
                    e.target.value;
                  setModules(updated);
                }}
              >
                <option value="text">Text</option>
                <option value="video">Video</option>
              </select>

              <textarea
                className="input h-24"
                placeholder="Content / URL"
                value={lesson.content}
                onChange={(e) => {
                  const updated = [...modules];
                  updated[modIndex].lessons[lessonIndex].content =
                    e.target.value;
                  setModules(updated);
                }}
              />
            </div>
          ))}
        </div>
      ))}

      <button className="btn btn-primary" onClick={handleSubmit}>
        Save Content
      </button>
    </div>
  );
}