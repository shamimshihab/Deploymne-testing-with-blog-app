import React from "react";
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
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
const Footer = () => {
  const theme = useTheme();
  return (
    <footer
      style={{
        backgroundColor: theme.palette.mode === "dark" ? "#05A6F1 " : "#C5E8F8",
      }}
    >
      <Grid
        container
        className="footer-container"

        // }}
      >
        <Grid item xs={12} md={6} className="footeer-first-container">
          <Typography variant="body1">
            MyBlog - Developed by Shamim @2023
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} className="icon-container">
          <a
            href="https://github.com/shamimshihab"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="icon" />
          </a>

          <a
            href="https://www.linkedin.com/in/shamim-shihab/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon className="icon" />
          </a>

          <a
            href="https://www.instagram.com/shamimshihab/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="icon" />
          </a>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
