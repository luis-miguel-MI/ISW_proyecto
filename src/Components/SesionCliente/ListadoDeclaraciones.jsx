import React, {useContext, useEffect} from 'react'

import declaracionContext from '../../Context/Declaraciones/DeclaracionesContext'
import Declaracion from './Declaracion';

const ListadoDeclaraciones = () => {

    const DeclaracionContext = useContext (declaracionContext);
    
    const {declaraciones,obtenerDeclaraciones} = DeclaracionContext;

    useEffect(() => {
        obtenerDeclaraciones();
        //alert ("Declaraciones obtenidas")
        // eslint-disable-next-line
    }, [])


    if (Object.keys(declaraciones).length === 0) 
    {
        return(  
            <p>No hay declaraciones disponibles</p>
    )}

    return ( 
        <div>
            <br/>
            <h2>LISTADO DE DECLARARIONES</h2>
            {
                declaraciones.map( declaracion=>(
                    <Declaracion declaracion={declaracion} key={declaracion._id}/>
                ))
            }

        </div>
     );
}
 
export default ListadoDeclaraciones;