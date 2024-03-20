import React, {useState, useEffect} from "react";
import { apiGet } from "../utils/api";

const InvoiceStatistics = () => {

    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        apiGet("/api/invoices/statistics").then((data) => setStatistics(data));
    }, [])

    return (
    <div>
        <table className="table d-flex flex-row gap-3">
            <tr>
                <th>Počet faktur:</th>
                <td>{statistics.invoicesCount}  </td>
            </tr>
            <tr>
                <th>Tržby tento rok:</th>
                <td>{statistics.currentYearSum},- Kč</td>
            </tr>
            <tr>
                <th>Celkové tržby:</th>
                <td>{statistics.allTimeSum},- Kč</td>
            </tr>
        </table>
    </div>
    );
}

export default InvoiceStatistics;