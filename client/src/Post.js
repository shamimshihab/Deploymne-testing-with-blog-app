import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { Typography, Box, Paper, Button, Grid } from "@mui/material";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <Paper elevation={3} style={{ margin: 5, padding: 5 }}>
      <Grid container spacing={2}>
        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          sm={12}
          md={6}
        >
          <div>
            <Link to={`/post/${_id}`}>
              <img
                className="index-Image"
                src={"http://localhost:4000/" + cover}
                alt=""
              />
            </Link>
          </div>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "flex-start",
            }}
          >
            <Link to={`/post/${_id}`}>
              <Button
                style={{
                  textTransform: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                <Typography variant="h5"> {title}</Typography>
              </Button>
            </Link>
            <Typography className="infoDetails ">
              <a className="author">{author.username}</a>,
              <time>{formatISO9075(new Date(createdAt))}</time>
            </Typography>
            <Typography className="summary">
              {(
                new DOMParser().parseFromString(content, "text/html").body
                  .textContent || ""
              ).substring(0, 80)}
            </Typography>

            <Link to={`/post/${_id}`}>
              <Button
                variant="contained"
                style={{
                  marginTop: 20,
                  padding: "4px",
                  textTransform: "none",
                }}
              >
                {" "}
                Read more
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
