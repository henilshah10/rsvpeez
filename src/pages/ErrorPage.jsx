import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="errorPage center">
            <p>Oh Snap!</p>
            <p>Looks like you're lost, but it only happens to a wanderer!</p>
            <Link role={"button"} className="cb-link" to="/">
                Take me Home
            </Link>
        </div>
    );
};

export default ErrorPage;
