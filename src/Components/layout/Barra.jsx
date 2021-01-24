import React,{useContext} from 'react'
import AutenticacionContext from '../../Context/Autenticacion/AutenticacionContext';
//import { useEffect } from 'react';
import {Link } from 'react-router-dom';

const Barra = () => {

    //Context de autenticación
    const autenticacionContext = useContext (AutenticacionContext);
    const {usuario,cerrarSesion,admin} = autenticacionContext; 

    /*
    useEffect(()=>{
        usuarioAutenticado();
        //eslint-disable-next-line
    },[]);*/

    /* console.log(usuario); */


    return ( 
        <header className="">
            
            <nav className="navbar navbar-light bg-light">
                <Link to={"/"} >
                    <img src={process.env.PUBLIC_URL + '/img/logo.jpeg'} alt="logo"/>
                </Link>
                {!usuario ? (
                    <div>
                        <Link to={"/login"} className="btn btn-outline-dark" >INGRESAR</Link>
                        <Link to={"/nueva-cuenta"} className="btn btn-outline-dark" >REGISTRARSE</Link>
                    </div>
                ) 
                :
                (
                    <div>
                        <Link to={admin?"/administracion":"/cliente"} className="btn btn-outline-dark" >Declaraciones</Link>
                        <button
                            className="btn btn-outline-dark"
                            onClick={()=>cerrarSesion()}
                        >
                            Cerrar sesion
                        </button>
                    </div>
                )
                }
            </nav>

        </header>
     );
}
 
export default Barra;