import { useEffect, useContext, useState } from "react";

import { useParams } from "react-router-dom";

import DbContext from "../contexts/DbContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faClock,
    faUtensils,
    faIceCream,
    faMugHot,
    faChampagneGlasses,
    faCake,
    faGamepad,
} from "@fortawesome/free-solid-svg-icons";

const Invites = () => {
    let { id } = useParams();

    const { getEventData } = useContext(DbContext);

    const [showLoading, setShowLoading] = useState(true);

    const [currentEventData, setCurrentEventData] = useState({});

    useEffect(() => {
        const result = getEventData(id);
        result
            .then((data) => {
                setCurrentEventData(data);
                setShowLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const displayArrangements = (arrangement) => {
        let faIconToDisplay = "";

        switch (arrangement) {
            case "iceCream":
                faIconToDisplay = faIceCream;
                break;
            case "beverages":
                faIconToDisplay = faMugHot;
                break;
            case "liquor":
                faIconToDisplay = faChampagneGlasses;
                break;
            case "cake":
                faIconToDisplay = faCake;
                break;
            case "games":
                faIconToDisplay = faGamepad;
                break;
            default:
                break;
        }
        return <FontAwesomeIcon style={{ marginLeft: "16px" }} size="lg" icon={faIconToDisplay} />;
    };

    return (
        <>
            <>
                {showLoading ? (
                    <form aria-busy="true"></form>
                ) : (
                    <article>
                        <header className="events_header">
                            <div>
                                <span>
                                    {currentEventData.name} - {currentEventData.date}
                                </span>
                            </div>
                        </header>
                        <div className="grid">
                            <p>
                                <FontAwesomeIcon style={{ marginRight: "24px" }} size="lg" icon={faUtensils} />
                                {currentEventData.cuisine}
                            </p>
                            <p>
                                <FontAwesomeIcon style={{ marginRight: "24px" }} size="lg" icon={faClock} />
                                {currentEventData.time}
                            </p>
                            <p>
                                <FontAwesomeIcon style={{ marginRight: "24px" }} size="lg" icon={faLocationDot} />
                                {currentEventData.location}
                            </p>
                        </div>

                        <div style={{ display: "flex", marginBottom: "24px" }}>
                            <label>Arrangements:</label>
                            {currentEventData.arrangements.map((arrangement, index) => {
                                return <span key={index}>{displayArrangements(arrangement)}</span>;
                            })}
                        </div>

                        {currentEventData.other.map((other, index) => {
                            return <p key={index}>{other}</p>;
                        })}

                        <p>Special Note: {currentEventData.specialNotes}</p>

                        <footer>
                            <div className="grid" style={{ marginTop: "16px" }}>
                                <button style={{ backgroundColor: "#34a853", border: "1px solid #34a853" }}>
                                    Accept
                                </button>
                                <button style={{ backgroundColor: "#ea4335", border: "1px solid #ea4335" }}>
                                    Reject
                                </button>
                                <button className="secondary">Maybe</button>
                            </div>
                        </footer>
                    </article>
                )}
            </>
        </>
    );
};

export default Invites;
