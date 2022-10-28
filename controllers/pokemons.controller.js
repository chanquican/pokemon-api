const axios = require('axios');
"use strict";
const getPokemon = async(id) => {
    let resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    resp = resp.data;
    let pokemon = {
        id: resp.id,
        name: resp.forms[0].name,
        height: resp.height,
        types: [],
        abilities: [],
        sprites: resp.sprites.front_default,

    }

    resp.abilities.forEach(habilidad => {

        pokemon.abilities.push({
            name: habilidad.ability.name,
            hidden: habilidad.is_hidden
        });
    });

    resp.types.forEach(tipo => {

        pokemon.types.push({
            type: tipo.type.name
        });
    });

    //console.log(pokemon);
    return (pokemon);

}


let getAll = async(request, response) => {
    let datos = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=%5bstart%5d&limit=%5bend`);
    //console.log(datos.data);
    let pokemons = [];
    for (i = 1; i <= 151; i++) {
        pokemons.push(await getPokemon(i));
    }

    // handle success

    //console.log(response);

    response.send(pokemons);
};

module.exports = {
    getAll
};