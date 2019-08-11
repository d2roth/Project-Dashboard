const router = require( 'express' ).Router();

const ProjectsController = require( '../controllers/projectsController' );

// Begin routes

router.get( `/`, ProjectsController.index );
router.get( `/:id`, ProjectsController.show );
router.get( `/:id/edit`, ProjectsController.edit );
router.post( `/`, ProjectsController.create );
router.post( `/refreshTeamwork`, ProjectsController.refreshTeamwork );
router.post( `/:id/refreshTeamwork`, ProjectsController.refreshTeamwork );
router.post( `/update`, ProjectsController.update );
router.post( `/destroy`, ProjectsController.destroy );

// End routes

module.exports = router;