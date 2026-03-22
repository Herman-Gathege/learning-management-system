// frontend/src/api/learner.js

import { apiFetch } from "./client";

//
// 📚 COURSES
//

// Get all available courses (by organization)
export const getLearnerCourses = async () => {
  const res = await apiFetch("/api/learner/courses");
  return res.json();
};

// Get single course (basic info + modules preview)
export const getLearnerCourse = async (courseId) => {
  const res = await apiFetch(`/api/learner/courses/${courseId}`);
  return res.json();
};

//
// 🎯 ENROLLMENT
//

export const enrollInCourse = async (courseId) => {
  const res = await apiFetch(
    `/api/learner/courses/${courseId}/enroll`,
    {
      method: "POST",
    }
  );

  return res.json();
};

// Get my enrolled courses
export const getMyCourses = async () => {
  const res = await apiFetch("/api/learner/my-courses");
  return res.json();
};

//
// 📦 COURSE CONTENT (PROTECTED)
//

export const getCourseContent = async (courseId) => {
  const res = await apiFetch(
    `/api/learner/courses/${courseId}/content`
  );
  return res.json();
};

//
// 📊 PROGRESS
//

// Mark lesson as completed
export const markLessonComplete = async ({
  course_id,
  module_index,
  lesson_index,
}) => {
  const res = await apiFetch("/api/learner/progress", {
    method: "POST",
    body: JSON.stringify({
      course_id,
      module_index,
      lesson_index,
    }),
  });

  return res.json();
};

// Get progress for a course
export const getCourseProgress = async (courseId) => {
  const res = await apiFetch(
    `/api/learner/progress/${courseId}`
  );
  return res.json();
};