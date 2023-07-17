import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Button } from "@material-ui/core";
import { MyContext } from "./App";
import { API_KEY } from "./api";
import styled from "styled-components";

const ImgContainer = styled.div`
  text-align: center;
  display: block;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding-block-end: 20px;

  .login-img img {
    width: 20%;
  }
`;

const loadingimgUrl =
  "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif";

export default function Login() {
  const { loggedinInfo, userInfo } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [inputUser, setInputUser] = useState({ username: "", password: "" });
  const [loggedin, setLoggedin] = loggedinInfo;
  const [user, setUser] = userInfo;
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      setLoading(true);
      const {
        data: { request_token }
      } = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
      );

      await axios.post(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`,
        {
          username,
          password,
          request_token
        }
      );
      const {
        data: { session_id }
      } = await axios.post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
        { request_token }
      );
      axios.defaults.params = { ...axios.defaults.params, session_id };
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/account?api_key=${API_KEY}`
      );
      const userData = {
        username,
        accoundId: data.id,
        sessionId: session_id,
        requestToken: request_token
      };
      setUser(userData);
      setLoggedin(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      alert(
        "Invalid information! Please checked your username & password and loggegin again."
      );
    }
  };

  const handleUsernameChange = (e) => {
    setInputUser({ ...inputUser, username: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setInputUser({ ...inputUser, password: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputUser.username, inputUser.password);
  };

  return loggedin ? (
    navigate("/home")
  ) : (
    <div style={{ padding: 30 }}>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      {loading && (
        <ImgContainer>
          <div className="login-img">
            <img
              style={{ alignItems: "center", justifyContent: "center" }}
              src={loadingimgUrl}
              alt="LOGGING IN"
            />
          </div>
        </ImgContainer>
      )}
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="outlined"
              onChange={handleUsernameChange}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              onChange={handlePasswordChange}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
