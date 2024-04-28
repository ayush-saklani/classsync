import { app } from "./app.js";
import mongoose from "mongoose";

app.get("/", (req, res) => {
  res.send("hello world");
});

const DB = process.env.DBURI.replace("<password>", process.env.DBPASSWORD);
mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB connection is successful");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
