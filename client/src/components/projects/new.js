import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from "axios";

function New(){
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post('/api/projects', {
      project: inputs
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

  if( redirect ) return <Redirect to="/projects" />

  return (
    <div className="container">
      <header>
        <h1>New Project</h1>
      </header>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Name</label>
            <input type="text" className="form-control" name="name" required="required" onChange={handleInputChange} placeholder="Fresh New Website" />
          </div>

          <div className="form-group form-row">
            <div className="col-sm-6">
              <label>Teamwork ID</label>
              <input type="text" className="form-control" name="teamworkId" onChange={handleInputChange} placeholder="000000000" />
            </div>
            <div className="col-sm-6">
              <label>Toggl ID</label>
              <input type="text" className="form-control" name="togglId" onChange={handleInputChange} placeholder="000000000" />
            </div>
          </div>
          
          <div className="form-group form-row">
            <div className="col-sm-6">
              <label>Estimated Hours</label>
              <input type="text" className="form-control" name="estimatedHours" onChange={handleInputChange} />
            </div>
            <div className="col-sm-6">
              <label>Actual Hours</label>
              <input type="text" className="form-control" name="actualHours" onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group form-row">
            <div className="col-sm-6">
              <label>Status</label>
              <select className="form-control" name="status" required="required" onChange={handleInputChange}>
                <option value="">-- Select --</option>
                {['ACTIVE', 'ARCHIVED'].map( ( v, i ) => {
                  return (<option key={i} value={v}>{v.toLowerCase()}</option>);
                }
                )}
              </select>
            </div>

            <div className="col-sm-6 align-self-end text-right">
              <button type="submit" className="btn btn-primary">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default New;