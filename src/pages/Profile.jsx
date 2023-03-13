import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";
import DbContext from "../contexts/DbContext";

const Profile = () => {
    const navigate = useNavigate();

    const { user, logOut } = useContext(AuthContext);
    const { currentUserOnDb } = useContext(DbContext);

    const handleLogout = () => {
        const status = logOut();
        status.then((s) => {
            if (s !== 200) {
                console.log("Could'nt log out due to some error.");
            } else {
                navigate("/");
            }
        });
    };

    return (
        <>
            {user !== null ? (
                <>
                    <div className="grid">
                        <div className="center">
                            <img src={user.photoURL} alt="User Photo" width={"150px"} style={{ borderRadius: "50%" }} />
                        </div>
                        <div>
                            <p>Name: {currentUserOnDb.name}</p>
                            <p>Email: {currentUserOnDb.email}</p>
                            <p>Events Hosted: {currentUserOnDb.eventsCreated}</p>
                        </div>
                    </div>
                    <button
                        style={{ marginTop: "48px", maxWidth: "800px", marginInline: "auto" }}
                        onClick={handleLogout}
                    >
                        Sign Out
                    </button>
                </>
            ) : (
                ""
            )}
        </>
    );
};

export default Profile;
