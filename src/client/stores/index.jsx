import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

const initialState = {};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((currentState, action) => {
    switch (action.type) {
    case "LOADING":
      return { ...currentState, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...currentState,
        loading: false,
        data: action.payload,
        message: {
          type: "success",
          content: "User list loaded successfully!"
        }
      };
    case "ERROR":
      return {
        ...currentState,
        loading: false,
        message: {
          type: "error",
          content: action.payload
        }
      };
    case "CLEAR_MESSAGE":
      return {
        ...currentState,
        message: null
      };
    case "USER_DELETED": {
      const { [action.payload]: remove, ...data } = currentState.data;

      return {
        ...currentState,
        loading: false,
        data,
        message: {
          type: "success",
          content: "User deleted successfully!"
        }
      };
    }
    case "USER_ADDED":
      return {
        ...currentState,
        loading: false,
        message: {
          type: "success",
          content: "User added successfully!"
        }
      };
    case "USER_UPDATED":
      return {
        ...currentState,
        loading: false,
        message: {
          type: "success",
          content: "User updated successfully!"
        }
      };
    case "USER_SELECTED":
      return {
        ...currentState,
        selected: action.payload
      };
    default:
      throw new Error("Reducer not found.");
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

StateProvider.propTypes = {
  children: PropTypes.shape({}).isRequired
};

export { store, StateProvider };
