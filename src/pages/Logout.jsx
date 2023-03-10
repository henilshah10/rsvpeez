import { useContext } from "react";

import AuthContext from "../contexts/AuthContext";
import DbContext from "../contexts/DbContext";

const Logout = () => {
    const { user, logOut } = useContext(AuthContext);
    const { currentUserOnDb } = useContext(DbContext);

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

export default Logout;
