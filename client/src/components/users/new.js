import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from "axios";

function New(){
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post('/api/users', {
      user: inputs
    })
    .then(res => setRedirect(true))
    .catch(err => console.error(err));
  }

  function handleInputChange(event) {
    event.persist();

    const {name, value} = event.target;

    setInputs( inputs => {
      inputs[name] = value;
      return inputs;
    } );
  }

  if( redirect ) return <Redirect to="/users" />

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
              <input type="text" className="form-control" name="firstName" value={inputs.firstName} required="required" onChange={handleInputChange} />
            </div>
            <div className="col-sm-6">
              <label>Last Name</label>
              <input type="text" className="form-control" name="lastName" value={inputs.lastName} required="required" onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group form-row">
            <div className="col-sm-6">
              <label>Teamwork ID</label>
              <input type="text" className="form-control" name="teamworkId" value={inputs.teamworkId} onChange={handleInputChange} />
            </div>
            <div className="col-sm-6">
              <label>Toggl ID</label>
              <input type="text" className="form-control" name="togglId" value={inputs.togglId} onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group form-row">
            <div className="col-sm-6">
              <label>Hourly Pay Rate</label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input type="text" className="form-control" name="payRate" value={inputs.payRate} onChange={handleInputChange} style={{maxWidth: '200px'}} placeholder='15.00' />
              </div>
            </div>
          </div>

          <div className="form-group text-right">
            <button type="submit" className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default New;