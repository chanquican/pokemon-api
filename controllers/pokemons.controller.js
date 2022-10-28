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
    let args = request.body;
    //console.log(args);
    let limit = 10;
    let offset = args.page * limit; //100%10 -> 990 / 99
    let start = args.page + 11; //100 -> 991  /11
    console.log(offset);
    console.log(start);
    //let datos = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=20&start=21&limit=10`);
    let datos = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&start=${start}&limit=${limit}`);
    //console.log(datos.data);
    let pokemons = [];
    /*for (i = args.inicio; i <= args.fin; i++) {
        pokemons.push(await getPokemon(i));
    }*/

    // handle success

    //console.log(response);

    response.send(datos.data);
};

module.exports = {
    getAll
};