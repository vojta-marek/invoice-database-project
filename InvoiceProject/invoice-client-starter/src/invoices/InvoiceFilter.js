import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField";

const InvoiceFilter = (props) => {
  const handleChange = (e) => {
    props.handleChange(e);
  };

  const handleSubmit = (e) => {
    props.handleSubmit(e);
  };

  const filter = props.filter;

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <InputSelect
            name="sellerID"
            items={props.sellerList}
            handleChange={handleChange}
            label="Dodavatel"
            prompt="nevybrán"
            value={filter.sellerID}
          />
        </div>
        <div className="col">
          <InputSelect
            name="buyerID"
            items={props.buyerList}
            handleChange={handleChange}
            label="Odběratel"
            prompt="nevybrán"
            value={filter.buyerID}
          />
        </div>
        <div className="col">
          <InputSelect
            enum={true}
            name="product"
            items={props.productList}
            handleChange={handleChange}
            label="Produkt"
            prompt="nevybrán"
            value={filter.product}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <InputField
            type="number"
            min="0"
            name="minPrice"
            handleChange={handleChange}
            label="Od částky"
            prompt="neuvedeno"
            value={filter.minPrice ? filter.minPrice : ""}
          />
        </div>

        <div className="col">
          <InputField
            type="number"
            min="0"
            name="maxPrice"
            handleChange={handleChange}
            label="Do částky"
            prompt="neuvedeno"
            value={filter.maxPrice ? filter.maxPrice : ""}
          />
        </div>

        <div className="col">
          <InputField
            type="number"
            min="1"
            name="limit"
            handleChange={handleChange}
            label="Limit počtu faktur"
            prompt="neuveden"
            value={filter.limit ? filter.limit : ""}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <input
            type="submit"
            className="btn btn-secondary float-right mt-2"
            value={props.confirm}
          />
        </div>
      </div>
    </form>
  );
};

export default InvoiceFilter;