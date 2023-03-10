import { useContext } from "react";

import AuthContext from "../contexts/AuthContext";

import AllEvents from "../pages/AllEvents";

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
            {user ? (
                <>
                    <AllEvents />
                </>
            ) : (
                <p>Default Home</p>
            )}
        </>
    );
};

export default Home;
