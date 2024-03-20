import React, {useEffect, useState} from "react";
import { apiGet } from "../utils/api";
import SalesAndPurchasesTable from "./SalesAndPurchasesTable";

const SalesAndPurchases = ({ identification }) => {

    const [sales, setSales] = useState([]);
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        apiGet("/api/identification/" + identification + "/sales").then((data) => setSales(data));
        apiGet("/api/identification/" + identification + "/purchases").then((data) => setPurchases(data));
    }, [identification]);

    return (
        <div>
            <SalesAndPurchasesTable sales={sales} purchases={purchases}/>
        </div>
        );

};

export default SalesAndPurchases;