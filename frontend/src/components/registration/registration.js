import { Link } from "react-router-dom";
import "./registration.css";

function Registration(props) {
  return (
    <div className="registration">
      <div className="registrationHeader">
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
      <div className="registrationWrapper">
        <div className="registrationForm">
          <div className="registrationMainTitleWrapper">
            <div className="registrationMainTitle">Registration</div>
          </div>
          <div className="registrationTitle">Name</div>
          <input className="registrationInput"></input>
          <div className="registrationTitle">Email</div>
          <input className="registrationInput"></input>
          <div className="registrationTitle">Password</div>
          <input className="registrationInput"></input>
          <div className="registrationTitle">Password Confirm</div>
          <input className="registrationInput"></input>
          <div className="registrationButtonWrapper">
            <button className="registrationButton btnStyle">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
