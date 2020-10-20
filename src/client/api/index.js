import axios from "axios";
import { apiUrl } from "Config";

export const deleteUser = async (dispatch, key) => {
  dispatch({ type: "LOADING"});

  try {
    await axios.get(`${apiUrl}/users/delete/${key}`);

    dispatch({ type: "USER_DELETED", payload: key });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.message });
  }
};

export const addUser = async (dispatch, input) => {
  dispatch({ type: "LOADING"});

  try {
    await axios.post(`${apiUrl}/users/add`, input);

    dispatch({ type: "USER_ADDED", payload: input });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.message });
  }
};

export const updateUser = async (dispatch, id, data) => {
  dispatch({ type: "LOADING"});

  try {
    await axios.post(`${apiUrl}/users/update`, { id, data });

    dispatch({ type: "USER_UPDATED", payload: data });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.message });
  }
};
