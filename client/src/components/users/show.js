import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import UserImage from './userImage';
import RefreshTeamworkUserLink from './refreshTeamworkUserLink';

function Show(props){

  const [user, setUser] = useState([]);

  useEffect( () => {
    Axios.get( `/api/users/${props.match.params.id}`)
    .then( result => setUser( result.data ) )
    .catch( err => console.error( err ) );
  }, [props] );

  return (
    <div className="container">
      <header>
        <h1>Viewing {user.firstName} {user.lastName}</h1>
      </header>

      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">
              <h2>Details</h2>
            </div>
            <div className="card-body">
              <strong>First Name</strong> {user.firstName} <br/>
              <strong>Last Name</strong> {user.lastName} <br/>
              <strong>Pay Rate</strong> {user.payRate} <br/>
            </div>
            <div className="card-footer">
              <Link to={`/users/${user._id}/edit`}>Edit</Link>
              <span className="mx-2">|</span>
              <Link to={`/users/${user._id}/destroy`}>Destroy</Link>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card">
            {console.log(user.teamworkUser)}
            <div className="card-header">
              <h2>Teamwork Information</h2>
            </div>
            <div className="card-body">
              <UserImage user={user} />
            </div>
            <div className="card-footer">
              <RefreshTeamworkUserLink user={user} show="text"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show;