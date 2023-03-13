// Page Imports
import NavigationBar from "../pages/NavigationBar";

// Outlet from router dom
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <>
            <NavigationBar />
            <main className="body_container">
                <Outlet />
            </main>
            <footer className="main_footer">Made with 💖 for togetherness.</footer>
        </>
    );
};

export default RootLayout;
