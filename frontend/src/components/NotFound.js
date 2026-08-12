import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{ "textAlign": "center", "marginTop":"50px", "backgroundColor":"lightgray", "padding":"10px", "borderRadius":"20px"}}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>
                The page you are looking for does not exist
            </p>
           <Link to="/">Wanna Go Home ?</Link>
        </div>
    );
}

export default NotFound;