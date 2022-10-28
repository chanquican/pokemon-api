"use strict";

let getAll = async(request, response) => {
    response.status(200).send("All pokemons");
};

module.exports = {
    getAll
};