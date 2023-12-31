const express = require("express");
const bodyParser = require("body-parser");
const coursesRouter = require("./routes/courses-routes");

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.use("/api/courses", coursesRouter);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
