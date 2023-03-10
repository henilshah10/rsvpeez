import { useContext } from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faUserCircle, faSun, faMoon } from "@fortawesome/free-regular-svg-icons";

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
                <li style={{ padding: "0px" }}>
                    <Link className="link" to="createEvent">
                        <FontAwesomeIcon size="xl" icon={faCalendarPlus} />
                    </Link>
                </li>
                <li style={{ padding: "0px" }}>
                    <Link className="link" to="profile">
                        {user ? (
                            <img src={user.photoURL} alt="avatar" width={"40px"} style={{ borderRadius: "50%" }} />
                        ) : (
                            <FontAwesomeIcon size="xl" icon={faUserCircle} />
                        )}
                    </Link>
                </li>
                <li className="link" onClick={themeHandler}>
                    <FontAwesomeIcon size="xl" icon={currentTheme === "dark" ? faMoon : faSun} />
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar;
