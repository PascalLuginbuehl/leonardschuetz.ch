const express = require("express");
const router  = new express.Router();

const api_router = require("./api_router.js")

router.use("/api", api_router)

module.exports = router;
