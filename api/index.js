const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const Review = require("./models/Review");
const AboutMe = require("./models/AboutMe");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345werjktjwertkj";

app.use(
  cors({ credentials: true, origin: "https://test-seven-gamma-80.vercel.app" })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(
  "mongodb+srv://shamimshihab56:shihabblog56@cluster0.pgwf0fs.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
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
  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        })
        .json({
          id: userDoc._id,
          username,
        });
    });
  } else {
    res.status(400).json("wrong credentials");
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

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);

      const { title, content } = req.body;
      const postDoc = await Post.create({
        title,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json(postDoc);
    });
  } catch (error) {
    console.error("Error in /post route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await postDoc.update({
      title,

      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });
});

// app.delete("/post/:id", async (req, res) => {
//   const postId = req.params.id;

//   try {
//     await Post.findByIdAndDelete(postId);
//     res.json({ message: "Post deleted successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while deleting the post" });
//   }
// });

app.delete("/post/:id", uploadMiddleware.single("file"), async (req, res) => {
  const { token } = req.cookies;
  try {
    jwt.verify(token, secret, {}, async (err, info) => {
      const { id } = req.params;
      if (err) throw err;
      const postDoc = await Post.findById(id);
      const isAuthor =
        postDoc && postDoc.author && postDoc.author.equals(info.id);
      if (!isAuthor) {
        return res.status(400).json("You are not the author");
      }

      await Post.findByIdAndDelete(id);
      res.json({ message: "Post deleted successfully" });
    });
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

// app.get("/post/:id", async (req, res) => {
//   const { id } = req.params;
//   const postDoc = await Post.findById(id).populate("author", ["username"]);
//   res.json(postDoc);
// });

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id)
    .populate({
      path: "author",
      select: ["username"],
    })
    .populate({
      path: "review",
      options: { sort: { createdAt: -1 } },
    });

  res.json(postDoc);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id)
    .populate({
      path: "author",
      select: ["username"],
    })
    .populate({
      path: "review",
      options: { sort: { createdAt: -1 } },
    });

  res.json(postDoc);
});

app.post(
  "/post/:id/review/addNew",
  uploadMiddleware.single("file"),
  async (req, res) => {
    try {
      const { token } = req.cookies;

      console.log(" req.cookies", req.cookies);

      const { id } = req.params;
      const comment = req.body.comment;

      console.log("token", token);

      jwt.verify(token, secret, {}, async (err, info) => {
        console.log("infoID", info);
        const findPost = await Post.findById(id).exec();
        const reviewDoc = await Review.create({
          comment,
          author: info.username,
          authorID: info.id,
        });

        findPost.review.push(reviewDoc);
        const pushReviewToPost = await findPost.save();

        res.json(reviewDoc);
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the post" });
    }
  }
);

app.delete("/post/:postId/review/:reviewId", async (req, res) => {
  try {
    const { postId, reviewId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    post.review.pull(reviewId);

    await post.save();

    await Review.findByIdAndDelete(reviewId);

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the review" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
