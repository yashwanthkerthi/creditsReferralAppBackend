const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const Middleware = require("./middleware/middleware")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// app.use(Middleware)
dotenv.config();

const port = process.env.PORT;

app.use("/", adminRoutes);
app.use("/",userRoutes)

app.listen(port, (req, res) => {
  console.log(`Server listening at ${port}`);
});
