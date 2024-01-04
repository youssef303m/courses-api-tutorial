const Course = require("../models/course-model");
const { validationResult } = require("express-validator");
const httpStatus = require("../utils/httpStatus");

const getAllCourses = async (req, res) => {
  // Get all courses from DB using Course model
  const courses = await Course.find({}, { __v: false });
  res.json({ status: httpStatus.SUCCESS, data: { courses } });
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({
        status: httpStatus.FAIL,
        data: { course: null },
      });
    }
    return res.json({ status: httpStatus.SUCCESS, data: { course } });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatus.ERROR, message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findById(req.params.courseId);
    await Course.deleteOne({ _id: req.params.courseId });
    if (!deletedCourse) {
      return res.status(404).json({ status: httpStatus.FAIL, data: null });
    }
    return res.status(200).json({ status: httpStatus.SUCCESS, data: null });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatus.ERROR, message: err.message });
  }
};

const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
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
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatus.ERROR, message: err.message });
  }
};

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
