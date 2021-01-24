import React, {useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../Context/Alertas/AlertaContext'
import AutenticacionContext from '../../Context/Autenticacion/AutenticacionContext'
//import '../../Styles/login.css'

const Login = (props) => {

    //Context de autenticación
    const autenticacionContext = useContext (AutenticacionContext);
    const {iniciarSesion,mensaje,autenticado,admin} = autenticacionContext; 

    //Context de alertas
    const alertaContext = useContext (AlertaContext);
    const {alerta,mostrarAlerta}=alertaContext; 

    //En caso de que el usuario o la contraseña no sean validos
    useEffect (()=>{

        if (autenticado){

            if (admin) {
               // console.log ("Inicio de sesion de administrador");
                props.history.push('/administracion');
            }
            else{
                //console.log ("Inicio de sesion cliente");
                props.history.push('/cliente'); // Se agregan los props al componente y sirve para redirigir a proyectos 
            //alert ("Ususario autenticado")
            }
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        //eslint-disable-next-line
    },[mensaje,autenticado,props.history,admin])

    //States
    const [usuario,setUsuario]=useState({
        email: '',
        password: ''
    });
    const {email, password}= usuario;
    
    //Funciones 
    const onChange= event=> {
        setUsuario({...usuario,[event.target.name]:event.target.value})
    }


    const submitHandler = event =>{
        event.preventDefault();

        //Validar que los campos no esten vacios
        if(email.trim()===''|| password.trim()===''){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
            return;
        }
        else if (password.length<6){
            mostrarAlerta('Composicion invalida','alerta-error');
            return;
        }

        //Iniciar sesion
        iniciarSesion({email,password});

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
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>

                <form
                    onSubmit={submitHandler}
                >
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
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesion"
                        />
                    </div>
    
                </form>
                <Link to={'/nueva-cuenta'} className='enlace-cuenta'>Abrir una cuenta </Link>
                <Link to={'/'} className='enlace-cuenta'>Regresar </Link>
            </div>
        </div>
     );
}
 
export default Login;