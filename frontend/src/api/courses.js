import { apiFetch } from "./client";

export const createCourse = async (data) => {
  const res = await apiFetch("/api/courses", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getCourses = async () => {
  const res = await apiFetch("/api/courses");
  return res.json();
};

export const addCourseContent = async (courseId, data) => {
  const res = await apiFetch(`/api/courses/${courseId}/content`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return res.json();
};