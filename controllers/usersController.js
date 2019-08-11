const User = require( '../models/user');
const Teamwork = require('teamwork-api')();

exports.index = (req, res) => {
  User.find()
    .select('-password')
    .then( users => {
      return res.json(users);
    } )
    .catch( err => res.status(404).send(err) );
};

exports.refreshTeamwork = (req, res) => {
  let users = [];
  let user_id = ( req.params && req.params.id ) || ( req.body && req.body.id );

  if( user_id ){
    User.findOne({
      _id: user_id
    }).exec().then( user => {
      Teamwork.people.get({}, user.teamworkId)
        .then( tw_user => {
          User.updateOne(
            {
              id: user._id
            },
            {
              $set: {
                teamworkUser: tw_user
              }
            },
            {
              runValidators: false
            }
          )
        });
    }).catch( err => {
      console.log( err );
    });
  }

  const refreshedUsers = {
    updated: [],
    failed: [],
    errored: [],
  };

  Teamwork.people.get({})
    .then( data => {

      if( !( data.people && data.people.length ) ){
        res.status(204).json( {'success': 'No Teamwork people found to update'} );
        return null;
      }

      // This makes userCacheUpdates an array of promises
      // These can be checked to know all the refreshes are completed
      let userCacheUpdates = data.people.map( user => {
        console.log( User.findOne({teamworkId: user.id}));
        return User.updateOne(
          {teamworkId: user.id},
          {
            $set: {
              teamworkUser: user
            }
          },
          {
            runValidators: false
          }
        ).then( result => {
          if( result.nModified > 0 )
            refreshedUsers.updated.push(user['first-name'] + " " + user['last-name']);
          else 
            refreshedUsers.failed.push(user['first-name'] + " " + user['last-name']);
        })
        .catch(err => {
          console.error(err);
          refreshedUsers.errored.push(user['first-name'] + " " + user['last-name']);
        });
      });

      // This makes the return async
      Promise.all( userCacheUpdates ).then( x => {
        const ret = {};
        if( refreshedUsers.updated.length )
          ret.success = `There were ${refreshedUsers.updated.length} users refreshed!`;

        if( refreshedUsers.failed.length )
          ret.error = `There were ${refreshedUsers.failed.length} users that failed to refresh!`;

        if( refreshedUsers.errored.length )
          ret.error = `There were ${refreshedUsers.errored.length} users that errored while refreshing!`;

        ret.refreshedUsers = refreshedUsers;
        ret.peole = data.peole;
        res.json( ret );
      });

    })
    .catch( err => res.status(500).send( err ) );
}

exports.show = (req, res) => {  
  User.findOne({
    _id: req.params.id
  })
    .select('-password')
    .then( (user) => res.json(user) )
    .catch( err => res.status(404).send(err) );
};

exports.create = (req, res) => {
  if( !req.isAuthenticated() && !User.findOne())
    return res.status(401).send({'error':'You need to sign in.'});
  
  req.body.user.author = req.session.userId;
  User.create( req.body.user )
    .then( (user) => res.json(user) )
    .catch( err => res.status(400).send(err) );
};

exports.edit = (req, res) => {
  if( !req.isAuthenticated())
    return res.status(401).send({'error':'You need to sign in.'});
  
  User.findOne({
    _id: req.params.id
  })
    .select('-password')
    .then( (user) => res.status(201).send( {'success': 'The user was successfully created'} ) )
    .catch( err => res.status(404).send(err) );
};

exports.update = (req, res) => {
  if( !req.isAuthenticated())
    return res.status(401).send({'error':'You need to sign in.'});
  
  User.updateOne({
    _id: req.body.id
  }, req.body.user, {
    runValidators: true
  } )
    .then( (user) => res.status(201).send( {'success': 'The user was successfully updated.'} ) )
    .catch( err => res.status(400).send(err) );
};

exports.destroy = (req, res) => {
  if( !req.isAuthenticated())
    return res.status(401).send({'error':'You need to sign in.'});
  
  User.deleteOne({
    _id: req.body.id
  })
    .then( (user) => res.status(201).send( {'success': 'The user was successfully destroyed.'} ) )
    .catch( err => res.status(400).send(err) );
};