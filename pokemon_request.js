var express = require('express');
var request = require('request');
var fs = require("fs");

var data = [];
var dataforme = [];
var app = express();

var findPkmnById = function(id,battle){
    request.post("https://3ds.pokemon-gl.com/frontendApi/gbu/getSeasonPokemonDetail", {
            headers: {
                "Origin": "http://3ds.pokemon-gl.com",
                "Referer": "http://3ds.pokemon-gl.com/battle/",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "User-Agent": "CuBoid"
            },
            form: {
                "languageId": "2",
                "seasonId": "206",
                "battleType": battle,
                "timezone": "BST",
                "pokemonId": id+'-0',
                "displayNumberWaza": "10",
                "displayNumberTokusei": "3",
                "displayNumberSeikaku": "10",
                "displayNumberItem": "10",
                "displayNumberLevel": "10",
                "displayNumberPokemonIn": "10",
                "displayNumberPokemonDown": "10",
                "displayNumberPokemonDownWaza": "10",
                "timestamp": Date.now().toString()
            }
        }, (err, response, body) => {
            if (err) {
                console.log(err);
            } else {
                var pkmn = JSON.parse(body);
                console.log(id)
                if(pkmn.rankingPokemonInfo.ranking < 300 && pkmn.rankingPokemonInfo.ranking != 0){
                    data.push(pkmn)
                    fs.writeFileSync('data/phraseFreqs.js', JSON.stringify(data));
                }
               // console.log(pkmn.rankingPokemonDown);
            }
    });
}








