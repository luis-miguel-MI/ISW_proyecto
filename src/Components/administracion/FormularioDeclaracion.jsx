import React from "react";
import { useContext, useState } from "react";

import declaracionContext from "../../Context/Declaraciones/DeclaracionesContext";

const FormularioDeclaracion = () => {
  const DeclaracionContext = useContext(declaracionContext);
  const { crearDeclaracion } = DeclaracionContext;

  //STATE DEL FORMULARIO
  const [declaracion, setDeclaracion] = useState({
    nombre: "",
    rfc: "",
    file: "",
  });

  //FUNCION PARA CAMBIOS EN EL FORMULARIO INFORMACION
  const onChangeHandler = (event) => {
    setDeclaracion({ ...declaracion, [event.target.name]: event.target.value });
  };

  //Manejador de cambios de archivos
  const handleOnFileChange = (e) => {
    const file = e.target.files[0];
    setDeclaracion({ ...declaracion, [e.target.id]: file });
  };

  //FUNCION PARA DE FORMULARIO
  const handleSubmit = (event) => {
    event.preventDefault();

    //validar proyecto
    if (declaracion.nombre === "" || declaracion.rfc === "" || declaracion.file==="") {
      alert("TODOS LOS CAMPOS DEL FORMULARIO SON OBLIGATORIOS");
      //mostrarError();
      return;
    }

    //agregar proyecto
    crearDeclaracion(declaracion);

    //limpiar state
    setDeclaracion({ nombre: "", rfc: "", file: null });
  };

  return (
    <div className="ml-5">
      <h1>FORMULARIO DECLARACIÓN</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label htmlFor="nombre">Nombre de la declaración: </label>
          <input
            type="text"
            id="nombre"
            placeholder=""
            className="input-text"
            name="nombre"
            onChange={onChangeHandler}
            value={declaracion.nombre}
          />
        </div>
        
        <label htmlFor="rfc">RFC del cliente</label>
        <input
          type="text"
          id="rfc"
          placeholder=""
          className="input-text"
          name="rfc"
          onChange={onChangeHandler}
          value={declaracion.rfc}
        />
        <input 
          type="file" 
          id="file" 
          className="btn btn-primary offset-4 col-4"
          onChange={handleOnFileChange} 
        />
        <br/>
        <input
          type="submit"
          className="btn btn-dark btn-lg col-4 offset-4"
          value="Agregar Declaracion"
        />
      </form>
      <br/>
    </div>
  );
};

export default FormularioDeclaracion;
