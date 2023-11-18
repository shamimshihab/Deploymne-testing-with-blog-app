const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const AboutMe = require("./models/AboutMe");
const argon2 = require("argon2"); // Replacing bcrypt with argon2
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
// const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const PORT = process.env.PORT || 4000; 
const secret = "asdfe45we45w345wegw345werjktjwertkj";

app.use(cors({ credentials: true, origin: "https://test-zsx7.vercel.app" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(
  "mongodb+srv://shamimshihab56:shihabblog56@cluster0.pgwf0fs.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await argon2.hash(password); // Hashing the password using argon2
    const userDoc = await User.create({
      username,
      password: hashedPassword,
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    return res.status(400).json("User not found");
  }
  try {
    const passOk = await argon2.verify(userDoc.password, password);
    if (passOk) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json("Wrong credentials");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

// app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
//   let cover = "";

//   if (req.file) {
//     const { originalname, path } = req.file;
//     const parts = originalname.split(".");
//     const ext = parts[parts.length - 1];
//     const newPath = path + "." + ext;
//     fs.renameSync(path, newPath);
//     cover = newPath;
//   }

//   const { token } = req.cookies;
//   jwt.verify(token, secret, {}, async (err, info) => {
//     if (err) throw err;
//     const { title, content } = req.body;
//     const postDoc = await Post.create({
//       title,
//       content,
//       cover,
//       author: info.id,
//     });
//     res.json(postDoc);
//   });
// });
app.get("/aboutMe", async (req, res) => {
  try {
    const aboutMe = await AboutMe.findOne();
    if (aboutMe) {
      res.json({ description: aboutMe.description });
    } else {
      res.status(404).json({ error: "AboutMe information not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
//   let newPath = null;
//   if (req.file) {
//     const { originalname, path } = req.file;
//     const parts = originalname.split(".");
//     const ext = parts[parts.length - 1];
//     newPath = path + "." + ext;
//     fs.renameSync(path, newPath);
//   }

//   const { token } = req.cookies;
//   jwt.verify(token, secret, {}, async (err, info) => {
//     if (err) throw err;
//     const { id, title, summary, content } = req.body;
//     const postDoc = await Post.findById(id);
//     const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
//     if (!isAuthor) {
//       return res.status(400).json("you are not the author");
//     }
//     await postDoc.update({
//       title,
//       summary,
//       content,
//       cover: newPath ? newPath : postDoc.cover,
//     });

//     res.json(postDoc);
//   });
// });

app.delete("/post/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    await Post.findByIdAndDelete(postId);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the post" });
  }
});
app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.get("/", (req, res) => {
  res.send("Hello, this is your Express server running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
