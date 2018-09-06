const router = require("express").Router();
const loomRoutes = require("./looms");

// Loom routes
router.use("/", loomRoutes);

module.exports = router;
