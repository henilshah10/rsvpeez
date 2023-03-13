import { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/fontawesome-free-brands";

import GlobalContext from "../contexts/GlobalContext";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
    const navigate = useNavigate();

    const { currentTheme } = useContext(GlobalContext);

    const { googleLogin, user } = useContext(AuthContext);

    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        if (user !== null) {
            navigate("/profile");
        }
        setShowLoading(false);
    }, [user]);

    const loginHandler = () => {
        setShowLoading(true);
        const status = googleLogin();
        status.then((s) => {
            console.log(s);
            setShowLoading(false);
            if (s !== 200) {
                console.log("Could'nt log in due to some error.");
            } else {
                navigate("/profile");
            }
        });
    };

    return (
        <>
            {showLoading ? (
                <article aria-busy="true"></article>
            ) : (
                <main className="container">
                    <article className="login_article">
                        <p>
                            New here? <Link to="/register">Register Here</Link>
                        </p>
                        <form style={{ borderBottom: "1px solid gray" }} className="center">
                            <input type="text" name="login" placeholder="Login" aria-label="Login" required />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                aria-label="Password"
                                required
                            />
                            <button style={{ marginBottom: "24px" }} type="submit" className="contrast">
                                Login
                            </button>
                        </form>
                        <button style={{ marginTop: "24px" }} className="contrast" onClick={loginHandler}>
                            <FontAwesomeIcon
                                style={{ marginRight: "32px" }}
                                color={currentTheme === "dark" ? "#333333" : "#eeeeee"}
                                size="xl"
                                icon={faGoogle}
                            />
                            Google Sign In
                        </button>
                    </article>
                </main>
            )}
        </>
    );
};

export default Login;
