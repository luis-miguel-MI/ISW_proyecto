import React , {useContext} from 'react';
import clienteAxios from '../../config/axios'
import AutenticacionContext from '../../Context/Autenticacion/AutenticacionContext';
import declaracionContext from '../../Context/Declaraciones/DeclaracionesContext'

const Declaracion = ({declaracion}) => {

    const autenticacionContext = useContext (AutenticacionContext);
    const {admin} = autenticacionContext; 

    const DeclaracionContext = useContext (declaracionContext);
    const {eliminarDeclaracion} = DeclaracionContext;

    const {nombre, fecha ,rfc,_id,file} = declaracion;



    const obtenerArchivo = async (nombre) => {

        try {
            const archivo = await clienteAxios.get (`/api/archivos` , {params:{nombre}},{
                responseType: 'arraybuffer',
                headers : {
                    Accept: 'aplication/pdf'
                }
            });
            console.log(archivo);
            window.open(archivo.data, '_blank');

        } catch (error) {

            const alerta ={
                msg: 'Hubo un error',
                categoria : 'alerta-error'
            }
            console.log ("HUBO UN AL RECUPERAR EL ARCHIVO");
            console.log (alerta)
            /*
            dispatch ({
                type: PROYECTO_ERROR,
                payload: alerta
            }) */
        }
    }


    const handlerEliminarDeclaracion = id =>{
        eliminarDeclaracion(id);
    }

    return ( 
        <div className="card m-5">
            <div className="card-header">
            <h3 className="cart-title">Declaracion: {nombre }</h3>
            </div>
            <div className="card-body">
            
            
            <h3>RFC : {rfc}</h3>
            
            <h3>fecha: {fecha }</h3>
                {admin ? (
                    <div>
                    <button
                        type="button"
                        className="btn btn-outline-primary offset-8 col-2"
                        onClick={()=>obtenerArchivo(file)}
                    >
                    Obtener declaración
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-danger col-2"
                        onClick={()=>handlerEliminarDeclaracion(_id)}
                    >Eliminar</button>
                    </div>) 
                : (
                    <button
                        type="button"
                        className="btn btn-outline-primary offset-8 col-4"
                        onClick={()=>obtenerArchivo(file)}
                    >
                        Obtener declaración
                    </button>
                )}
            </div>
        </div>
     );
}
 
export default Declaracion;