const router = require("express").Router();
const loomsController = require("../../controllers/loomsController");

// Get route for "/api/"
router
.route("/")
  .post(loomsController.create)
  .get(loomsController.findAll);

// Get route for "/newgame"
router
  .route("/newgame")
  .get(loomsController.findById)
  .post(loomsController.create);

// Get route that matches with "/api/v1/:uniqueid"
router
  .route("/v1/game/:uniqueid")
  .get(loomsController.findById);

  // Get route for final mural that matches with "/api/v1/mural"
router
  .route("/v1/game/mural/:uniqueid")
  .get(loomsController.findById);
  
  // Post route that matches with "/api/v1"
router
.route("/v1/")
.post(loomsController.create);

// Put route that matches with "/api/v1/:uniqueid"
router
  .route("/v1/gameupdate/:uniqueid")
  .put(loomsController.update);

router
.route("/v1/openlooms")
.get(loomsController.findOpenLooms);

//Get route for all completed looms
router
.route("/v1/looms/")
.get(loomsController.findCompletedLooms);

//Get route for all completed game using an array of id's to search
router
.route("/v1/complete/")
.post(loomsController.getAllCompletedGames);

//Get route for all completed looms by specific user
router
.route("/v1/looms/:uniqueid")
.get(loomsController.findCompletedLoomsByUser);

//Get route for all open looms by user
router
.route("/v1/openlooms/:uniqueid")
.get(loomsController.findUserLooms);


module.exports = router;