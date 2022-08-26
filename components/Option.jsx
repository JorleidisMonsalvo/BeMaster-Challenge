import { components } from "react-select";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <label style={{fontSize:'1rem'}}>{props.label}</label>
      </components.Option>
    </div>
  );
};

export default Option;
