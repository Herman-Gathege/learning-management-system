// frontend/src/features/learner/MyCourses.jsx

import { useEffect, useState } from "react";
import { getMyCourses } from "../../api/learner";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyCourses().then(setCourses);
  }, []);

  return (
    <div className="p-lg flex flex-col gap-lg">

      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-bold">My Courses</h2>
      </div>

      {/* Empty State */}
      {courses.length === 0 ? (
        <div className="card text-center text-muted">
          You haven't enrolled in any courses yet.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-md">

          {courses.map((course) => (
            <div
              key={course.id}
              className="card cursor-pointer hover:shadow-md transition flex flex-col gap-sm"
              onClick={() =>
                navigate(`/learner/learn/${course.id}`)
              }
            >

              <h3 className="text-bold">
                {course.title}
              </h3>

              <p className="text-sm text-muted">
                {course.category}
              </p>

              <button className="btn btn-primary mt-sm">
                Continue Learning
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}