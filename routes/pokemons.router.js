"use strict";

var express = require("express");

var controller = require("../controllers/pokemons.controller");

var router = express.Router();

router.post("/getAll", controller.getAll);

module.exports = router;