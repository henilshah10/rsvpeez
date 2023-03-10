import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [currentTheme, setCurrentTheme] = useState("dark");

    const themeHandler = (e) => {
        e.preventDefault();
        setCurrentTheme(currentTheme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        document.getElementsByTagName("html")[0].setAttribute("data-theme", currentTheme);
    }, [currentTheme]);

    const value = {
        currentTheme,
        themeHandler,
    };

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export default GlobalContext;
