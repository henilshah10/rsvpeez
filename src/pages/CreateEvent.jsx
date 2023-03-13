import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIceCream, faMugHot, faChampagneGlasses, faCake, faGamepad } from "@fortawesome/free-solid-svg-icons";

import DbContext from "../contexts/DbContext";

const CreateEvent = () => {
    const navigate = useNavigate();

    const { createNewEventOnDb } = useContext(DbContext);

    const allArrangements = [
        { name: "iceCream", icon: faIceCream },
        { name: "beverages", icon: faMugHot },
        { name: "liquor", icon: faChampagneGlasses },
        { name: "cake", icon: faCake },
        { name: "games", icon: faGamepad },
    ];

    const [addedArrangements, setAddedArrangements] = useState([]);

    const [otherArrangements, setOtherArrangements] = useState([]);

    const [eventDetails, setEventDetails] = useState({
        name: "",
        location: "",
        date: "",
        time: "",
        cuisine: "",
        arrangements: [],
        other: [],
        specialNotes: "",
    });

    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        setEventDetails({ ...eventDetails, arrangements: addedArrangements });
    }, [addedArrangements]);

    useEffect(() => {
        setEventDetails({ ...eventDetails, other: otherArrangements });
    }, [otherArrangements]);

    const handleArrangements = (e) => {
        const value = e.target.id;
        const checked = e.target.checked;

        if (checked) {
            if (!addedArrangements.includes(value)) {
                setAddedArrangements([...addedArrangements, value]);
            }
        } else {
            if (addedArrangements.includes(value)) {
                setAddedArrangements(addedArrangements.filter((e) => e !== value));
            }
        }
    };

    const handleOther = (e) => {
        const value = e.target.id;
        const checked = e.target.checked;

        if (checked) {
            if (!otherArrangements.includes(value)) {
                setOtherArrangements([...otherArrangements, value]);
            }
        } else {
            if (otherArrangements.includes(value)) {
                setOtherArrangements(otherArrangements.filter((e) => e !== value));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = [];

        for (let detail in eventDetails) {
            if (eventDetails[detail] === "") {
                errors.push(detail);
            }
        }
        setFormErrors(errors);

        const status = createNewEventOnDb(eventDetails);
        status.then((s) => {
            if (s !== 200) {
                console.log("Could'nt log in due to some error.");
            } else {
                navigate("/");
            }
        });
    };

    return (
        <>
            <form>
                <div className="grid">
                    <label>
                        Event Name<span style={{ color: "red" }}> *</span>
                        <input
                            aria-invalid={
                                formErrors.includes("name") ? true : eventDetails.name !== "" ? false : "default"
                            }
                            onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
                            type="text"
                            placeholder="New Year Party"
                            required
                        />
                    </label>

                    <label>
                        Location<span style={{ color: "red" }}> *</span>
                        <input
                            aria-invalid={
                                formErrors.includes("location")
                                    ? true
                                    : eventDetails.location !== ""
                                    ? false
                                    : "default"
                            }
                            onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
                            type="text"
                            placeholder="Eg: 7268 Balmoral Street"
                            required
                        />
                    </label>
                </div>
                <div className="grid">
                    <label>
                        Date<span style={{ color: "red" }}> *</span>
                        <input
                            aria-invalid={
                                formErrors.includes("date") ? true : eventDetails.date !== "" ? false : "default"
                            }
                            onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })}
                            type="date"
                            placeholder="31/12/2023"
                            required
                        />
                    </label>

                    <label>
                        Time<span style={{ color: "red" }}> *</span>
                        <input
                            aria-invalid={
                                formErrors.includes("time") ? true : eventDetails.time !== "" ? false : "default"
                            }
                            onChange={(e) => setEventDetails({ ...eventDetails, time: e.target.value })}
                            type="time"
                            placeholder="11:30 PM"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Cuisine<span style={{ color: "red" }}> *</span>
                        <input
                            aria-invalid={
                                formErrors.includes("cuisine") ? true : eventDetails.cuisine !== "" ? false : "default"
                            }
                            onChange={(e) => setEventDetails({ ...eventDetails, cuisine: e.target.value })}
                            type="text"
                            placeholder="Italian"
                            required
                        />
                    </label>
                </div>

                <label>Arrangements</label>
                <div className="grid">
                    {allArrangements.map((arrangement, index) => {
                        return (
                            <div onChange={handleArrangements} style={{ marginTop: "8px" }} key={index}>
                                <input id={arrangement.name} type="checkbox" />
                                <FontAwesomeIcon style={{ marginInline: "8px" }} size="lg" icon={arrangement.icon} />
                            </div>
                        );
                    })}
                </div>

                <div onChange={handleOther} style={{ marginTop: "24px" }}>
                    <label>Other</label>
                    <label>
                        <input id="byob" type="checkbox" />
                        <span style={{ marginInline: "8px" }}>BYOB</span>
                    </label>

                    <label>
                        <input id="veg" type="checkbox" />
                        <span style={{ marginInline: "8px" }}>Vegetarian Available</span>
                    </label>
                </div>

                <div style={{ marginTop: "24px" }}>
                    <label>
                        Special Notes
                        <input
                            onChange={(e) => setEventDetails({ ...eventDetails, specialNotes: e.target.value })}
                            type="text"
                            placeholder="It'll be fun if you pre-booze..."
                        />
                    </label>
                </div>

                <button onClick={handleSubmit} style={{ marginTop: "24px", maxWidth: "600px", marginInline: "auto" }}>
                    Create Event
                </button>
            </form>
        </>
    );
};

export default CreateEvent;
