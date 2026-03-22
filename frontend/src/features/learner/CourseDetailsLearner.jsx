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

  if (!data)
    return (
      <div className="p-lg text-center text-muted">
        Loading course...
      </div>
    );

  const { course, content } = data;

  return (
    <div className="p-lg flex flex-col gap-lg max-w-lg">

      {/* Course Card */}
      <div className="card">
        <h2 className="text-xl text-bold mb-sm">
          {course.title}
        </h2>

        <p className="text-sm text-muted mb-sm">
          Category: {course.category}
        </p>

        <p className="text-md mb-md">
          {course.description}
        </p>

        {/* Enroll Button */}
        <button
          className="btn btn-primary"
          onClick={handleEnroll}
          disabled={loading}
        >
          {loading ? "Enrolling..." : "Enroll & Start Learning"}
        </button>
      </div>

      {/* Modules Preview */}
      <div className="card">
        <h3 className="text-lg text-bold mb-md">
          Modules Preview
        </h3>

        {content?.modules?.length ? (
          <ul className="flex flex-col gap-sm">
            {content.modules.map((mod, i) => (
              <li key={i} className="expanded-card">
                <div className="flex justify-between items-center">
                  <span className="text-bold">{mod.title}</span>
                  <span className="text-sm text-muted">
                    {mod.lessons?.length || 0} lessons
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">
            No content available yet.
          </p>
        )}
      </div>

    </div>
  );
}