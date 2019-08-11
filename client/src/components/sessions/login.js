import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import NotificationContext from '../notification_context';

function Login(){

  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);
  const { setNotification } = useContext( NotificationContext );

  function handleSubmit( event ){
    event.preventDefault();

    Axios.post('/api/authenticate', inputs)
    .then( res => {
      setNotification( notification => {
        return {
          ...notification,
          status: 'success',
          message: 'Let the management begin!'
        }
      });
      setRedirect( true )
    } )
    .catch( err => {
      setNotification( notification => {
        return {
          ...notification,
          status: 'danger',
          message: 'Oops. Your details don\'t match anything on file. Better work on your impersonation skills...'
        }
      });
    } );
  }

  function handleInputChange( event ){
    event.persist();
    const {name, value} = event.target;

    setInputs( inputs => {
      inputs[name] = value;
      return inputs;
    })
  }

  if( redirect ) return <Redirect to="/" />;

  return (
    <div className="container">
      <header>
        <h1>Login</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" name="email" required="required" onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input className="form-control" name="password" type="password" required="required" onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <button className="btn btn-dark" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;