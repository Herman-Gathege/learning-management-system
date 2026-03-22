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
    <div className="p-6">
      <h2 className="text-lg font-bold mb-md">My Courses</h2>

      <div className="grid grid-cols-3 gap-md">
        {courses.map((course) => (
          <div
            key={course.id}
            className="card p-md cursor-pointer hover:shadow-md"
            onClick={() =>
              navigate(`/learner/learn/${course.id}`)
            }
          >
            <h3 className="font-bold">{course.title}</h3>
            <p className="text-muted">{course.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}