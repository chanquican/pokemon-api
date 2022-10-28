const axios = require('axios');
"use strict";
const getPokemon = async(id) => {
    let resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    resp = resp.data;
    let pokemon = {
        id: resp.id,
        name: resp.forms[0].name,
        height: resp.height,
        weight: resp.weight,
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
    //let args = request.body;
    console.log(request.query.page);
    let page = request.query.page - 1;
    let limit = 10;
    let offset = limit * page; //100%10 -> 990 / 99
    //console.log(offset);
    //console.log(start);
    //let datos = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=20&start=21&limit=10`);
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    //console.log(url);
    let datos = await axios.get(url);
    // [ {name:pokemon, url:url }, {}, {}]
    //console.log(datos.data);
    let pokemons = [];
    //recorremos solo pokemons encontrados en url = 10
    for (i = 0; i < datos.data.results.length; i++) {
        try {
            //recuperar id pokemon desde string url
            let pokemonId = datos.data.results[i].url.split('/');
            //console.log(pokemonId[6]);
            pokemons.push(await getPokemon(pokemonId[6]));
        } catch (error) {
            console.log(error.message);
            console.log(`pokemon id ${i} not found`);
        }
    }

    // handle success

    //console.log(response);

    response.send(pokemons);
};

module.exports = {
    getAll
};