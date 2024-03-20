import React from "react";

export function InputSelect(props) {
  const multiple = props.multiple;
  const required = props.required || false;

  
  const emptySelected = multiple ? props.value?.length === 0 : !props.value;
  
  const objectItems = props.enum ? false : true;

  return (
    <div className="form-group">
      <label>{props.label}:</label>
      <select
        required={required}  
        className="browser-default form-select"
        multiple={multiple}
        name={props.name}
        onChange={props.handleChange}
        value={props.value}
      >
        {required ? (
          
          <option disabled value={emptySelected}>
            {props.prompt}
          </option>
        ) : (
          
          <option key={0} value={emptySelected}>
            ({props.prompt})
          </option>
        )}

        {objectItems
          ? 
            props.items.map((item, index) => (
              <option key={required ? index : index + 1} value={item._id}>
                {item.name}
              </option>
            ))
          : 
            props.items.map((item, index) => (
              <option key={required ? index : index + 1} value={item}>
                {item}
              </option>
            ))}
      </select>
    </div>
  );
}

export default InputSelect;
