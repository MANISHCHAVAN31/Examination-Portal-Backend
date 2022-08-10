const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { seq } = require("./repository/database");

// connecting to database
const connectDatabase = async () => {
  try {
    await seq.authenticate();
    console.log("DATABASE CONNECTION HAS BEEN ESTABLISHED SUCCESSFULLY");
  } catch (error) {
    console.log("UNABLE TO CONNECT DATABASE: ", error);
  }
};
connectDatabase();

// middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

// routes
const userRoute = require("./routes/userRoute");
const technologyRoute = require("./routes/technologyRoute");
const stackRoute = require("./routes/stackRoutes");
const questionRoute = require("./routes/questionRoutes");
const testRoute = require("./routes/testRoutes");
const authRoute = require("./routes/authRoutes");
const cookieRoute = require("./routes/cookieRoutes");

app.use("/", userRoute);
app.use("/", technologyRoute);
app.use("/", stackRoute);
app.use("/", questionRoute);
app.use("/", testRoute);
app.use("/", authRoute);
app.use("/", cookieRoute);

// running server
const port = 9000;
app.listen(port, () => {
  console.log(`Server is running on port 9000`);
});
