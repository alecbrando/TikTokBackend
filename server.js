import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import Videos from "./dbModel.js";
import cors from "cors";

//app config
const app = express();
const port = 9000;

//middlewares
app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"),
//     res.header("Access-Control-Allow-Headers", "*"),
//     next();
// });
//DB config
const connectionURL =
  "mongodb+srv://admin:mypassword@cluster0.cymw9.mongodb.net/tiktokclone?retryWrites=true&w=majority";
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});
//api endpoints

app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/v2/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/v1/posts", (req, res) => res.status(200).send(data));
app.post("/v2/posts", (req, res) => {
  // POST request is to ADD DATA to database
  //It will let us ADD a video DOCUMENT to the videos COLLECTION
  console.log(req.body);
  const dbVideos = req.body;

  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
//listener
app.listen(port, () => console.log("listening on local host", port));
