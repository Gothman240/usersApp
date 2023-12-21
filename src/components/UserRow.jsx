import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const UserRow = ({ id, username, email}) => {

  const {handlerUserSelectedForm, handlerRemoveUser} = useContext(UserContext)

  return (
    <tr>
      <td>{id}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>
        <button className="btn btn-secondary btn-sm" type="button" onClick={() => handlerUserSelectedForm({id, username, email})}>
          update
        </button>
      </td>
      <td>
        <NavLink className="btn btn-secondary btn-sm" to={"/users/edit/" + id}>
          update 2
        </NavLink>
      </td>
      <td>
        <button className="btn btn-danger btn-sm" type="button" onClick={() => handlerRemoveUser(id)}>
          delete
        </button>
      </td>
    </tr>
  );
};
