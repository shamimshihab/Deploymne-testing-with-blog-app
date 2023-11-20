import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import photo from "../assets/photo.jpg";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function AboutMe() {
  const [myDescription, setDescription] = useState("");

  async function fetchMyDescription() {
    const response = await fetch(
      "https://react-blog-test-5r9p.onrender.com/aboutMe"
    );

    if (response.ok) {
      response.json().then((userInfo) => {
        setDescription(userInfo.description);
      });
    } else {
    }
  }

  useEffect(() => {
    fetchMyDescription();
  }, []);

  return (
    <>
      <Paper className="home-page-container" elevation={3}>
        <Grid container spacing={2} style={{ minHeight: "90vh" }}>
          <Grid item sm={12} md={6} style={{ padding: 5 }}>
            <img className="my-photo" src={photo}></img>
          </Grid>
          <Grid className="my-description" item sm={12} xs={12} md={6}>
            <Typography variant="h6">
              {myDescription ? <>{myDescription}</> : <></>}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
