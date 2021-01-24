import React, {useReducer} from 'react';
import alertaContext from './AlertaContext';
import alertaReducer from './AlertaReducer';


import {MOSTRAR_ALERTA,OCULTAR_ALERTA} from '../../Types/';

const AlertaState = props => {
    
    const initialState = {
        alerta : null
    }

    const [state,dispatch] = useReducer(alertaReducer,initialState);

    //Funciones 
    const mostrarAlerta = (msg,categoria)=>{
        dispatch({
            type: MOSTRAR_ALERTA,
            payload : {
                msg,
                categoria
            }
        });

        //Despues de 5 segundos ocultar el mensaje de alerta
        setTimeout (()=>{
            dispatch({
                type: OCULTAR_ALERTA
            })
        },5000);
    }
    return (
        <alertaContext.Provider
            value={{
                alerta : state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;