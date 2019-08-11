const Project = require( '../models/project' );
const Teamwork = require('teamwork-api')();

exports.index = (req, res) => {
  Project.find()
    .then( projects => {
      return res.json(projects);
    } )
    .catch( err => res.status(404).send(err) );
};

exports.refreshTeamwork = (req, res) => {
  let projects = [];
  let project_id = ( req.params && req.params.id ) || ( req.body && req.body.id );

  if( project_id ){
    Project.findOne({
      _id: project_id
    }).exec().then( project => {
      Teamwork.projects.get({
        'includeProjectOwner': true,
        'includePeople': true
      }, project.teamworkId)
        .then( tw_project => {
          Project.updateOne(
            {
              id: project._id
            },
            {
              $set: {
                teamworkProject: tw_project
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

  const refreshedProjects = {
    updated: [],
    failed: [],
    errored: [],
  };

  Teamwork.projects.get({'status': 'ALL',
    'includeProjectOwner': true,
    'includePeople': true
})
    .then( data => {

      if( !( data.projects && data.projects.length ) ){
        res.status(204).json( {'success': 'No Teamwork projects found to update'} );
        return null;
      }

      // This makes projectCacheUpdates an array of promises
      // These can be checked to know all the refreshes are completed
      let projectCacheUpdates = data.projects.map( project => {
        return Project.updateOne(
          {teamworkId: project.id},
          {
            $set: {
              teamworkProject: project
            }
          },
          {
            runValidators: false
          }
        ).then( result => {
          if( result.nModified > 0 )
            refreshedProjects.updated.push(project.name);
          else 
            refreshedProjects.failed.push(project.name);
        })
        .catch(err => {
          console.error(err);
          refreshedProjects.errored.push(project.name);
        });
      });

      // This makes the return async
      Promise.all( projectCacheUpdates ).then( x => {
        const ret = {};
        if( refreshedProjects.updated.length )
          ret.success = `There were ${refreshedProjects.updated.length} projects refreshed!`;

        if( refreshedProjects.failed.length )
          ret.error = `There were ${refreshedProjects.failed.length} projects that failed to refresh!`;

        if( refreshedProjects.errored.length )
          ret.error = `There were ${refreshedProjects.errored.length} projects that errored while refreshing!`;

        ret.refreshedProjects = refreshedProjects;
        ret.people = data.people;
        res.json( ret );
      });

    })
    .catch( err => res.status(500).send( err ) );
}


exports.show = (req, res) => {  
  Project.findOne({
    _id: req.params.id
  })
    .then( (project) => res.json(project) )
    .catch( err => res.status(404).send(err) );
};

exports.create = (req, res) => {
  if( !req.isAuthenticated())
    return res.status(401).send({'error':'You need to sign in.'});
  
  req.body.project.author = req.session.projectId;
  // This is our form post object. The POST data is an object and has our desired keys.
  Project.create( req.body.project )
    .then( (project) => res.json(project) )
    .catch( err => res.status(400).send(err) );
};

exports.edit = (req, res) => {
  if( !req.isAuthenticated())
    return res.status(401).send({'error':'You need to sign in.'});
  
  Project.findOne({
    _id: req.params.id,
    author: req.session.projectId
  })
    .then( (project) => res.status(201).send( {'success': 'The project was successfully created'} ) )
    .catch( err => res.status(404).send(err) );
};

exports.update = (req, res) => {
  if( !req.isAuthenticated())
    return res.status(401).send({'error':'You need to sign in.'});
  
  Project.updateOne({
    _id: req.body.id,
    author: req.session.projectId
  }, req.body.project, {
    runValidators: true
  } )
    .then( (project) => res.status(201).send( {'success': 'The project was successfully updated.'} ) )
    .catch( err => res.status(400).send(err) );
};

exports.destroy = (req, res) => {
  if( !req.isAuthenticated())
    return res.status(401).send({'error':'You need to sign in.'});
  
  Project.deleteOne({
    _id: req.body.id,
    author: req.session.projectId
  })
    .then( (project) => res.status(201).send( {'success': 'The project was successfully destroyed.'} ) )
    .catch( err => res.status(400).send(err) );
};