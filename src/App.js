import React from 'react';
import {BrowserRouter as Router,Switch,Route}from 'react-router-dom';
import Login from './Components/auth/Login';
import NuevaCuenta from './Components/auth/NuevaCuenta';
import AlertaState from './Context/Alertas/AlertaState';
import AutenticacionState from './Context/Autenticacion/AutenticacionState';
import tokenAuth from './config/tokenAuth';
import RutaPrivada from './Components/rutas/RutaPrivada';
import Inicio from './Components/Inicio/Inicio';
import PrincipalCliente from './Components/SesionCliente/PrincipalCliente';
import DeclaracionesState from './Context/Declaraciones/DeclaracionesState';
import Administracion from './Components/administracion/Administracion';

//Revisar si existe un token
const token = localStorage.getItem('token');
if (token){
  tokenAuth(token);
}

function App() {

  return (
        <AlertaState>
          <AutenticacionState>
            <DeclaracionesState>
            <Router>
              <div className="container-fluid">
              <Switch>
                <Route exact path ="/" component={Inicio}/>
                <Route exact path ="/login" component={Login}/>
                <Route exact path ="/nueva-cuenta" component={NuevaCuenta}/>
                <RutaPrivada exact path ="/administracion" component={Administracion}/>
                <RutaPrivada exact path ="/cliente" component={PrincipalCliente}/>
              </Switch>
              </div>
            </Router>
            </DeclaracionesState>
          </AutenticacionState>
        </AlertaState>
      
    
  );
}

export default App;
