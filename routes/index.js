const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/upload", (req, res) => {
  const dirPath = path.join(__dirname, "..", "/uploads");
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  let form = new formidable.IncomingForm({
    uploadDir: dirPath,
    keepExtensions: true,
  });
  form.parse(req, function (err, fields, files) {
    res.json({
      files,
    });
  });
});

module.exports = router;
