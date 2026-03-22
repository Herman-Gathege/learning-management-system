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
    <div className="p-6">
      <h2 className="text-lg font-bold mb-md">Available Courses</h2>

      <div className="grid grid-cols-3 gap-md">
        {courses.map((course) => (
          <div
            key={course.id}
            className="card p-md cursor-pointer hover:shadow-md"
            onClick={() => navigate(`/learner/courses/${course.id}`)}
          >
            <h3 className="font-bold mb-sm">{course.title}</h3>
            <p className="text-muted mb-sm">
              Category: {course.category}
            </p>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}