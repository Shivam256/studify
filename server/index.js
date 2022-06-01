const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const port = process.env.PORT;
const cors = require("cors");
app.use(cors());

//using middleware to parse json data
app.use(express.json());

require("./db/conn");
app.use("/user", require("./routes/UserRoutes"));
app.use("/admin", require("./routes/AdminRoutes"));
app.use("/course", require("./routes/CourseRoutes"));


app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
