import React, {useEffect, useContext} from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import NotificationContext from '../notification_context';

function Logout() {
  const { setNotification } = useContext( NotificationContext );

  useEffect(() => {
    Axios.post( '/api/logout' )
    .then( () => {
      setNotification( notification => {
        return {
          ...notification,
          status: 'success',
          message: 'Bye, See ya soon!'
        }
      });
    })
    .catch( err => {
      setNotification( notification => {
        return {
          ...notification,
          status: 'danger',
          message: 'You were gone before we could say good bye... You will be missed.'
        }
      });
    });  
  }, []);

  return <Redirect to="/" />;
}

export default Logout;