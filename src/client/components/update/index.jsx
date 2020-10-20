import TextField from "@material-ui/core/TextField";
import React, { useContext } from "react";
import useInputChange from "Hooks/useInputChange";
import "./style.sass";
import { Button } from "@material-ui/core";
import useValidation from "Hooks/useValidation";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { store } from "Store";
import WithMessages from "Hocs/withMessages";
import fields from "./config.json";
import { addUser, updateUser } from "../../api";
import { splitCamelCase } from "../../utils";

const Update = ({ history }) => {
  const { state, dispatch } = useContext(store);

  const activeUser = state.data && state.selected
    ? state.data[state.selected]
    : {};

  const [input, handleInputChange] = useInputChange(activeUser);
  const [validation, handleValidation] = useValidation();

  const handleAddClick = () => {
    const emptyFields = Object.keys(fields).reduce((result, name) => {
      if (result === true || input[name] === undefined || input[name] === "") return true;
      return false;
    }, false);

    if (emptyFields) {
      dispatch({ type: "ERROR", payload: "Some fields are empty!" });
      return;
    }

    const isInvalidField = Object.keys(fields)
      .filter(key => validation[key] && !validation[key].result).length > 0;

    if (isInvalidField) {
      dispatch({ type: "ERROR", payload: "Some fields are not filled correctly!" });
      return;
    }

    if (state.selected) {
      updateUser(dispatch, state.selected, input);
    } else {
      addUser(dispatch, input);
    }

    history.push("/");
  };

  const handleCancelClick = () => {
    history.push("/");
  };

  return (
    <form className="add" noValidate autoComplete="off">
      {
        Object.entries(fields).map(([name, params]) => (
          <TextField
            error={validation[name] && validation[name].result === false}
            helperText={validation[name] && validation[name].message}
            key={name}
            name={name}
            label={splitCamelCase(name)}
            onBlur={e => handleValidation({
              name,
              params,
              value: e.currentTarget.value
            })}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            value={input[name] || ""}
          />
        ))
      }
      <Button
        color="primary"
        variant="contained"
        onClick={handleAddClick}
      >
        Confirm
      </Button>
      <Button
        color="secondary"
        variant="contained"
        onClick={handleCancelClick}
      >
        Cancel
      </Button>
    </form>
  );
};

Update.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired
};

export default withRouter((WithMessages(Update)));
