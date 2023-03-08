import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faCircleUser, faSun, faMoon, faUserCircle } from "@fortawesome/free-regular-svg-icons";

const NavigationBar = () => {
    const [currentTheme, setCurrentTheme] = useState("dark");

    const themeHandler = (e) => {
        e.preventDefault();
        setCurrentTheme(currentTheme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        document
            .getElementsByTagName("html")[0]
            .setAttribute("data-theme", currentTheme === "light" ? "dark" : "light");
    }, [currentTheme]);

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
                <li className="link">
                    <Link to="createEvent">
                        <FontAwesomeIcon size="xl" icon={faCalendarPlus} />
                    </Link>
                </li>
                <li>
                    <Link className="link" to="login">
                        <FontAwesomeIcon size="xl" icon={faUserCircle} />
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
