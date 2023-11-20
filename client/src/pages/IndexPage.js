import Post from "../Post";
import { useEffect, useState } from "react";

import { Typography, Paper, Button, Box } from "@mui/material";
export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://react-blog-test-5r9p.onrender.com/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      <Paper className="home-page-container" style={{ minHeight: "89vh" }}>
        {posts.length > 0 && posts.map((post) => <Post {...post} />)}
      </Paper>
    </>
  );
}
