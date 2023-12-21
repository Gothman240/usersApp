import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";



export const UserForm = ({userSelected, handlerCloseForm }) => {

  const {initialUserForm, handlerAddForm} = useContext(UserContext)

  const [userForm, setUserForm] = useState(initialUserForm);

  useEffect(() => {
    setUserForm({...userSelected, password: ''})  
  }, [userSelected])
  

  const {id, username, password, email } = userForm;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || (!password && id ===0) || !email) {
      alert("asd")
      return;
    }
    handlerAddForm(userForm)
    setUserForm(initialUserForm);
  }

  const onCloseForm = () => {
    handlerCloseForm()
    setUserForm(initialUserForm)
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        className="form-control my-3 w-75"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onInputChange}
      />
      {id > 0 || (
        <input
          className="form-control my-3 w-75"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={onInputChange}
        />
      )}
      <input
        className="form-control my-3 w-75"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <input type="hidden" name="id" value={id} />
      <button
        className="btn btn-primary"
        type="submit"
      

      >
        {id > 0 ? 'Editar' : 'Crear'}
      </button>

        {!handlerCloseForm || (
          <button className="btn btn-primary mx-2" onClick={() => onCloseForm()} type="button">Cerrar</button>

        )}

    </form>
  );
};
