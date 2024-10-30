import { Link } from "react-router-dom";
import "./registration.css";
import axios from "axios";

const apiUrl = "http://127.0.0.1:8000";

function postRegInfo() {
  let name = document.getElementById("regNameInput").value;
  let email = document.getElementById("regEmailInput").value;
  let password = document.getElementById("regPasswordInput").value;
  const formData = new FormData();
  
  console.log(name, email, password)

  formData.append("username", name); 
  formData.append("email", email)
  formData.append("password", password)

  const instance = axios.create({
    baseURL: apiUrl,
  });

  instance.post("/accounts/api/v1/auth/users/", formData).then((resp) => {
    console.log(resp.data, resp.status);
  }).catch(err => console.log(err));
}

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
          <input className="registrationInput" id="regNameInput"></input>
          <div className="registrationTitle">Email</div>
          <input className="registrationInput" id="regEmailInput"></input>
          <div className="registrationTitle">Password</div>
          <input className="registrationInput" id="regPasswordInput"></input>
          {/* <div className="registrationTitle">Password Confirm</div>
          <input className="registrationInput" id="regNameInput"></input> */}
          <div className="registrationButtonWrapper">
            <button
              className="registrationButton btnStyle"
              onClick={postRegInfo}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
