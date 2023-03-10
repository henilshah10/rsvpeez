import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/fontawesome-free-brands";
import GlobalContext from "../contexts/GlobalContext";

const Login = () => {
    const { currentTheme } = useContext(GlobalContext);

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
            <div className="center" style={{ marginTop: "48px" }}>
                <p className="header">Sign In to Create or Join Events</p>
                <button
                    style={{ marginTop: "48px", maxWidth: "400px", marginInline: "auto" }}
                    className="contrast"
                    onClick={loginHandler}
                >
                    <FontAwesomeIcon
                        style={{ marginRight: "32px" }}
                        color={currentTheme === "dark" ? "#333333" : "#eeeeee"}
                        size="xl"
                        icon={faGoogle}
                    />
                    Google Sign In
                </button>
            </div>
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
                        <p>Name: {user.displayName}</p>
                        <p>Email: {user.email}</p>
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
