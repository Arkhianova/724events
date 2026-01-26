import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
  EMAIL: 3,
};

const Field = ({ type, label, placeholder }) => {
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          id={label}
          type="text"
          name={label}
          placeholder={placeholder}
          data-testid="field-testid"
          required
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = <textarea name={label} id={label} data-testid="field-testid" required />;
      break;
    case FIELD_TYPES.EMAIL:
      component = (
        <input
          id={label}
          type="email"
          name={label}
          placeholder={placeholder}
          data-testid="field-testid"
          autoComplete="on"
          required
        />
      );
      break;
    default:
      component = (
        <input
          id={label}
          type="text"
          name={label}
          placeholder={placeholder}
          data-testid="field-testid"
          required
        />
      );
  }
  return (
    <div className="inputField">
      <label htmlFor={label}>{label}</label>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};
 Field.defaultProps = {
   label: "",
   placeholder: "",
   type: FIELD_TYPES.INPUT_TEXT,
   name: "field-name",
 }

export default Field;
