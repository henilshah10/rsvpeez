import { useContext, useState } from "react";

import { Link } from "react-router-dom";

import plan from "../assets/plan.svg";

import gamenight from "../assets/gamenight.png";
import party3 from "../assets/party3.png";
import party4 from "../assets/party4.png";
import DbContext from "../contexts/DbContext";

const Welcome = () => {
    const { submitQuery } = useContext(DbContext);

    const [queryDetails, setQueryDetails] = useState({
        name: "",
        email: "",
        query: "",
    });

    const handleQuery = (e) => {
        e.preventDefault();

        let errors = [];
        for (let detail in queryDetails) {
            if (queryDetails[detail] === "") {
                errors.push(detail);
            }
        }

        setFormErrors(errors);
        console.log(queryDetails);
        submitQuery(queryDetails);
    };

    const [formErrors, setFormErrors] = useState([]);

    return (
        <>
            <div className="center">
                <article>
                    <img src={plan} style={{ maxWidth: "400px" }} width="100%" alt="Plan Events" />
                    <p style={{ fontSize: "2rem", marginBottom: "0px" }}>Organize events in an easier way!</p>
                    <p style={{ fontSize: "1rem", marginBottom: "24px" }}>
                        A very intuitive way to manage all your RSVP Events and Occasions.
                    </p>
                    <div>
                        <Link role="button" to="login">
                            Get Started
                        </Link>
                    </div>
                </article>
            </div>
            <div style={{ marginTop: "24px", marginBottom: "48px" }} className="center">
                <div className="grid">
                    <div>
                        <img src={gamenight} style={{ maxWidth: "350px" }} width="100%" alt="Plan Events" />
                        <p style={{ maxWidth: "300px", margin: "auto" }}>
                            Planning to organize a game night? It's good to have your friends beside you cheering for
                            your team.
                        </p>
                    </div>
                    <div>
                        <img src={party3} style={{ maxWidth: "350px" }} width="100%" alt="Plan Events" />
                        <p style={{ maxWidth: "300px", margin: "auto" }}>
                            Throwing a celebration party? Manage each and every guest with just a few clicks.
                        </p>
                    </div>
                    <div>
                        <img src={party4} style={{ maxWidth: "350px" }} width="100%" alt="Plan Events" />
                        <p style={{ maxWidth: "300px", margin: "auto" }}>
                            Just a casual fun weekend catch up? Tell your gang about the arrangements within the invite.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <article>
                    <p style={{ fontSize: "2rem" }}>About</p>
                    <p>
                        RSVPEEZ is an event management company that offers a user-friendly platform to make event
                        planning stress-free. Our experienced team provides customizable options for a successful event,
                        from invitations and RSVP tracking to day-of coordination. We strive to create unforgettable
                        memories that you and your guests will cherish for years to come.
                    </p>
                </article>
            </div>
            <div style={{ padding: "32px" }}>
                <p style={{ fontSize: "2rem", marginBottom: "0px" }}>Have a question?</p>
                <p style={{ color: "gray" }}>Write it to us and we'll get back ASAP...</p>
                <form>
                    <div className="grid">
                        <input
                            aria-invalid={
                                formErrors.includes("name") ? true : queryDetails.name !== "" ? false : "default"
                            }
                            onChange={(e) => setQueryDetails({ ...queryDetails, name: e.target.value })}
                            type="text"
                            placeholder="Full Name"
                            aria-label="Full Name"
                            required
                        />
                        <input
                            aria-invalid={
                                formErrors.includes("email") ? true : queryDetails.email !== "" ? false : "default"
                            }
                            onChange={(e) => setQueryDetails({ ...queryDetails, email: e.target.value })}
                            type="email"
                            placeholder="Email address"
                            aria-label="Email address"
                            required
                        />
                    </div>
                    <input
                        aria-invalid={
                            formErrors.includes("query") ? true : queryDetails.query !== "" ? false : "default"
                        }
                        onChange={(e) => setQueryDetails({ ...queryDetails, query: e.target.value })}
                        type="text"
                        placeholder="Query"
                        aria-label="Query"
                        required
                    />
                    <button onClick={handleQuery} type="submit">
                        Send
                    </button>
                </form>
            </div>
        </>
    );
};

export default Welcome;
