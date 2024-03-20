import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";

import {apiGet} from "../utils/api";
import dateStringFormatter from "../utils/dateStringFormatter";

const InvoiceDetail = () => {
    const {id} = useParams();
    const [invoice, setInvoice] = useState({});

    useEffect(() => {
        apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
    }, [id]);

    

    return (
        <>
            <div>
                <h1><Link to={"/invoices"} className="btn"><img src={"/left_arrow.png"}/>
                </Link>Detail faktury</h1>
                <hr/>
                <h3>{invoice.invoiceNumber}</h3>
                <p>
                    <strong>Dodavatel:</strong>
                    <br/>
                    {invoice.seller?.name}
                </p>
                <p>
                    <strong>Odběratel:</strong>
                    <br/>
                    {invoice.buyer?.name}
                </p>
                <p>
                    <strong>Datum vystavení:</strong>
                    <br/>
                    {dateStringFormatter(invoice.issued, true)}
                </p>
                <p>
                    <strong>Datum splatnosti:</strong>
                    <br/>
                    {dateStringFormatter(invoice.dueDate, true)}
                </p>
                <p>
                    <strong>Položky:</strong>
                    <br/>
                    {invoice.product}
                </p>
                <p>
                    <strong>Cena bez DPH:</strong>
                    <br/>
                    {invoice.price}
                </p>
                <p>
                    <strong>Daň:</strong>
                    <br/>
                    {invoice.vat} %
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br/>
                    {invoice.note}
                </p>
            </div>
        </>
    );
};

export default InvoiceDetail;