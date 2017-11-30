// Dependencies
const express   = require("express");
const router    = new express.Router();

router.use("/txt-png", require("./apps/txt-png"));
router.use("/connect4", require("./apps/connect4"));
router.use("/m151web", require("./apps/m151web"));

module.exports = router;
