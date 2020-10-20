import Axios from "axios";
import { useEffect, useContext } from "react";
import { store } from "Store";

export default function useFetch(url, config) {
  const { dispatch } = useContext(store);

  useEffect(() => {
    const run = async () => {
      dispatch({ type: "LOADING" });
      try {
        const response = await Axios(url, config);

        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (error) {
        dispatch({ type: "ERROR", payload: error.message });
      }
    };

    run();
  }, []); // eslint-disable-line
}
