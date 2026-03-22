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

  // Add new module
  const addModule = () => {
    setModules([
      ...modules,
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
  };

  // Add lesson to module
  const addLesson = (modIndex) => {
    const updated = [...modules];

    updated[modIndex].lessons.push({
      title: "",
      type: "text",
      content: "",
    });

    setModules(updated);
  };

  // Update module title
  const updateModuleTitle = (modIndex, value) => {
    const updated = [...modules];
    updated[modIndex].title = value;
    setModules(updated);
  };

  // Update lesson field
  const updateLesson = (modIndex, lessonIndex, field, value) => {
    const updated = [...modules];
    updated[modIndex].lessons[lessonIndex][field] = value;
    setModules(updated);
  };

  // Save modules to backend
  const handleSubmit = async () => {
    try {
      await addCourseContent(courseId, { modules });

      alert("✅ Content saved successfully!");

      // reset form
      setModules([
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
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save content");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-md">Add Course Content</h2>

      {modules.map((mod, modIndex) => (
        <div key={modIndex} className="card mb-md p-md">

          {/* Module Header */}
          <h3 className="font-bold mb-sm">
            Module {modIndex + 1}
          </h3>

          {/* Module Title */}
          <input
            className="input mb-sm"
            placeholder="Module Title"
            value={mod.title}
            onChange={(e) =>
              updateModuleTitle(modIndex, e.target.value)
            }
          />

          {/* Lessons */}
          {mod.lessons.map((lesson, lessonIndex) => (
            <div key={lessonIndex} className="mt-sm p-sm border rounded">

              <p className="font-semibold mb-xs">
                Lesson {lessonIndex + 1}
              </p>

              <input
                className="input mb-xs"
                placeholder="Lesson Title"
                value={lesson.title}
                onChange={(e) =>
                  updateLesson(
                    modIndex,
                    lessonIndex,
                    "title",
                    e.target.value
                  )
                }
              />

              <select
                className="input mb-xs"
                value={lesson.type}
                onChange={(e) =>
                  updateLesson(
                    modIndex,
                    lessonIndex,
                    "type",
                    e.target.value
                  )
                }
              >
                <option value="text">Text Lesson</option>
                <option value="video">Video Lesson</option>
              </select>

              <textarea
                className="input h-24"
                placeholder="Lesson content or video URL"
                value={lesson.content}
                onChange={(e) =>
                  updateLesson(
                    modIndex,
                    lessonIndex,
                    "content",
                    e.target.value
                  )
                }
              />
            </div>
          ))}

          {/* Add Lesson Button */}
          <button
            className="btn btn-secondary mt-sm"
            onClick={() => addLesson(modIndex)}
          >
            + Add Lesson
          </button>

        </div>
      ))}

      {/* Add Module Button */}
      <button
        className="btn btn-secondary mb-md"
        onClick={addModule}
      >
        + Add Module
      </button>

      {/* Save Button */}
      <div>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Save Content
        </button>
      </div>
    </div>
  );
}