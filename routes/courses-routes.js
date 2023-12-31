express = require("express");

const router = express.Router();

const { body } = require("express-validator");
const coursesController = require("../controllers/courses-controller");

// Get all courses - Add course
router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(
    [
      body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 2, max: 20 })
        .withMessage("Length must be at least 2 chars"),
      body("price").notEmpty().withMessage("Price is required"),
    ],
    coursesController.addCourse
  );

// Get course - Update course - Delete course
router
  .route("/:courseId")
  .get(coursesController.getCourse)
  .patch(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
