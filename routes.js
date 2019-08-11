const express = require( 'express' );
const app = express();

// Importing the routes
const projectsRoutes = require( './routes/projects' );
const usersRoutes = require( './routes/users' );
const sessionsRoutes = require( './routes/sessions' );

// Register our routes with our app
app.use( '/projects', projectsRoutes );
app.use( '/users', usersRoutes );
app.use( '/', sessionsRoutes );

module.exports = app;