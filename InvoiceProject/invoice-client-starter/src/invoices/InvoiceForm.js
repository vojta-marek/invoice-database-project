import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/api";

import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";
import InputSelect from "../components/InputSelect";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const [personListState, setPersonList] = useState([]);


    const {id} = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: {},
        buyer: {},
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: ""
    });
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);


    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
        apiGet("/api/persons").then((data) => setPersonList(data));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;

    return (
        <div>
            <h1><Link to={"/invoices"} className="btn"><img src={"/left_arrow.png"}/>
                </Link>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr/>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="invoiceNumber"
                    min="7"
                    label="Číslo faktury"
                    prompt="Zadejte celé číslo"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({...invoice, invoiceNumber: e.target.value});
                    }}
                />

                <InputSelect
                    
                    items={personListState}
                    name="seller"
                    label="Dodavatel"
                    prompt="Vyberte dodavatele"
                    value={invoice.seller?._id}
                    handleChange={(e) => {
                        setInvoice({...invoice, seller: {
                            _id: e.target.value
                        }});
                    }}
                />

                <InputSelect
                    
                    items={personListState}
                    name="buyer"
                    label="Odběratel"
                    prompt="Vyberte odběratele"
                    value={invoice.buyer?._id}
                    handleChange={(e) => {
                        setInvoice({...invoice, buyer: {
                            _id: e.target.value
                        }});
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    label="Datum vystavení"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({...invoice, issued: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    label="Datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({...invoice, dueDate: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="product"
                    min="3"
                    label="Položka"
                    prompt="Zadejte předmět prodeje"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({...invoice, product: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="price"
                    min="1"
                    label="Cena"
                    prompt="Zadejte cenu zboží nebo služeb"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({...invoice, price: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="vat"
                    label="Daň"
                    prompt="Zadejte daň"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({...invoice, vat: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="note"
                    label="Poznámky"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({...invoice, note: e.target.value});
                    }}
                />
                <br/>
                <input type="submit" className="btn btn-primary" value="Uložit"/>
                <br/>
                <br/>
            </form>
        </div>
    );
};

export default InvoiceForm;