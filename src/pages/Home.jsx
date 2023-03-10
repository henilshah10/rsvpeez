import { useContext } from "react";

import AuthContext from "../contexts/AuthContext";

import AllEvents from "../pages/AllEvents";
import Welcome from "./Welcome";

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
            {user ? (
                <>
                    <AllEvents />
                </>
            ) : (
                <>
                    <Welcome />
                </>
            )}
        </>
    );
};

export default Home;
