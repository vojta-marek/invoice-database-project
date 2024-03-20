import React, {useState, useEffect} from "react";
import { apiGet } from "../utils/api";

const PersonStatisticsSales = ({personId}) => {
    const [personStatistics, setPersonStatistics] = useState([]);
    const personIdentification = personId;

    useEffect(() => {
        apiGet("/api/persons/statistics").then((data) => setPersonStatistics(data));
    }, []);

    return (
    <div>
        {personStatistics.map((person, index) => 
            <div key={index + 1}>
                {person.personId == personIdentification ?
                person.revenue + ",- Kč" : null}
            </div>
        )}
    </div>
    );
}

export default PersonStatisticsSales;