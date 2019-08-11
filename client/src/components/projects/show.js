import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import moment from 'moment';
import UserImage from '../users/userImage';

function Show(props){

  const [project, setProject] = useState([]);

  useEffect( () => {
    Axios.get( `/api/projects/${props.match.params.id}`)
    .then( result => setProject( result.data ) )
    .catch( err => console.error( err ) );
  }, [props] );

  return (
    <div className="container">
      <header>
        <h1>{project && project.name}</h1>
      </header>

      <div>
        {console.log(project)}
        <div className="card">
          <div className="card-header">
            <h2>Project Overview</h2>
          </div>
          <div className="card-body">
            <strong>Start Date:</strong> {( project.teamworkProject && project.teamworkProject.startDate && moment(project.teamworkProject.startDate, "YYYYMMDD").format("MMMM Do, YYYY") ) || "not set"}<br />
            <strong>End Date:</strong> {( project.teamworkProject && project.teamworkProject.endDate && moment(project.teamworkProject.endDate, "YYYYMMDD").format("MMMM Do, YYYY") ) || "not set"}<br />
            <strong>Company:</strong> {(project.teamworkProject && project.teamworkProject.company && project.teamworkProject && project.teamworkProject.company.name) || "not set"}<br />
            <strong>Manager:</strong> <UserImage user={project.teamworkProject && project.teamworkProject.owner} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show;