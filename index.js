const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const memberRoutes = require("./routes/member");

const client = require("./configs/db");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/member", memberRoutes);

const port = 3300;
const start = async () => {
  try {
    await client.connect();
    app.listen(port, () => {
      console.log(`sever running on ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
