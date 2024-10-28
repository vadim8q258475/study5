import { Link } from "react-router-dom";
import "./login.css";

function Login(props) {
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
          <input className="loginInput"></input>
          <div className="loginTitle">Password</div>
          <input className="loginInput"></input>
          <div className="loginButtonWrapper">
            <button className="loginButton btnStyle">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
