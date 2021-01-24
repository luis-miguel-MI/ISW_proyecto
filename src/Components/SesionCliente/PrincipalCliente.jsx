import React, {useContext,useEffect} from 'react'
import AutenticacionContext from '../../Context/Autenticacion/AutenticacionContext';
import Barra from '../layout/Barra';
import ListadoDeclaraciones from './ListadoDeclaraciones';

const PrincipalCliente = () => {

    const autenticacionContext = useContext (AutenticacionContext);
    const {usuarioAutenticado,usuario} = autenticacionContext; 

    useEffect(()=>{
        usuarioAutenticado();
        //eslint-disable-next-line
    },[])

    return ( 
        <div>
            <Barra/>
            {usuario ? 
            (<p className="font-weight-bold">
                <span> {`Bienvenido ${usuario.nombre} `}</span>
            </p>)
      :null}
            <h1>Declaraciones </h1>
            <div className="listado">
                <ListadoDeclaraciones/>
            </div>
        </div>
     );
}
 
export default PrincipalCliente;