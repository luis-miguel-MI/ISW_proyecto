import React, {useReducer} from 'react';
import declaracionContext from './DeclaracionesContext'
import DeclaracionReducer from './DeclaracionesReducer'
import clienteAxios from '../../config/axios'

import {
    OBTENER_DECLARACIONES,
    CREAR_DECLARACION,
    ELIMINAR_DECLARACION
} from '../../Types';



const DeclaracionesState = props => {

    const initialState = {
        declaraciones : [],
        idCliente: '',
        nombre: ""

    }

    const [state,dispatch] = useReducer (DeclaracionReducer,initialState);


    const obtenerDeclaraciones = async()=>{
        try {
            const resultados = await clienteAxios.get ('/api/declaraciones');
            console.log (resultados);

            dispatch ({
                type : OBTENER_DECLARACIONES,
                payload: resultados.data.declaracion
            })
        } catch (error) {
            const alerta ={
                msg: 'Hubo un error',
                categoria : 'alerta-error'
            }

            console.log (`Hubo un problema ${alerta} `);
        }
    }


    //Crear nueva declaración
    const crearDeclaracion = async (declaracion)=> {
        const nombre = declaracion.file.name;
        //console.log(nombre)
        const formData = new FormData();
        formData.append('file',declaracion.file);

        try {
            const archivo = await clienteAxios.post('/api/archivos',formData);
            console.log(archivo);
        } catch (error) {
            const alerta ={
                msg: 'Hubo un error',
                categoria : 'alerta-error'
            }
            console.log (`Hubo un problema ${alerta} `);
        }
        declaracion.file=nombre;
        try {
            const resultado= await (clienteAxios.post ('/api/declaraciones',declaracion));
            dispatch ({
                type: CREAR_DECLARACION,
                payload: resultado.data
            })
        } catch (error) {
            const alerta ={
                msg: 'Hubo un error',
                categoria : 'alerta-error'
            }
            console.log (`Hubo un problema ${alerta} `);
        }
    }


    //FUNDION PARA ELIMINAR UNA DECLARACION
    const eliminarDeclaracion = async (declaracionId) =>{

        try {
            await clienteAxios.delete (`/api/declaraciones/${declaracionId}`);
            dispatch ({
                type:ELIMINAR_DECLARACION,
                payload: declaracionId
            })
        } catch (error) {

            const alerta ={
                msg: 'Hubo un error',
                categoria : 'alerta-error'
            }
            console.log ("HUBO UN ERROR");
            console.log (alerta)
            /*
            dispatch ({
                type: PROYECTO_ERROR,
                payload: alerta
            }) */
        }
    }



    return ( 
        <declaracionContext.Provider
            value={{
                //States
                declaraciones : state.declaraciones, 
                nombre: state.nombre,

                //Funciones
                obtenerDeclaraciones,
                crearDeclaracion,
                eliminarDeclaracion
            }}
        >
            {props.children}
        </declaracionContext.Provider>
     );
}
 
export default DeclaracionesState;