import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";

const initialUsers = [];

const initialUserForm = {
    id: 0,
    username: "",
    password: "",
    email: "",
};

export const useUsers = () => {
    const [users, dispatch] = useReducer(usersReducer, initialUsers);

    const [userSelected, setUserSelected] = useState(initialUserForm);

    const [visibleForm, setVisibleForm] = useState(false);

    const navigate = useNavigate();

    const getUsers = async () => {
        const result = await findAll();
        console.log(result)
        dispatch({
            type: 'loadingUsers',
            payload: result.data
        })
    }

    const handlerAddForm = async (user) => {

        let response;

        if(user.id === 0){
            response = await save(user);
        }else{
            response = await update(user)
        }
        const type = (user.id === 0) ? 'addUser' : 'updateUser'

        dispatch({
            type,
            payload: response.data,
        })

        Swal.fire(
            (user.id === 0) ? 'Usuario Creado' : 'Usuario Actualizado',
            (user.id === 0) ? 'El usuario ha sido creado correctamente' : 'El usuario ha sido actualizado correctamente',
            'success'
        )
        handlerCloseForm();
        navigate("/users")
        console.log(user);
    };

    const handlerRemoveUser = (id) => {


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "SI, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                remove(id)
                dispatch({
                    type: 'removeUser',
                    payload: id
                })

                Swal.fire({
                    title: "Usuario Eliminado!",
                    text: "El usuario fue eliminado",
                    icon: "success"
                });
            }
        });
    }

    const handlerUserSelectedForm = (user) => {
        console.log(user)
        setVisibleForm(true);
        setUserSelected({ ...user })
    }

    const handlerOpenForm = () => {
        setVisibleForm(true)
    }

    const handlerCloseForm = () =>{
        setVisibleForm(false)
        setUserSelected(initialUserForm)
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddForm,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers
    }
}
