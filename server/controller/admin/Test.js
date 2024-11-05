const fs = require("fs");
const path = require("path");

exports.getTest = (req, res, next) => {
  res.status(200).json({ message: "Hello World" });
};

exports.getImageTest = (req, res, next) => {
  try {
    const imagePath = path.join(__dirname, '../../', 'upload', 'Book Image', '1722227367830_81KuBRfJwxL._SL1500_.jpg');
    
    if (fs.existsSync(imagePath)) {
      res.setHeader('Content-Type', 'image/png');
      res.sendFile(imagePath);
    } else {
      res.status(404).send('Image not found');
    }
  } catch (error) {
    console.error('Error sending image:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.postTest = (req, res, next) => {
  try {
    const post = req.body;
    const file = req.file;

    console.log("Received post data:", post);
    console.log("Received file:", file);

    // Send a response back to the client
    res.status(200).json({ message: "Post received", data: post, file: file });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.postImageTest = (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
};
