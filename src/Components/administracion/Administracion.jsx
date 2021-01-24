import React, { useContext, useEffect } from "react";
import AutenticacionContext from "../../Context/Autenticacion/AutenticacionContext";
import Barra from "../layout/Barra";
import ListadoDeclaraciones from "../SesionCliente/ListadoDeclaraciones";
import FormularioDeclaracion from "./FormularioDeclaracion";
import ListadoClientes from "./ListadoClientes";

const Administracion = () => {
  //Context de autenticación
  const autenticacionContext = useContext(AutenticacionContext);
  const { usuarioAutenticado, admin ,usuario } = autenticacionContext;


  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);

  if (!admin) {
    return (
      <div>
        <h1>Error recurso no disponible</h1>
      </div>
    );
  }

  return (
    <div>
      <Barra />
      {usuario ? 
            (<p className="font-weight-bold">
                <span> {`Bienvenido ${usuario.nombre} `}</span>
            </p>)
      :null}

        <h1>PAGINA DE ADMINISTRACION</h1>
      
        <p>
            <button className="btn btn-outline-dark btn-lg col-4" type="button" data-toggle="collapse" data-target="#collapseFormulario" aria-expanded="false" aria-controls="collapseExample">
                Crear una declaración
            </button>
            <button className="btn btn-outline-dark btn-lg col-4" type="button" data-toggle="collapse" data-target="#collapseDeclaraciones" aria-expanded="false" aria-controls="collapseExample">
                Lista de declaraciones
            </button>
            <button className="btn btn-outline-dark btn-lg col-4" type="button" data-toggle="collapse" data-target="#collapseClientes" aria-expanded="false" aria-controls="collapseExample">
                Clientes
            </button>
        </p>
        <div className="collapse" id="collapseFormulario">
            <div className="card card-body">
                <FormularioDeclaracion />
            </div>
        </div>

        <div className="collapse" id="collapseDeclaraciones">
            <div className="card card-body">
                <ListadoDeclaraciones />
            </div>
        </div>
        <div className="collapse" id="collapseClientes">
            <div className="card card-body">
                <ListadoClientes/>
            </div>
        </div>
    </div>
  );
};

export default Administracion;
