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

  <div
    className="grid"
    style={{
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "16px",
    }}
  >
    {courses.map((course) => (
      <div
        key={course.id}
        className="card"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "200px",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onClick={() => navigate(`/admin/courses/${course.id}`)}
      >
        <div>
          <h3 className="text-lg text-bold mb-sm">{course.title}</h3>

          <span
            style={{
              background: "#dee0e4",
              color: "#2563eb",
              padding: "4px 10px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: "600",
              display: "inline-block",
              marginBottom: "8px",
            }}
          >
            {course.category}
          </span>

          <p className="text-sm text-muted">
            {course.description || "No description"}
          </p>
        </div>

        <div className="flex gap-sm mt-md">
          <button
            className="btn btn-secondary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/courses/${course.id}/content`);
            }}
          >
            Add Module
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}
