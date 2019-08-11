import React from 'react';

function UserImage( props ) {
  let user = props.user;

  if( !user )
    return null;

  if( user.teamworkUser )
    user = user.teamworkUser;
  
  return (
      <img
        src={user.avatarUrl || user['avatar-url']}
        alt={`${user.firstName || user['first-name']} ${user.lastName || user['last-name']}'s avatar`}
        style={{
          width: '30px',
          borderRadius: '50%'
        }}/>
  );
}

export default UserImage;