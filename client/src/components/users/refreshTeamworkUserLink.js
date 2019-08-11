import React from 'react';
import {Link} from 'react-router-dom';


function RefreshTeamworkUserLink (props){
  let link = null;
  if(props.user && props.user.teamworkId){
    switch (props.show){
      case 'text':
        link = (
          <Link to={`/users/${props.user._id}/refreshTeamwork`}>Refresh Teamwork data</Link>
          )
        break;
      case 'icon':
      default:
        link = (
          <Link to={`/users/${props.user._id}/refreshTeamwork`} title="Refresh Teamwork"><i className="fa fa-sync"></i></Link>
        )
    }
  }

  return link;
}

export default RefreshTeamworkUserLink;