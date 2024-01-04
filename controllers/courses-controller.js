const Course = require("../models/course-model");
const { validationResult } = require("express-validator");
const httpStatus = require("../utils/httpStatus");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getAllCourses = async (req, res) => {
  // Pagination using query parameters
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  // Get all courses from DB using Course model
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatus.SUCCESS, data: { courses } });
};

const getCourse = asyncWrapper(async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    return res.status(404).json({
      status: httpStatus.FAIL,
      data: { course: null },
    });
  }
  return res.json({ status: httpStatus.SUCCESS, data: { course } });
});

const deleteCourse = asyncWrapper(async (req, res) => {
  const deletedCourse = await Course.findById(req.params.courseId);
  await Course.deleteOne({ _id: req.params.courseId });
  if (!deletedCourse) {
    return res.status(404).json({ status: httpStatus.FAIL, data: null });
  }
  return res.status(200).json({ status: httpStatus.SUCCESS, data: null });
});

const updateCourse = asyncWrapper(async (req, res) => {
  const courseId = req.params.courseId;
  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      $set: { ...req.body },
    },
    { returnDocument: "after" }
  );

  if (!updatedCourse) {
    return res
      .status(404)
      .json({ status: httpStatus.FAIL, data: { course: null } });
  }

  return res
    .status(200)
    .json({ status: httpStatus.SUCCESS, data: { course: updatedCourse } });
});

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: httpStatus.FAIL, data: errors.array() });
  }

  const newCourse = new Course(req.body);
  // Save the created course to the db
  await newCourse.save();

  return res
    .status(201)
    .json({ status: httpStatus.SUCCESS, data: { course: newCourse } });
};

module.exports = {
  getAllCourses,
  getCourse,
  deleteCourse,
  updateCourse,
  addCourse,
};
