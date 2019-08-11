import React, {useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
import NotificationContext from '../notification_context';

function RefreshTeamwork(props){
  const { setNotification } = useContext( NotificationContext );

  useEffect(() => {
    Axios.post('/api/users/refreshTeamwork', {
      id: props.match.params.id
    }).then(() => {
      setNotification( notification => {
        return {
          ...notification,
          status: 'success',
          message: 'Teamwork data has been refreshed.'
        }
      });
    })
    .catch(err => {
      console.log(err);
      setNotification( notification => {
        return {
          ...notification,
          status: 'danger',
          message: 'Teamwork data could not be refreshed.'
        }
      });
    });
  }, [props]);

  if( props.match && props.match.params && props.match.params.id )
    return <Redirect to={`/users/${props.match.params.id}`} />

  return <Redirect to="/users" />
}

export default RefreshTeamwork;