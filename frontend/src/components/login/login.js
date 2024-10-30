import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const apiUrl = "http://127.0.0.1:8000";

function postLoginInfo(setIsAuth) {
  return () => {
    let name = document.getElementById("loginNameInput").value;
    let password = document.getElementById("loginPasswordInput").value;
    const formData = new FormData();

    console.log(name, password);

    formData.append("username", name);
    formData.append("password", password);

    const instance = axios.create({
      baseURL: apiUrl,
    });

    instance
      .post("/accounts/auth/token/login/", formData)
      .then((resp) => {
        localStorage.setItem("token", resp.data["auth_token"]);
        console.log(localStorage.getItem("token"));
      }).then(() => {setIsAuth(true);})
      .catch((err) => console.log(err));
  };
}

function Login(props) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {}, [setIsAuth]);
  if (!isAuth) {
    return (
      <div className="login">
        <div className="loginHeader">
          <div className="logoContainer">SHOP NAME</div>
          <nav>
            <div className="navElement">
              <Link to="/registration">SIGN UP</Link>
            </div>
            <div className="navElement">
              <Link to="/login">LOG IN</Link>
            </div>
          </nav>
        </div>
        <div className="loginWrapper">
          <div className="loginForm">
            <div className="loginMainTitleWrapper">
              <div className="loginMainTitle">Login</div>
            </div>
            <div className="loginTitle">Name</div>
            <input className="loginInput" id="loginNameInput"></input>
            <div className="loginTitle">Password</div>
            <input className="loginInput" id="loginPasswordInput"></input>
            <div className="loginButtonWrapper">
              <button className="loginButton btnStyle" onClick={postLoginInfo(setIsAuth)}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/"></Navigate>;
  }
}

export default Login;
