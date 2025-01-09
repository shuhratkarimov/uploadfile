const express = require("express");
const path = require("path");
require("dotenv").config();
const multer = require("multer");
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category || "default";
    const uploadPath = path.join(__dirname, "upload", category);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const category = req.body.category || "default";
    cb(null, `${category}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("picture"), (req, res) => {
  if (!req.body.category) {
    return res.status(400).json({ message: "Category is required" });
  }

  res.json({
    message: "Successfully added!",
  });
});

app.get("/getFolders", (req, res) => {
  const uploadPath = path.join(__dirname, "upload");
  fs.readdir(uploadPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(500).send("Xatolik yuz berdi");
    }
    const folders = files
      .filter((file) => file.isDirectory())
      .map((file) => file.name);
    res.json(folders);
  });
});

app.get("/getImages", (req, res) => {
  const folder = req.query.folder;
  const folderPath = path.join(__dirname, "upload", folder);

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("Xatolik yuz berdi");
    }
    const images = files
      .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map((file) => `/upload/${folder}/${file}`);
    res.json(images);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
