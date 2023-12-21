import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../auth/context/AuthContext'

export const Navbar = () => {

    const {login, handlerLogout} = useContext(AuthContext)

    return (
        <nav className="navbar navbar-expand-md bg-body-tertiary flex-wrap">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">UserApp</a>              
                <div className="" id="navbarNav">
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className="nav-link" to="/users">Usuarios</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className="nav-link" to="/users/register">Registrar Usuarios</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="d-flex justify-content-end flex-wrap" id="navbarNavLogout">
                    <span className="nav-item nav-link text-primary mx-3">{login.user?.username}</span>                    
                    <button className="btn btn-outline-success btn-sm" onClick={handlerLogout}>Logout</button>
                </div>
            </div>
        </nav>
    )
}
