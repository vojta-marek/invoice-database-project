import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";

import {apiGet} from "../utils/api";
import Country from "./Country";
import SalesAndPurchases from "../invoices/SalesAndPurchases";

const PersonDetail = () => {
    const {id} = useParams();
    const [person, setPerson] = useState({});

    useEffect(() => {
        apiGet("/api/persons/" + id).then((data) => setPerson(data));
    }, [id]);
    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        <div className="row">
            <h1><Link to={"/persons"} className="btn"><img src={"/left_arrow.png"}/></Link>Detail osoby</h1>
                <hr/>
            <div className="col-6">
                <h3>{person.name} ({person.identificationNumber})</h3>
                <p>
                    <strong>DIČ:</strong>
                    <br/>
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:</strong>
                    <br/>
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Tel.:</strong>
                    <br/>
                    {person.telephone}
                </p>
                <p>
                    <strong>E-mail:</strong>
                    <br/>
                    {person.mail}
                </p>
                <p>
                    <strong>Sídlo:</strong>
                    <br/>
                    {person.street}, {person.city},
                    {person.zip}, {country}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br/>
                    {person.note}
                </p>
            </div>
            <div className="col-6">
                <SalesAndPurchases identification={person.identificationNumber}/>
            </div>
        </div>
    );
};

export default PersonDetail;
