import { useEffect, useState } from "react";
import { getCourses } from "../../api/courses";
import { useNavigate } from "react-router-dom";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-md">All Courses</h2>

      {courses.map((course) => (
        <div
          key={course.id}
          className="card p-md mb-sm cursor-pointer hover:shadow-md"
          onClick={() => navigate(`/admin/courses/${course.id}`)}
        >
          <h3 className="text-bold">{course.title}</h3>
          <p>{course.description}</p>

          {/* Actions */}
          <div className="flex gap-sm mt-sm">
            <button
              className="btn btn-secondary"
              onClick={(e) => {
                e.stopPropagation(); // 🚨 prevents card click
                navigate(`/admin/courses/${course.id}/content`);
              }}
            >
              Add Content
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}