import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  FormLabel,
  Grid,
  CssBaseline,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  async function register(ev) {
    ev.preventDefault();

    if (password === confirmPassword) {
      const response = await fetch("https://test-rzr2.vercel.app/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        alert("registration successful");
      } else {
        alert("registration failed");
      }
    }

    if (password !== confirmPassword) {
      alert("Password and Confirm Password doesnot match");
    }
  }
  return (
    <>
      {/* <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Register</button>
      </form> */}

      <Container component="main">
        <CssBaseline />
        <Grid
          container
          justifyContent="center"
          // alignItems="center"
          style={{ minHeight: "85vh" }}
        >
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h4" align="center" gutterBottom>
                  Sign Up
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                  Start write your Blog!!
                </Typography>
                <form onSubmit={register}>
                  <FormLabel htmlFor="email">Enter Your Username</FormLabel>
                  <TextField
                    label="Enter Your User Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    // type="email"
                    // id="email"
                    placeholder="Enter username  here..."
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                    required
                  />

                  <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="password">
                      Enter Your password
                    </FormLabel>
                    <OutlinedInput
                      label="Enter Your password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter password here..."
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      required
                    />
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="password">
                      Confirm Your password
                    </FormLabel>
                    <OutlinedInput
                      label="Confirm Your password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="Rewrite password here..."
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  {error && (
                    <Typography variant="body1" color="error">
                      {error}
                    </Typography>
                  )}
                  <div></div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "1rem 0",
                    }}
                  >
                    <Typography variant="body1">Have an account?</Typography>

                    <Link to="/login">
                      {" "}
                      <Button>Log In</Button>{" "}
                    </Link>
                  </div>
                  <div className="d-grid gap-2">
                    <Button type="submit" variant="contained" color="primary">
                      Register
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
