import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

function Register (){
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  function handleSubmit(event){
    event.preventDefault();

    Axios.post('/api/users', {
      user: inputs
    })
    .then( res => setRedirect(true) )
    .catch( err => console.error( err ));
  }

  function handleInputChange(event){
    event.persist();

    const {name, value} = event.target;

    setInputs( inputs => {
      inputs[name] = value;
      return inputs;
    })
  }

  if( redirect ) return <Redirect to="/login" />;

  return (
    <div className="container">
      <header>
        <h1>New User</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group form-row">
            <div className="col-sm-6">
              <label>First Name</label>
              <input className="form-control" name="firstName" required="required" onChange={handleInputChange} />
            </div>
            <div className="col-sm-6">
              <label>Last Name</label>
              <input className="form-control" name="lastName" required="required" onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input className="form-control" name="email" required="required" onChange={handleInputChange} />
          </div>

          <div className="form-group form-row">
            <div className="col-sm-6">
              <label>Password</label>
              <input className="form-control" name="password" type="password" required="required" onChange={handleInputChange} />
            </div>
            <div className="col-sm-6">
              <label>Password Confirmation</label>
              <input className="form-control" name="passwordConfirmation" required="required" onChange={handleInputChange} type="password" />
            </div>
          </div>

          <div className="form-group form-row">
            <div className="col-sm-6">
              <label>Teamwork ID</label>
              <input className="form-control" name="teamworkId" onChange={handleInputChange} type="text" />
            </div>
            <div className="col-sm-6">
              <label>Toggl ID</label>
              <input className="form-control" name="togglId" onChange={handleInputChange} type="text" />
            </div>
          </div>

          <div className="form-group text-right">
            <button className="btn btn-dark" type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
    );
}

export default Register;