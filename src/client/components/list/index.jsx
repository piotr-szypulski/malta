import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import useFetch from "Hooks/useFetch";
import {
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button, CircularProgress
} from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
import { store } from "Store";
import { apiUrl } from "Config";
import { deleteUser } from "../../api";
import WithMessages from "../../hocs/withMessages";
import "./style.sass";

const List = ({ history }) => {
  useFetch({ url: `${apiUrl}/users` });

  const { dispatch, state } = useContext(store);

  const handleDelete = async key => {
    deleteUser(dispatch, key);
  };

  const handleUpdate = async key => {
    dispatch({ type: "USER_SELECTED", payload: key });
    history.push("/add");
  };

  const handleAddClick = () => {
    history.push("/add");
  };

  return (
    <div className="users">
      {
        state.loading && (<CircularProgress />)
      }
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Town</TableCell>
            <TableCell>Post Code</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            state.data && Object.entries(state.data).map(([key, item]) => (
              <TableRow key={key}>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{`${item.address1} ${item.address2}`}</TableCell>
                <TableCell>{item.town}</TableCell>
                <TableCell>{item.postCode}</TableCell>
                <TableCell>{item.region}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>{item.contactNumber}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" onClick={() => handleDelete(key)}>
                    <Delete />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton aria-label="update" onClick={() => handleUpdate(key)}>
                    <Create />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <Button color="primary" variant="contained" onClick={handleAddClick}>Add User</Button>
    </div>
  );
};

List.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired
};

export default withRouter(WithMessages(List));
