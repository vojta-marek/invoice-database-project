import React, {useEffect, useState} from "react";
import {apiDelete, apiGet} from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";

const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [buyerListState, setBuyerList] = useState([]);
    const [sellerListState, setSellerList] = useState([]);
    const [productListState, setProductList] = useState([]);
    const [filterState, setFilter] = useState({
        sellerID: undefined,
        buyerID: undefined,
        product: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        limit: undefined,
    });

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setInvoices(invoices.filter((item) => item._id !== id));
    };

    useEffect(() => {
        apiGet("/api/persons").then((data) => {
          setBuyerList(data)
          setSellerList(data)
        });
        apiGet("/api/invoices").then((data) => {
          setInvoices(data)
          setProductList(Array.from(new Set(data.map((invoice) => invoice.product))))
        });
    }, []);

    const handleChange = (e) => {
        console.log(e.target.value);
        if (
          e.target.value === "false" ||
          e.target.value === "true" ||
          e.target.value === ""
        ) {
          setFilter((prevState) => {
            return { ...prevState, [e.target.name]: undefined };
          });
        } else {
          setFilter((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
          });
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const params = filterState;
    
        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
      };

    return (
        <>
            <div>
                <br/>
                <InvoiceFilter
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    sellerList={sellerListState}
                    buyerList={buyerListState}
                    productList={productListState}
                    filter={filterState}
                    confirm="Filtrovat faktury"
                    reset="Resetovat"
                />
                <br/>
                <h1>Seznam faktur</h1>
                <hr />
                <InvoiceTable 
                    deleteInvoice={deleteInvoice}
                    items={invoices}
                    label="Počet faktur:"
                />
            </div>
        </>
    );
};
export default InvoiceIndex;