import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/fontawesome-free-brands";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import party from "../assets/party.svg";

import GlobalContext from "../contexts/GlobalContext";
import DbContext from "../contexts/DbContext";

const Login = () => {
    const { currentTheme } = useContext(GlobalContext);
    const { currentUserOnDb } = useContext(DbContext);

    const [loading, setloading] = useState(false);
    const { googleLogin, logOut, user } = useContext(AuthContext);

    const loginHandler = () => {
        setloading(true);
        const status = googleLogin();
        status.then((s) => {
            if (s !== 200) {
                console.log("Could'nt sign in due to some error.");
            }
            setloading(false);
        });
    };

    const loginWidget = () => {
        return (
            <main className="container">
                <article className="grid login_article">
                    <div>
                        <p className="header">Sign In to Create or Join Events</p>
                        <form style={{ marginBottom: "24px", borderBottom: "1px solid gray" }}>
                            <input type="text" name="login" placeholder="Login" aria-label="Login" required />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                aria-label="Password"
                                required
                            />
                            <button type="submit" className="contrast">
                                Login
                            </button>
                        </form>
                        <button style={{ marginTop: "16px" }} className="contrast" onClick={loginHandler}>
                            <FontAwesomeIcon
                                style={{ marginRight: "32px" }}
                                color={currentTheme === "dark" ? "#333333" : "#eeeeee"}
                                size="xl"
                                icon={faGoogle}
                            />
                            Google Sign In
                        </button>
                    </div>
                    <div>
                        <img />
                    </div>
                </article>
            </main>
        );
    };

    const logOutWidget = () => {
        return (
            <>
                <div className="grid">
                    <div className="center">
                        <img src={user.photoURL} alt="User Photo" width={"150px"} style={{ borderRadius: "50%" }} />
                    </div>
                    <div>
                        <p>Name: {currentUserOnDb.Name}</p>
                        <p>Email: {currentUserOnDb.Email}</p>
                        <p>Events Hosted: {currentUserOnDb.EventsCreated}</p>
                    </div>
                </div>
                <button style={{ marginTop: "48px", maxWidth: "800px", marginInline: "auto" }} onClick={logOut}>
                    Sign Out
                </button>
            </>
        );
    };

    return (
        <div className="container">
            {loading ? (
                <div className="center">
                    <FontAwesomeIcon className="fa-spin-pulse" size="xl" icon={faSpinner} />
                </div>
            ) : (
                <>{user === null ? loginWidget() : logOutWidget()}</>
            )}
        </div>
    );
};

export default Login;
