"use strict";

var express = require("express");
var cors = require('cors');
var app = express();
var config = require("./config.json");
var info = require("./package.json");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(`/pokemons/`, require("./routes/pokemons.router"));

app.listen(config.port, (error) => {
    if (!error)
        console.log(`Server is Successfully Running, and App ${info.name} is listening on port ${config.port}`)
    else
        console.log("Error occurred, server can't start", error);
});