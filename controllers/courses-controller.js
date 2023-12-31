let { courses } = require("../data/courses");

const { validationResult } = require("express-validator");

const getAllCourses = (req, res) => {
  res.json(courses);
};

const getCourse = (req, res) => {
  console.log(req.params);
  const reqCourseId = +req.params.courseId;
  const course = courses.find((course) => course.id === reqCourseId);
  if (!course) {
    res.status(404).json({ msg: "Course Not Found" });
  }
  res.json(course);
};

const deleteCourse = (req, res) => {
  const reqCourseId = +req.params.courseId;
  const deletedCourse = courses.find((course) => course.id === reqCourseId);
  courses = courses.filter((course) => course.id !== reqCourseId);
  res.status(200).json(deletedCourse);
};

const updateCourse = (req, res) => {
  const reqCourseId = +req.params.courseId;
  let course = courses.find((course) => course.id === reqCourseId);

  if (!course) {
    return res.status(404).json({ msg: "Course not found" });
  }

  course = { ...course, ...req.body };

  res.status(200).json(course);
};

const addCourse = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  courses.push({ id: courses.length + 1, ...req.body });
  res.status(201).json(req.body);
};

module.exports = {
  getAllCourses,
  getCourse,
  deleteCourse,
  updateCourse,
  addCourse,
};
