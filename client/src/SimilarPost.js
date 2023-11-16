import SimilarPostItem from "./SimilarPostItem";
import { useEffect, useState } from "react";

import { Typography, Box, Paper, Button } from "@mui/material";
export default function SimilarPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://test-rzr2.vercel.app/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.slice(0, 5).map((post) => <SimilarPostItem {...post} />)}
    </>
  );
}
