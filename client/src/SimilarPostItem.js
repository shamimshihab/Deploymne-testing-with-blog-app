import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { Typography, Box, Paper, Button, Grid } from "@mui/material";

export default function SimilarPostItem({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  console.log("inputid", _id);
  return (
    <Paper style={{ margin: 1, padding: 1 }}>
      <Grid container spacing={1}>
        <Grid
          item
          style={{
            height: "120px",
          }}
          sm={5}
          xs={5}
        >
          <Link to={`/post/${_id}`}>
            <img
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
              }}
              src={"http://localhost:4000/" + cover}
              alt=""
            />
          </Link>
        </Grid>
        <Grid item sm={7} xs={7}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              justifyContent: "center",
              alignItems: "left",
            }}
          >
            <Typography variant="body2">
              <Link style={{ color: "green" }} to={`/post/${_id}`}>
                {" "}
                {title}
              </Link>
            </Typography>

            <Typography variant="body2">
              {(
                new DOMParser().parseFromString(content, "text/html").body
                  .textContent || ""
              ).substring(0, 30)}
            </Typography>

            <Link to={`/post/${_id}`}>
              <Button
                variant="contained"
                style={{
                  margin: 0,
                  padding: 0,
                  width: "60%",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                }}
                size="small"
              >
                Read more
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
