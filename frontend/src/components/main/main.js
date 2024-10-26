import Footer from "../footer/footer";
import Header from "../header/header";

function Main(props) {
    return (
      <div className="main">
        <header><Header></Header></header>
        <main>{props.element}</main>
        <footer><Footer></Footer></footer>
      </div>
    );
  }


  export default Main;