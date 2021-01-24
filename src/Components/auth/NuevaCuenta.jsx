import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import AlertaContext from '../../Context/Alertas/AlertaContext'
import { useContext, useEffect } from 'react';
import AutenticacionContext from '../../Context/Autenticacion/AutenticacionContext'

const NuevaCuenta = (props) => {
   
    //Extraer los valores del context
    const alertaContext = useContext (AlertaContext);
    const {alerta,mostrarAlerta}=alertaContext; 

    //Context de autenticación
    const autenticacionContext = useContext (AutenticacionContext);
    const {registrarUsuario,mensaje,autenticado} = autenticacionContext; 

    //States
    const [usuario,setUsuario]=useState({
    email: '',
    password: '',
    rfc: '',
    nombre:'',
    confirmar:''
    });
    const {email, password,nombre,confirmar,rfc}= usuario;

    //effect
    useEffect (()=>{

        if (autenticado){
            props.history.push('/cliente'); // Se agregan los props al componente y sirve para redirigir a proyectos
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        //eslint-disable-next-line
    },[mensaje,autenticado,props.history])

    //Funciones 
    const onChange= event=> {
        setUsuario({...usuario,[event.target.name]:event.target.value})
    }

    const submitHandler = event =>{
        event.preventDefault();

        //Validar que los campos no esten vacios
        if (nombre.trim()==='' || email.trim()==='' || password.trim()==='' || confirmar.trim()==='' || rfc.trim ===''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //validar las contraseñas de minima composicion
        if ( password.length<6){
            mostrarAlerta('Logitud minima de contraseña 6 caracteres', 'alerta-error');
            return;
        }
        
        //Validar que las contraseñas coincidan
        if (password!==confirmar){
            mostrarAlerta('La contraseña y la confirmacion no coincide', 'alerta-error');
            return;
        }

        //Pasar la informacion al action
        registrarUsuario({nombre,email,password,rfc});
    }

    return ( 
        <div className="login-background">
            {alerta ? 
                ( 
                    <div className={`alerta ${alerta.categoria}`}>
                        {alerta.msg}
                    </div>
                )
            : null}
            <div className="contenedor-form ">
                <h1>Registrarse</h1>

                <form
                    onSubmit={submitHandler}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre del ususario</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            placeholder="Tu nombre"
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Tu email"
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="rfc">RFC</label>
                        <input 
                            type="text"
                            id="rfc"
                            name="rfc"
                            value={rfc}
                            placeholder="RFC"
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar password</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarse"
                        />
                    </div>

                </form>
                <Link to={'/'} className='enlace-cuenta'>Iniciar sesion </Link>
                <Link to={'/'} className='enlace-cuenta'>Regresar </Link>
            </div>
        </div>
    );
    }
 
export default NuevaCuenta;