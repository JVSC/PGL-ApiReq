var express = require('express');
var request = require('request');
var fs = require("fs");
var data =[];

var taoTherian = {
    'Tornadus-Therian' : '641-1',
    'Thundurus-Therian' : '642-1',
    'Landorus-Therian' : '645-1',
}
var rotom = {
    'Rotom-H' : '479-1',
    'Rotom-W' : '479-2',
    'Rotom-Frost' : '479-3',
    'Rotom-Fan' : '479-4',
    'Rotom-M' : '479-5',
}
var alolaPokemon = {
    'Ninetales-Alola':'38-1',
    'Muk-Alola':'89-1',
    'Raichu-Alola':"26-1",
    "Sandslash-Alola":"28-1",
    'Dugtrio-Alola':'51-1',
    'Persian-Alola':'53-1',
    'Golem-Alola':'76-1',
    'Exeggutor-Alola':'103-1',
    "Marowak-Alola":'105-1',
}
var lycanrock = ['745-1']
var Mimikyu = ['778-1']
var Meowstic = ['678-1']
var Megas = ['6-1','6-2','3-1','9-1','15-1','18-1','80-1','208-1','254-1','260-1','302-1','323-1','334-1','362-1','373-1','376-1','380-1','381-1','428-1','475-1','531-1','65-1','94-1','115-1','127-1','130-1','142-1','181-1','212-1','214-1','229-1','248-1','257-1','282-1','303-1','306-1','308-1','310-1','354-1','359-1','445-1','448-1','460-1']

var forms = ['448-1','460-1','229-1','248-1','257-1','282-1','303-1','306-1','308-1','310-1','354-1','359-1','445-1','475-1','531-1','65-1','94-1','115-1','127-1','130-1','142-1','181-1','212-1','214-1','260-1','302-1','323-1','334-1','362-1','373-1','376-1','380-1','381-1','428-1','6-1','6-2','3-1','9-1','15-1','18-1','80-1','208-1','254-1','678-1','778-1','745-1','641-1','642-1','645-1','479-1','479-2','479-3','479-4','479-5','38-1','89-1','26-1','28-1','51-1','53-1','76-1','103-1','105-1'];

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
                "pokemonId": id,
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
                    fs.writeFileSync('data/formes-data.js', JSON.stringify(data));
                }
               // console.log(pkmn.rankingPokemonDown);
            }
    });
}

for(var i = 0; i<forms.length; i++){
    findPkmnById(forms[i],1);
}