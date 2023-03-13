import { useContext } from "react";

import DbContext from "../contexts/DbContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faTrash,
    faLocationDot,
    faClock,
    faUtensils,
    faIceCream,
    faMugHot,
    faChampagneGlasses,
    faCake,
    faGamepad,
} from "@fortawesome/free-solid-svg-icons";

const AllEvents = () => {
    const { allEvents } = useContext(DbContext);

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
            {allEvents &&
                allEvents.map((event, index) => {
                    return (
                        <article key={index}>
                            <header className="events_header">
                                <div>
                                    <span>
                                        {event.name} - {event.date}
                                    </span>
                                </div>
                                <div>
                                    <FontAwesomeIcon style={{ marginLeft: "24px" }} size="lg" icon={faPenToSquare} />
                                    <FontAwesomeIcon style={{ marginLeft: "24px" }} size="lg" icon={faTrash} />
                                </div>
                            </header>
                            <div className="grid">
                                <p>
                                    <FontAwesomeIcon style={{ marginRight: "24px" }} size="lg" icon={faUtensils} />
                                    {event.cuisine}
                                </p>
                                <p>
                                    <FontAwesomeIcon style={{ marginRight: "24px" }} size="lg" icon={faClock} />
                                    {event.time}
                                </p>
                                <p>
                                    <FontAwesomeIcon style={{ marginRight: "24px" }} size="lg" icon={faLocationDot} />
                                    {event.location}
                                </p>
                            </div>

                            <div style={{ display: "flex", marginBottom: "24px" }}>
                                <label>Arrangements:</label>
                                {event.arrangements.map((arrangement, index) => {
                                    return <span key={index}>{displayArrangements(arrangement)}</span>;
                                })}
                            </div>

                            {event.other.map((other, index) => {
                                return <p key={index}>{other}</p>;
                            })}

                            <p>Special Note: {event.specialNotes}</p>

                            <footer
                                onClick={() => {
                                    navigator.clipboard.writeText(event.link);
                                }}
                                className="center"
                            >
                                <span data-tooltip="Copy to Clipboard" data-placement="top">
                                    {event.link}
                                </span>
                            </footer>
                        </article>
                    );
                })}
        </>
    );
};

export default AllEvents;
