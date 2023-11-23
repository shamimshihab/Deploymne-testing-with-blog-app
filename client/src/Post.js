import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { Typography, Box, Paper, Button, Grid, Stack } from "@mui/material";
import { Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Navigate, useParams } from "react-router-dom";
export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  const navigate = useNavigate();
  const NameIcon = ({ name, size = 20 }) => {
    const initials = name.substring(0, 3).toUpperCase();

    return (
      <Avatar
        sx={{
          width: size,
          height: size,
          borderRadius: 4,
          fontSize: size / 2,
        }}
      >
        {initials}
      </Avatar>
    );
  };
  const handleTypographyClick = () => {
    navigate(`/post/${_id}`);
  };
  return (
    <Paper elevation={3} style={{ margin: 10 }}>
      <Grid
        item
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          alignItems: "center",

          margin: " 2rem auto",
        }}
        sm={12}
        md={12}
      >
        <div
          style={{
            justifyContent: "flex-start",
            flexDirection: "column",
            width: "100%",
            alignItems: "flex-start",
            padding: "0.5rem",
          }}
        >
          <Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",

                margin: " 1rem 1rem",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <AccountCircleIcon fontSize="large" sx={{ height: "120%" }} />
                <Stack direction="column" spacing={1}>
                  <Typography>{author.username}</Typography>
                  <time className="infoDetails ">
                    {formatISO9075(new Date(createdAt))}
                  </time>
                </Stack>
              </Stack>
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                margin: " 1rem 1rem",
              }}
            >
              <Typography
                variant="h5"
                onClick={handleTypographyClick}
                style={{ cursor: "pointer" }}
              >
                Title: {title}
              </Typography>
            </Box>

            <Link to={`/post/${_id}`}>
              <img
                className="index-Image"
                src={"https://react-blog-test-5r9p.onrender.com/" + cover}
                alt=""
              />
            </Link>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",

                margin: " 1rem 1rem",
              }}
            >
              {" "}
              <Typography className="summary">
                {(
                  new DOMParser().parseFromString(content, "text/html").body
                    .textContent || ""
                ).substring(0, 150)}
                .......
                <Link to={`/post/${_id}`}>
                  <Button
                    variant="text"
                    style={{
                      marginTop: 20,
                      padding: "4px",
                      textTransform: "none",
                      textDecoration: "underline",
                    }}
                  >
                    {" "}
                    Read more
                  </Button>
                </Link>
              </Typography>
            </Box>
          </Box>
        </div>
      </Grid>
    </Paper>
  );
}
