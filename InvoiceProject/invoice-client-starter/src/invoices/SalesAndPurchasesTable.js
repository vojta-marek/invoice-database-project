import React from "react";
import dateStringFormatter from "../utils/dateStringFormatter";
import {Link} from "react-router-dom";

const SalesAndPurchasesTable = ({ sales, purchases }) => {
    return (
        <div>
            <div>
                <h3>Vystavené faktury</h3>
                <h6>Počet faktur: {sales.length}</h6>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Číslo faktury</th>
                            <th>Produkt</th>
                            <th>Cena</th>
                            <th>Datum splatnosti</th>
                        </tr>
                    </thead>
                    <tbody>
                    {sales.map((sale, index) => (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td><Link to={"/invoices/show/" + sale._id}>{sale.invoiceNumber}</Link></td>
                                <td>{sale.product}</td>
                                <td>{sale.price}</td>
                                <td>{dateStringFormatter(sale.dueDate, true)}</td>
                            </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h3>Přijaté faktury</h3>
                <h6>Počet faktur: {purchases.length}</h6>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Číslo faktury</th>
                            <th>Produkt</th>
                            <th>Cena</th>
                            <th>Datum splatnosti</th>
                        </tr>
                    </thead>
                    <tbody>
                    {purchases.map((purchase, index) => (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td><Link to={"/invoices/show/" + purchase._id}>{purchase.invoiceNumber}</Link></td>
                                <td>{purchase.product}</td>
                                <td>{purchase.price}</td>
                                <td>{dateStringFormatter(purchase.dueDate, true)}</td>
                            </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesAndPurchasesTable;