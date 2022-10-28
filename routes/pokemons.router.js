"use strict";

var express = require("express");

var controller = require("../controllers/pokemons.controller");

var router = express.Router();

router.get("/getAll", controller.getAll);

module.exports = router;