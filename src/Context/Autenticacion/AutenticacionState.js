import React,{useReducer} from 'react';
import autenticacionContext from './AutenticacionContext'
import autenticacionReducer from './AutenticacionReducer'

//Importar el cliente de axios para comunicarse con el backend
import clienteAxios from '../../config/axios'

//Imprtar el token
import tokenAuth from '../../config/tokenAuth';

import {
    REGISTRO_ERROR,
    REGISTRO_EXITOSO,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../Types/';

const AutenticacionState = props=>{

    //Para guardar el token en Local storage
    const initialState = {
        token: localStorage.getItem('token'), 
        autenticado : null,
        usuario: null,
        mensaje: null,
        cargando : true,
        admin : false  
    }

    const [state,dispatch] = useReducer(autenticacionReducer,initialState);

    //Funciones 

    //Registar usuario conexion con /api/usuari enviar un post
    const registrarUsuario = async (datos) =>{
        try {
            const respuesta = await clienteAxios.post('/api/usuarios',datos);
            
            //console.log (respuesta);

            dispatch ({
                type:REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            //Obtener el usuario autenticado
            usuarioAutenticado();
            
        } catch (error) {
            console.log (error.response);
            const alerta = {
                msg : error.response.data.msg,
                categoria :'alerta-error'
            }
            dispatch ({
                type : REGISTRO_ERROR,
                payload: alerta
            })
        }
    }


    //Regresar el usuario autenticado 
    const usuarioAutenticado = async ()=>{
        const token = localStorage.getItem('token');
        if (token){
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            //console.log(respuesta.data.usuario); 
            dispatch ({
                type:OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            console.log(error);
            dispatch ({
                type: LOGIN_ERROR
            })
        }
    }

    //Funcion para iniciar sesion 
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth',datos);
            //console.log(respuesta);
            dispatch ({
                type:LOGIN_EXITOSO,
                payload: respuesta.data
            });

            usuarioAutenticado();
            
        } catch (error) {
            const alerta = {
                msg : error.response.data.msg,
                categoria :'alerta-error'
            }
            dispatch ({
                type : LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    //Cerrar sesion
    const cerrarSesion =()=>{
        dispatch ({
            type: CERRAR_SESION
        })
    }

    return (
        <autenticacionContext.Provider
            value={{
                token : state.token,
                autenticado: state.autenticado,
                usuario : state.usuario,
                mensaje: state.mensaje,
                cargando:state.cargando,
                admin : state.admin,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </autenticacionContext.Provider>
    )
}

export default AutenticacionState;