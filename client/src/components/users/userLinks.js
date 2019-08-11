import React from 'react';

function UserLinks ( props ) {
  const user = props.user;
  const workspace_id = '2365488';
  const teamwork_subdomain = 'testingapi1';
  let toggl_icon;
  let teamwork_icon;

  if( user.togglId && workspace_id ){
    let toggl_url = `https://toggl.com/app/reports/summary/${workspace_id}/period/thisWeek/users/${user.togglId}`;
    toggl_icon = <a href={toggl_url} rel="noopener noreferrer" target="_blank"><img src="/images/toggl-icon.png" alt="Toggl Icon" style={{width: '25px'}} /></a>;
  }

  if( user.teamworkId && teamwork_subdomain){
    let teamwork_url = `https://${teamwork_subdomain}.teamwork.com/users/${user.teamworkId}`;
    teamwork_icon = <a href={teamwork_url} rel="noopener noreferrer" target="_blank"><img src="/images/teamwork-icon.png" alt="Teamwork Icon" style={{width: '25px'}} /></a>;
  }

  return (
    <div className="userLinks">
      {toggl_icon}
      {teamwork_icon}
    </div>
  );
}

export default UserLinks;