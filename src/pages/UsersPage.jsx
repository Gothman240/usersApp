import React, { useContext, useEffect } from 'react'
import { UserModalForm } from '../components/UserModalForm';
import { UsersList } from '../components/UsersList';
import { useUsers } from '../hooks/useUsers';
import { UserContext } from '../context/UserContext';

export const UsersPage = () => {
  
    const {
        users,
        visibleForm,
        handlerOpenForm,
        getUsers
    } = useContext(UserContext)

    useEffect(() => {
        getUsers();    
    }, [])
    

    return (
        <>
            {!visibleForm || (

                <UserModalForm />
            )}


            <div className="container my-4">
                <h2>Users App</h2>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary" type="button" onClick={handlerOpenForm}>Nuevo Usuario</button>
                        {users.length == 0
                            ? <div className="alert alert-warning">Lista de usuarios vacía</div>
                            : <UsersList />
                        }

                    </div>



                </div>
            </div>
        </>
    )
}
