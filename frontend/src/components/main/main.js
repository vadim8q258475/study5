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
          console.log(resp);
          setTimeout(()=>{console.log("end")}, 10000)
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
