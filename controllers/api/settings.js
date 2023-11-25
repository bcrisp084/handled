const router = require("express").Router();
const { user, todo, note, images } = require("../../models");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__basedir}/public/images`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    console.log("req.file", req.file);
    if (req.file == undefined) {
      return res.send("Please choose a file to upload");
    }
    console.log("req.body", req.file);
    const addImage = await images.create({
      name: req.file.filename,
      user_id: req.session.user_id,
    });
    res.status(200).json(addImage);
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
});

module.exports = router;
