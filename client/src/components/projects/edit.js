import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom'
import Axios from 'axios';

function Edit(props) {

  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    Axios.get(`/api/projects/${props.match.params.id}`)
    .then( result => setInputs( result.data ) )
    .catch( err => console.error( err ) );
  }, [props]);

  function handleSubmit( event ){
    event.preventDefault();
    Axios.post('/api/projects/update', {
      id: props.match.params.id,
      project: inputs
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

  if( redirect ) return <Redirect to="/projects" />;

  return (
    <div className="container">
      <header>
        <h1>Edit Project</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Name</label>
            <input type="text" className="form-control" name="name" defaultValue={inputs.name} required="required" onChange={handleInputChange} />
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
              <label>Estimated Hours</label>
              <input type="text" className="form-control" name="estimatedHours" defaultValue={inputs.estimatedHours} onChange={handleInputChange} />
            </div>
            <div className="col-sm-6">
              <label>Actual Hours</label>
              <input type="text" className="form-control" name="actualHours" defaultValue={inputs.actualHours} onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select className="form-control" name="status" defaultValue={inputs.status} required="required" onChange={handleInputChange}>
              {['ACTIVE', 'ARCHIVED'].map( ( v, i ) => {
                return (<option key={i} value={v}>{v.toLowerCase()}</option>);
              }
              )}
            </select>
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