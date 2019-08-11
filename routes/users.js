const router = require( 'express' ).Router();

const UsersController = require('../controllers/usersController');

router.get( `/`, UsersController.index );
router.get( `/:id`, UsersController.show );
router.get( `/:id/edit`, UsersController.edit );
router.post( `/refreshTeamwork`, UsersController.refreshTeamwork );
router.post( `/`, UsersController.create );
router.post( `/update`, UsersController.update );
router.post( `/destroy`, UsersController.destroy );

module.exports = router;