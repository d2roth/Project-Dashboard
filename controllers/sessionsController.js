const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res) => {
  User.findOne({
    email: req.body.email
  })
  .then( user => {
    user.authenticate( req.body.password, (err, isMatch) => {
      if( err ) throw new Error(err);

      if( isMatch ){
        req.session.userId = user.id;
        const token = jwt.sign({ payload: req.body.email }, 'shaunthebulider', { expiresIn: '1h' } );
        res.cookie( 'token', token, {httpOnly: true} ).status(201).send({success: 'You were perfectly authenticated!'});
      } else {
        res.status(401).json(err);
      }
    })
  })
  .catch( err => {
    res.status(401).json(err);
  })
};

exports.logout = (req, res) => {
  if( !req.isAuthenticated() )
    res.status(401).send({ error: 'Could not authenticate!' } );

  req.session.userId = null;
  res.clearCookie('token').status(200).send( { success: 'You are now logged out!' } );
};