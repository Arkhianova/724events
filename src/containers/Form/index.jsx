import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); });
// const mockContactApi = () => new Promise((resolve, reject) => { setTimeout(() => reject(new Error("API Error")), 500); });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

  const resetForm = () => {
    const formElements = document.querySelectorAll("form input, form textarea");
    formElements.forEach((element) => {
      element.value = "";
    });
    const select = document.querySelector("form .SelectTitle--show ");
    select.textContent = "";
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
        resetForm();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" type={FIELD_TYPES.INPUT_TEXT} />
          <Field placeholder="" label="Prénom" type={FIELD_TYPES.INPUT_TEXT}   />
          <Select
            selection={["Personnel", "Entreprise"]}
            onChange={() => null}
            label="Personnel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" type={FIELD_TYPES.EMAIL} />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
