express = require("express");

const router = express.Router();

const coursesController = require("../controllers/courses-controller");
const { validationSchema } = require("../middlewares/validationSchemas");

// Get all courses - Add course
router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(validationSchema(), coursesController.addCourse);

// Get course - Update course - Delete course
router
  .route("/:courseId")
  .get(coursesController.getCourse)
  .patch(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
