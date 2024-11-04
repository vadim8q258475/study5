import Footer from "../footer/footer";
import Header from "../header/header";
import "./main.css";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const area = "isAuth";
const apiUrl = "http://127.0.0.1:8000";

function Main(props) {
  const [isAuth, setIsAuth] = useState(null);
  const { promiseInProgress } = usePromiseTracker({ area });

  if (localStorage.length === 0) {
    localStorage.setItem("token", "");
    console.log("token");
  }

  useEffect(() => {
    const instance = axios.create({
      baseURL: apiUrl,
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
    console.log(`Token ${localStorage.getItem("token")}`);
    trackPromise(
      instance
        .get()
        .then((resp) => {
          setIsAuth(true);
        })
        .catch((err) => {
          console.log(err.status);
          if (err.status == 401) {
            setIsAuth(false);
          }
        })
    );
  }, [setIsAuth]);

  if (promiseInProgress || isAuth === null) {
    console.log("false");
    return <h1>Loading...</h1>;
  } else {
    if (!isAuth) {
      return <Navigate to="/registration"></Navigate>;
    } else {
      return (
        <div className="main">
          {/* <img
            className="triangle"
            id="pos1"
            src="https://i.pinimg.com/474x/f3/48/ea/f348ead29f07d66812dd84dbd23ebfa1.jpg"
          ></img> */}
          {/* <div className="triangleContainer">
            <img
              className=""
              id="pos2"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR50EKBfMUVD5QvfHE-Zd4OyIdAXD1Ebexc0RQbG12TYNtC0TjTtOJbF_sLP-agiv4Otu0&usqp=CAU"
              // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTETGWbZx0MIdX_fZ3Hlxk8mW-XJMXoqP2uhA&s"
            ></img>
          </div> */}
          <header>
            <Header></Header>
          </header>
          <main>{props.element}</main>
          <footer>
            <Footer></Footer>
          </footer>
        </div>
      );
    }
  }
}

export default Main;
