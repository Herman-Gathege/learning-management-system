// frontend/src/features/learner/CourseList.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLearnerCourses } from "../../api/learner";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLearnerCourses().then(setCourses);
  }, []);

  return (
    <div className="p-lg flex flex-col gap-lg">

      <div className="flex justify-between items-center">
        <h2 className="text-xl text-bold">Available Courses</h2>
      </div>

      {courses.length === 0 ? (
        <div className="card text-center text-muted">
          No courses available
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-md">

          {courses.map((course) => (
            <div
              key={course.id}
              className="card cursor-pointer hover:shadow-md transition"
              onClick={() => navigate(`/learner/courses/${course.id}`)}
            >
              <h3 className="text-bold mb-sm">
                {course.title}
              </h3>

              <p className="text-sm text-muted mb-sm">
                Category: {course.category}
              </p>

              <p className="text-sm mb-md">
                {course.description}
              </p>

              <button className="btn btn-secondary">
                View Course
              </button>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}