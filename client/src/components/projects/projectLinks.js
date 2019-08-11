import React from 'react';
import './projects.css';

function ProjectLinks ( props ) {
  const project = props.project;
  const workspace_id = '2365488';
  const teamwork_subdomain = 'testingapi1';
  let toggl_icon;
  let teamwork_icon;

  if( project.togglId && workspace_id ){
    let toggl_url = `https://toggl.com/app/reports/summary/${workspace_id}/period/thisWeek/projects/${project.togglId}`;
    toggl_icon = <a href={toggl_url} rel="noopener noreferrer" target="_blank"><img src="/images/toggl-icon.png" alt="Toggl Icon" /></a>;
  }

  if( project.teamworkId && teamwork_subdomain){
    let teamwork_url = `https://${teamwork_subdomain}.teamwork.com/projects/${project.teamworkId}`;
    teamwork_icon = <a href={teamwork_url} rel="noopener noreferrer" target="_blank"><img src="/images/teamwork-icon.png" alt="Teamwork Icon" /></a>;
  }

  return (
    <div className="projectLinks">
      {toggl_icon}
      {teamwork_icon}
    </div>
  );
}

export default ProjectLinks;