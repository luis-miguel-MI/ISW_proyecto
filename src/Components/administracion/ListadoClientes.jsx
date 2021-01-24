import React from 'react'
import {useState,useEffect} from 'react';
import clienteAxios from '../../config/axios'
import Cliente from './Cliente';

const ListadoClientes = () => {

    const [usuarios,setUsuarios] = useState ([]);

    useEffect(() => {
        obtenerClientes()    
    }, [])

    const obtenerClientes = async () => {

        try {
            const usuarios = await clienteAxios.get (`/api/usuarios`);
            //console.log(usuarios.data);
            setUsuarios(usuarios.data.usuarios);
        } catch (error) {

            const alerta ={
                msg: 'Hubo un error',
                categoria : 'alerta-error'
            }
            console.log ("HUBO UN AL RECUPERAR EL ARCHIVO");
            console.log (alerta)
        }
    }


    if (Object.keys(usuarios).length === 0) 
    {
        return(  
            <p>No hay clientes registrados</p>
    )}

    return ( 
        <div>
            <h1>Clientes</h1>
            {
                usuarios.map( usuario=>(
                    <Cliente usuario={usuario} key={usuario._id}/>
                ))
            }
        </div>
     );
}
 
export default ListadoClientes;