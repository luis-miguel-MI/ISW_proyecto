
import {
    OBTENER_DECLARACIONES,
    CREAR_DECLARACION,
    ELIMINAR_DECLARACION
} from '../../Types/';

export default (state, action) =>{
    
    switch (action.type) {
        case OBTENER_DECLARACIONES:
            return {
                ...state,
                declaraciones:action.payload
            }
        
        case CREAR_DECLARACION:
            return {
                ...state,
                declaraciones:[...state.declaraciones,action.payload],
                errorFormulario:false
            }

        case ELIMINAR_DECLARACION:
            return {
                ...state,
                declaraciones:state.declaraciones.filter(Declaracion => Declaracion._id !== action.payload)
            }



        default:
            break;
    }
}