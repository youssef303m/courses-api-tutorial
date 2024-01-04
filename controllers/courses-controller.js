const Course = require("../models/course-model");
const { validationResult } = require("express-validator");

const getAllCourses = async (req, res) => {
  // Get all courses from DB using Course model
  const courses = await Course.find();
  res.json(courses);
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course Not Found" });
    }
    return res.json(course);
  } catch (err) {
    return res.status(400).json({ msg: "Invalid Object ID" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findById(req.params.courseId);
    await Course.deleteOne({ _id: req.params.courseId });
    if (!deletedCourse) {
      return res.status(404).json({ msg: "Course Not Found" });
    }
    return res.status(200).json(deletedCourse);
  } catch (err) {
    return res.status(400).json({ msg: "Invalid Object ID" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $set: { ...req.body },
      },
      { returnDocument: "after" }
    );

    if (!updatedCourse) {
      return res.status(404).json({ msg: "Course not found" });
    }

    return res.status(200).json(updatedCourse);
  } catch (err) {
    return res.status(400).json({ msg: "Invalid Object ID" });
  }
};

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const newCourse = new Course(req.body);
  // Save the created course to the db
  await newCourse.save();

  res.status(201).json(newCourse);
};

module.exports = {
  getAllCourses,
  getCourse,
  deleteCourse,
  updateCourse,
  addCourse,
};
