import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom'
import Axios from 'axios';

function Edit(props) {

  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    Axios.get(`/api/users/${props.match.params.id}`)
    .then( result => setInputs( result.data ) )
    .catch( err => console.error( err ) );
  }, [props]);

  function handleSubmit( event ){
    event.preventDefault();
    Axios.post('/api/users/update', {
      id: props.match.params.id,
      user: inputs
    })
    .then( result => { setRedirect( true ) } )
    .catch( err => console.error( err ) );
  }

  function handleInputChange( event ) {
    event.persist();

    const {name, value} = event.target;

    setInputs( inputs => {
      return {
        ...inputs,
        [name]: value
      };
    });
  }

  if( redirect ) return <Redirect to="/users" />;

  return (
    <div className="container">
      <header>
        <h1>Edit User Profile</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group form-row">
            <div className="col-sm-6">
              <label>First Name</label>
              <input type="text" className="form-control" name="firstName" defaultValue={inputs.firstName} required="required" onChange={handleInputChange} />
            </div>
            <div className="col-sm-6">
              <label>Last Name</label>
              <input type="text" className="form-control" name="lastName" defaultValue={inputs.lastName} required="required" onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group form-row">
            <div className="col-sm-6">
              <label>Teamwork ID</label>
              <input type="text" className="form-control" name="teamworkId" defaultValue={inputs.teamworkId} onChange={handleInputChange} />
            </div>
            <div className="col-sm-6">
              <label>Toggl ID</label>
              <input type="text" className="form-control" name="togglId" defaultValue={inputs.togglId} onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group form-row">
            <div className="col-sm-6">
              <label>Hourly Pay Rate</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input type="text" className="form-control" name="payRate" defaultValue={inputs.payRate} onChange={handleInputChange} style={{maxWidth: '200px'}} placeholder='15.00' />
              </div>
            </div>
          </div>

          <div className="form-group text-right">
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Edit;