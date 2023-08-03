import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import superAdminRouter from "./routes/superAdmin.routes.js";
import adminRouter from "./routes/admin.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "hi!" });
});

app.use("/api/v1/superAdmins", superAdminRouter);
app.use("/api/v1/admins", adminRouter);

const startServer = async () => {
  try {
    //connect to the database...
    connectDB(process.env.MONGODB_URL);

    app.listen(8080, () => {
      console.log("Server started on port http://localhost:8080");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
