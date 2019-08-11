import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {Link } from 'react-router-dom';
import UserImage from '../users/userImage';
import ProjectLinks from '../projects/projectLinks';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'; 

function Index () {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    Axios.get( '/api/projects')
    .then( result => setProjects(result.data))
    .catch(err => {console.error(err);})
  }, []);

  let tableBody = (
      <tr key="no-projects">
        <td colSpan="8">
          <div className="alert alert-info">
            Hey there,<br />
            You need to create a <Link to='/projects/new'>new project</Link> before you will see projects here.
          </div>
        </td>
      </tr>
    );

  if( projects.length ){
    tableBody = (
      projects.map(project => {
        console.log(project)
        return (<tr key={project._id || project.id}>
          <td><ProjectLinks project={project} /></td>
          <td>
            <Link to={`/projects/${project._id}`}>{project.name}</Link>
            &nbsp;&mdash; <span className="text-muted">{ project.teamworkProject && project.teamworkProject.company && project.teamworkProject.company.name }</span>
          </td>
          <td><UserImage user={project.teamworkProject && project.teamworkProject.owner} /></td>
          <td>{project.estimatedHours || 'not set'}</td>
          <td>{project.actualHours || 'not set' /*project.togglProject && project.togglProject.total*/}</td>
          <td>{Math.round((project.estimatedHours / project.actualHours) * 10000)/100}%</td>
          <td>{project.status}</td>
          <td>
            <Link to={`/projects/${project._id}/edit`} title="Edit"><i className="fa fa-edit"></i></Link>
            <span className="my-3">|</span>
            <Link to={`/projects/${project._id}/refreshTeamwork`} title="Refresh Teamwork"><i className="fa fa-sync"></i></Link>
            <span className="my-3">|</span>
            <Link to={`/projects/${project._id}/destroy`} title="Delete" className="text-danger ml-3"><i className="fa fa-trash"></i></Link>
          </td>
        </tr>
      )})
    )
  }

  return (
    <div className="container">
      <header>
        <h1>All Projects</h1>
      </header>

      <div>
        <table className="table table-stripe">
          <thead>
            <tr role="row">
              <th></th>
              <th>Teamwork Project Name</th>
              <th>Project Manager</th>
              <th>Estimated Hours</th>
              <th>Actual Hours</th>
              <th title="Budget used">% +/-</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Index;