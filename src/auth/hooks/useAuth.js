import React, { useReducer } from 'react'
import { LoginReducer } from '../reducers/LoginReducer';
import Swal from 'sweetalert2';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined,
}

export const useAuth = () => {
    
    const [login, dispatch] = useReducer(LoginReducer, initialLogin);

    const navigate = useNavigate();

    const handlerLogin = ({ username, password }) => {
        const isLogin = loginUser({username, password})
        if (isLogin) {
            const user = { username: 'admin' }
            dispatch({
                type: 'login',
                user: user,
            })
            window.sessionStorage.setItem('login', JSON.stringify({ isAuth: true, user }))
            navigate("/users")
        } else {
            Swal.fire('Error de Validación', 'Username y Password invalidos', 'error')
        }
    }

    const handlerLogout = () => {
        dispatch({
            type: 'logout'
        })
        sessionStorage.removeItem('login')
    }

    return {
        login,
        handlerLogin,
        handlerLogout
    }
}
