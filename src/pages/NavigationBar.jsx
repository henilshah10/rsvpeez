import { useContext } from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import AuthContext from "../contexts/AuthContext";
import GlobalContext from "../contexts/GlobalContext";

const NavigationBar = () => {
    const { user } = useContext(AuthContext);
    const { currentTheme, themeHandler } = useContext(GlobalContext);

    return (
        <nav className="navbar">
            <ul>
                <li className="brand">
                    <Link to="/">
                        <strong>RSVPEEZ</strong>
                    </Link>
                </li>
            </ul>
            <ul>
                {user ? (
                    <>
                        <li style={{ padding: "0px" }}>
                            <Link className="link" to="createEvent">
                                <FontAwesomeIcon size="xl" icon={faCalendarPlus} />
                            </Link>
                        </li>
                        <li style={{ padding: "0px" }}>
                            <Link className="link" to="profile">
                                <img src={user.photoURL} alt="avatar" width={"40px"} style={{ borderRadius: "50%" }} />
                            </Link>
                        </li>
                    </>
                ) : (
                    <li className="link">
                        <Link role="button" to="profile">
                            Get Started
                        </Link>
                    </li>
                )}
                <li className="link" onClick={themeHandler}>
                    <FontAwesomeIcon size="xl" icon={currentTheme === "dark" ? faSun : faMoon} />
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar;
