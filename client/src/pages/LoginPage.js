import { useContext, useState } from "react";
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
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
      setError("Wrong Credentials");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      {/* <form className="login" onSubmit={login}>
        <h1>Login</h1>
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
        <button>Login</button>
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
                <Typography component="h2" variant="h4" align="center">
                  LOGIN
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>
                  Welcome Back!
                </Typography>
                <form onSubmit={login}>
                  <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="email">Enter Your Username</FormLabel>
                    <TextField
                      // type="email"
                      // id="email"
                      placeholder="Enter email here ..."
                      value={username}
                      onChange={(ev) => setUsername(ev.target.value)}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="password">
                      Enter Your password
                    </FormLabel>
                    <OutlinedInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password here..."
                      value={password}
                      onChange={(ev) => setPassword(ev.target.value)}
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
                  {error && (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {error}
                    </Alert>
                  )}
                  {/* <Typography>
                    <Link to="/forgotpasword">Forgot password?</Link>
                  </Typography> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "1rem 0",
                    }}
                  >
                    <Typography>Dont have an account?</Typography>
                    <Link to="/register">
                      {" "}
                      <Button>Register</Button>
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
