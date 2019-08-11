import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {Link } from 'react-router-dom';
import UserLinks from './userLinks';
import RefreshTeamworkUserLink from './refreshTeamworkUserLink';

function Index () {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get( '/api/users')
    .then( result => setUsers(result.data))
    .catch(err => {console.error(err);})
  }, []);

  return (
    <div className="container">
      <header>
        <h1>All Users</h1>
      </header>

      <div>
        <table className="table table-stripe">
          <thead>
            <tr role="row">
              <th></th>
              <th>Name</th>
              <th>Pay Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              return (<tr key={user._id || user.id}>
                <td><UserLinks user={user} /></td>
                <td>
                  <Link to={`/users/${user._id}`}>{user.firstName} {user.lastName}</Link>
                </td>
                <td>
                  ${user.payRate}
                </td>
                <td>
                  <Link to={`/users/${user._id}/edit`} title="Edit" ><i className="fa fa-edit"></i></Link>
                  <RefreshTeamworkUserLink user={user} />
                  <Link to={`/users/${user._id}/destroy`} title="Delete" className="text-danger ml-3"><i className="fa fa-trash"></i></Link>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Index;