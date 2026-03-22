import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../../api/client";

export default function CourseDetails() {
  const { courseId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await apiFetch(`/api/courses/${courseId}`);
      const json = await res.json();
      setData(json);
    };

    fetchCourse();
  }, [courseId]);

  if (!data) return <div className="p-6">Loading...</div>;

  const { course, content } = data;

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-md">{course.title}</h2>
      <p className="mb-md">{course.description}</p>

      <h3 className="text-md font-bold mb-sm">All Modules</h3>

      {content?.modules?.length ? (
        <table className="w-full border">
          <thead>
            <tr className="border-bottom">
              <th className="text-left p-sm">#</th>
              <th className="text-left p-sm">Module Title</th>
              <th className="text-left p-sm">Lessons</th>
            </tr>
          </thead>

          <tbody>
            {content.modules.map((mod, i) => (
              <tr
                key={i}
                className="border-bottom cursor-pointer hover:bg-gray-100"
                onClick={() => console.log("Clicked module:", mod)}
              >
                <td className="p-sm">{i + 1}</td>
                <td className="p-sm">{mod.title}</td>
                <td className="p-sm">{mod.lessons?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No modules yet</p>
      )}
    </div>
  );
}
