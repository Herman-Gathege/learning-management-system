// frontend/src/features/learner/CourseDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getLearnerCourse,
  enrollInCourse,
} from "../../api/learner";

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLearnerCourse(courseId).then(setData);
  }, [courseId]);

  const handleEnroll = async () => {
    setLoading(true);
    await enrollInCourse(courseId);
    setLoading(false);

    // 👉 go to learning page
    navigate("/learner/my-courses");
  };

  if (!data) return <div className="p-6">Loading...</div>;

  const { course, content } = data;

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-md">{course.title}</h2>
      <p className="mb-sm">Category: {course.category}</p>
      <p className="mb-md">{course.description}</p>

      <h3 className="font-bold mb-sm">Modules Preview</h3>

      {content?.modules?.length ? (
        <ul className="list-disc pl-6 mb-md">
          {content.modules.map((mod, i) => (
            <li key={i}>
              {mod.title} ({mod.lessons?.length || 0} lessons)
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No content yet</p>
      )}

      <button
        className="btn btn-primary"
        onClick={handleEnroll}
        disabled={loading}
      >
        {loading ? "Enrolling..." : "Enroll & Start Learning"}
      </button>
    </div>
  );
}