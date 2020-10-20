import React, { useContext } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { store } from "Store";

const WithMessages = (WrappedComponent) => {
  const Alert = props => (<MuiAlert elevation={6} variant="filled" {...props} />);

  const MyComponent = props => {
    const { dispatch, state } = useContext(store);

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      dispatch({ type: "CLEAR_MESSAGE" });
    };

    return (
      <>
        <Snackbar open={!!state.message} autoHideDuration={2000} onClose={handleClose}>
          {
            state.message && state.message.type && (
              <Alert severity={state.message.type}>
                {state.message.content}
              </Alert>
            )
          }
        </Snackbar>
        <WrappedComponent {...props} />
      </>
    );
  };

  return MyComponent;
};

export default WithMessages;
