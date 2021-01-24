import React from 'react'

const Cliente = ({usuario}) => {

    const {nombre,rfc,email} = usuario;

    return ( 
        <div className="card m-5">
            <h5 className="card-header">RFC: {rfc} </h5>
            <div className="card-body">
                <div className="card-title">{nombre} </div>
                <div className="card-text">{email}</div>
            </div>
        </div>
     );
}
 
export default Cliente;