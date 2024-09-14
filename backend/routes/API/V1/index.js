
const express = require("express");
const router = express.Router();
const { resolveRefs } = require('json-refs');


const USER_ROUTER = require("./user");
const ROOM_ROUTER = require('./room')
router.use("/user", USER_ROUTER);
router.use("/room", ROOM_ROUTER);
module.exports = router;