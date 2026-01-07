const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// IMPORTANT for cookies
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,
  })
);

app.get("/api/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working 🚀",
  });
});

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/vehicles", require("./routes/vehicle.routes"));
app.use("/api/parking", require("./routes/parking.routes"));
app.use("/auth", require("./routes/auth.routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
