

import {
    REGISTRO_ERROR,
    REGISTRO_EXITOSO,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../Types/';

export default (state,action)=>{
    
    switch (action.type) {
        case LOGIN_EXITOSO:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                //autenticado : true,
                mensaje : null,
                cargando:false
            }


        case REGISTRO_EXITOSO:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                autenticado : true,
                mensaje : null,
                cargando:false
            }
            
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
                localStorage.removeItem('token');
                return {
                    ...state,
                    token: null,
                    usuario:null,
                    autenticado:false,
                    mensaje:action.payload,
                    cargando:false,
                    admin : false
                }
            
        case OBTENER_USUARIO: 
                return {
                    ...state,
                    admin : action.payload.admin,
                    autenticado:true,
                    usuario: action.payload,
                    cargando:false
                }
        default:
            break;
    }
}