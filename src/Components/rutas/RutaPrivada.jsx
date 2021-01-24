import React,{useContext,useEffect} from 'react'
import {Route,Redirect} from 'react-router-dom';
import AutenticacionContext from '../../Context/Autenticacion/AutenticacionContext';

//Componentes de orden superior
const RutaPrivada = ({component:Component, ...props}) =>{
    //Context de autenticación
    const autenticacionContext = useContext (AutenticacionContext);
    const {autenticado,usuarioAutenticado,cargando} = autenticacionContext; 

    useEffect ( ()=>{
        usuarioAutenticado()
        //eslint-disable-next-line
    },[])

    return (
        <Route {...props} render={props=> !autenticado && !cargando ?
            (<Redirect to="/" />) 
            :
            (<Component {...props} /> ) 
        } />
    );
}

export default RutaPrivada;