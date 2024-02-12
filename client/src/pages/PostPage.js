import { useContext, useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Stack,
  TextField,
} from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";

import SimilarPost from "../SimilarPost";
export default function PostPage() {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  const [reloadData, setReloadData] = useState(false);
  useEffect(() => {
    fetch(`https://react-blog-test-5r9p.onrender.com/post/${id}`).then(
      (response) => {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      }
    );
  }, [id, reloadData]);

  if (!postInfo) return "";
  console.log("outputid", id);
  async function deletePost() {
    const response = await fetch(
      "https://react-blog-test-5r9p.onrender.com/post/" + id,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

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

  const reviewDelete = async (ev, reviewId) => {
    ev.preventDefault();

    const response = await fetch(
      `https://react-blog-test-5r9p.onrender.com/post/${id}/review/${reviewId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (response.ok) {
      // window.location.reload();
      setReloadData(true);
      navigate(`/post/${id}`);
    }
    console.log("review deleted");
  };

  const handleSave = async (ev) => {
    ev.preventDefault();

    if (comment.trim() !== "") {
      // Perform save operation

      const response = await fetch(
        `https://react-blog-test-5r9p.onrender.com/post/${id}/review/addNew`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
          credentials: "include",
        }
      );

      if (response.ok) {
        // Wait for the new comment to be added, then fetch the updated post information
        await fetch(
          `https://react-blog-test-5r9p.onrender.com/post/${id}`
        ).then((response) => {
          if (response.ok) {
            response.json().then((postInfo) => {
              setPostInfo(postInfo);
            });
          }
        });
        setComment("");
        navigate(`/post/${id}`);
      }
    }
  };
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  function formatDate(dateString) {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  }
  return (
    <>
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
              </Typography>
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
                  src={`https://react-blog-test-5r9p.onrender.com/${postInfo.cover}`}
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
                </Typography>
              </div>
              {userInfo.id && (
                <div style={{ margin: 8, padding: 3 }}>
                  <form>
                    <TextField
                      required
                      label="Write your comment"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={3}
                      value={comment}
                      onChange={handleCommentChange}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                      style={{ marginTop: "1rem" }}
                    >
                      Save
                    </Button>
                  </form>
                </div>
              )}
            </div>
            <div style={{ margin: 8, padding: 3 }}>
              <Box style={{ marginTop: "1.5rem" }}>
                {postInfo.review?.map((review) => (
                  <Stack
                    key={review._id}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    marginBottom={2}
                    padding={2}
                    border={1}
                    borderColor="grey.300"
                  >
                    <Stack direction="column" style={{ width: "10%" }}>
                      <Avatar />
                    </Stack>
                    <Stack
                      style={{
                        width: "90%",
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        style={{
                          marginBottom: "0.3rem",
                          whiteSpace: "normal",
                          overflowWrap: "break-word",
                        }}
                      >
                        {review.author}
                      </Typography>
                      <Typography
                        style={{
                          marginBottom: "0.2rem",
                          whiteSpace: "normal",
                          overflowWrap: "break-word",
                        }}
                      >
                        {review.comment}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ marginBottom: "0.2rem" }}
                      >
                        {formatDate(review.createdAt)}
                      </Typography>
                      {userInfo.id === review.authorID && (
                        <button
                          style={{ maxWidth: "15%" }}
                          onClick={(ev) => {
                            reviewDelete(ev, review._id);
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </Stack>
                  </Stack>
                ))}
              </Box>
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
