import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

import {
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  AlertTitle,
  FormLabel,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Paper,
  Input,
  Box,
} from "@mui/material";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("https://test-rzr2.vercel.app/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("https://test-rzr2.vercel.app/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <Paper
      className="home-page-container"
      elevation={3}
      style={{ minHeight: "90vh", padding: 20 }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <form onSubmit={updatePost}>
          <TextField
            label="Write Your Title Here"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            style={{ marginBottom: "10px" }}
          />
          {/* <input
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        /> */}
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "10px", border: "1px solid" }}
          >
            <Input type="file" onChange={(ev) => setFiles(ev.target.files)} />
          </FormControl>
          <Editor onChange={setContent} value={content} />
          style={{ textTransform: "none", marginTop: 10 }}
        </form>
      </Box>
    </Paper>
  );
}
