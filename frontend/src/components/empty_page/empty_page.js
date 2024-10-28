import "./empty_page.css"

function EmptyPage(props) {
    return (
      <div className="emptyPage">
        {props.text}
      </div>
    );
  }


  export default EmptyPage;