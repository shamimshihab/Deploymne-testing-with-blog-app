import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
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
  Box,
  Paper,
  Input,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
export default function CreatePost() {
  const [title, setTitle] = useState("");
  // const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    console.log("enter");
    const data = new FormData();
    data.set("title", title);
    // data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    ev.preventDefault();
    const response = await fetch(
      "https://mern-crud-blog-app.onrender.com/post",
      {
        method: "POST",
        body: data,
        credentials: "include",
      }
    );
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <Paper
      className="home-page-container"
      style={{
        minHeight: "89vh",

        padding: 10,
      }}
      elevation={3}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <form onSubmit={createNewPost}>
          <TextField
            label="Write Your Title Here"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            style={{ marginBottom: "10px" }}
          />

          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "10px", border: "1px solid" }}
          >
            <Input type="file" onChange={(ev) => setFiles(ev.target.files)} />
          </FormControl>
          <div style={{ maxWidth: "800px" }}>
            <Editor value={content} onChange={setContent} />
          </div>
          <Button
            variant="outlined"
            type="submit"
            style={{ textTransform: "none", marginTop: 10 }}
          >
            Create post
          </Button>
        </form>
      </Box>
    </Paper>
  );
}
