const express = require('express');
const routes = express.Router();
const UserController = require('../Controllers/usersController');

/* Users End Points 
============================================================================*/ 

/* GET all users and POST a specific user
------------------------------------------------------------------------------- */
routes.route('/api/v1/users')
	.get(UserController.getAllUsers )
	.post(UserController.postAUser);
routes.route('/api/v1/users/:id') 
	.get(UserController.getASpecificUser)
// updates the the exisitng list of user
	.put(UserController.updateAUser)
// deletes or removes any specified user
	.delete(UserController.deleteAUser);
/* End of Users up End points 
-----------------------------------------------------------------------------*/
module.exports = routes;