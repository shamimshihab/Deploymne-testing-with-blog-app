import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { Typography, Box, Paper, Button, Grid, Stack } from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";

import SimilarPost from "../SimilarPost";
export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, [id]);

  if (!postInfo) return "";
  console.log("outputid", id);
  async function deletePost() {
    const response = await fetch("http://localhost:4000/post/" + id, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to="/" />;
  }
  console.log("clicked1");
  function sanitizeHTML(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }
  const sanitizedContent = sanitizeHTML(postInfo.content);
  return (
    <>
      {/* <div className="post-page">
        <h1>{postInfo.title}</h1>
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className="author">by @{postInfo.author.username}</div>
        {userInfo.id === postInfo.author._id && (
          <div className="edit-row">
            <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Edit this post
            </Link>
          </div>
        )}

        {userInfo.id === postInfo.author._id && (
          <div className="edit-row">
            <Button onClick={deletePost}>Delete this post</Button>
          </div>
        )}
        <div className="image">
          <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </div> */}
      <Paper
        className="home-page-container"
        elevation={3}
        style={{ minHeight: "90vh" }}
      >
        <Grid container spacing={1}>
          <Grid item sm={12} xs={12} md={8} style={{ padding: 5 }}>
            <div className="post-page">
              <Typography
                style={{
                  textAlign: "left",
                  wordWrap: "break-word",
                  maxWidth: "90%",
                }}
              >
                <h1>{postInfo.title}</h1>
              </Typography>{" "}
              <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
              <div className="author">by @{postInfo.author.username}</div>
              {userInfo.id === postInfo.author._id && (
                <Stack
                  direction="row"
                  spacing={3}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    margin: 8,
                  }}
                >
                  <Link to={`/edit/${postInfo._id}`}>
                    <Button
                      variant="contained"
                      style={{ textTransform: "none" }}
                    >
                      <EditIcon /> Edit this post
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    style={{ textTransform: "none", width: "30%" }}
                    onClick={deletePost}
                  >
                    <DeleteForeverIcon />
                    Delete this post
                  </Button>
                </Stack>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: 8,
                  padding: 3,
                }}
              >
                <img
                  className="postImagePhoto"
                  src={`http://localhost:4000/${postInfo.cover}`}
                  alt=""
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",

                  margin: 8,
                  padding: 3,
                }}
              >
                <Typography
                  style={{
                    textAlign: "left",
                    wordWrap: "break-word",
                    maxWidth: "90%",
                  }}
                >
                  {sanitizedContent}
                </Typography>{" "}
              </div>
            </div>
          </Grid>
          <Grid item sm={12} xs={12} md={4} style={{ padding: 8 }}>
            <Typography variant="h6">Post You may like</Typography>
            <Divider />
            <Divider />
            <SimilarPost />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
