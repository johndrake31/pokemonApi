"use strict";

/** 
 *@param PokiminApi fetch homework 
 */
//  `<section data-id="{id}" data-url="{url}">
//     <h2>{name}</h2>
//     {name} est une évolution de <span data-parent-url="{parentUrl}">{parent}</span>
//     <a href="" class="more">Plus d'informations</a>
// </section>`
//slice(42, -1)
function myFetch(url) {
  return fetch(url).then(function (res) {
    return res.json();
  });
}

myFetch('https://pokeapi.co/api/v2/generation/1/').then(function (data) {
  var type = data.pokemon_species; //console.log(data);

  var _loop = function _loop(i) {
    var eSection = $('<section>');
    var mySlice = type[i].url.slice(42, -1);

    function imgId(idNum) {
      if (+idNum < 10) {
        return "00" + idNum;
      } else if (+idNum < 100) {
        return "0" + idNum;
      } else {
        return idNum;
      }
    }

    var pokeID = imgId(mySlice);
    eSection.addClass("pokemonClass shading");
    eSection.attr('data-id', type[i].name);
    eSection.attr('data-url', type[i].url); //2nd Fetch

    myFetch(type[i].url).then(function (newData2) {
      var myString = " se transforme en <span data-parent-url=\"".concat(type[i].url, "\">").concat(type[i].name, "</span> ");
      eSection.html("<h2 class=\"cap-first\" >".concat(pokeID, ": ").concat(type[i].name, "</h2> \n                        <img class=\"my-img\" src=\"https://assets.pokemon.com/assets/cms2/img/pokedex/full/").concat(pokeID, ".png\"\n                        alt = \"").concat(type[i].name, "\">\n                        <p>").concat(newData2.evolves_from_species ? newData2.evolves_from_species.name + myString : "Orginal Pokemon", "</p>\n                        <p>").concat("Nom Français: " + newData2.names[4].name, "</p>\n                        <p class=\"close-btn\"><strong>Plus d'informations</strong></a>\n                        "));
      $('#pokemon').append(eSection);
      /**
       * click function popout model
       */

      $(eSection).click(function (e) {
        e.stopPropagation();
        var eTar = e.target;
        var myModel = $('#myModel');
        myModel.removeClass("d-none").addClass("d-full");
        $(myModel).html("\n                        <div class=\"popout shading\"> \n                            <h2 class=\"cap-first\" >".concat(type[i].name, "</h2> \n                            <img class=\"my-img\" src=\"https://assets.pokemon.com/assets/cms2/img/pokedex/full/").concat(pokeID, ".png\"\n                            alt = \"").concat(type[i].name, "\">\n                            <p>").concat(newData2.evolves_from_species ? newData2.evolves_from_species.name + myString : "Orginal Pokemon", "</p>\n                            <p>").concat("Nom Français: " + newData2.names[4].name, "</p>\n                            <p><strong>Fun Fact: </strong>").concat(newData2.flavor_text_entries[0].flavor_text, "</p>\n                            <div class=\"close-btn\"><strong>X</strong></div>\n                        </div>\n                        "));
        $('.close-btn').click(function () {
          myModel.removeClass("d-full").addClass("d-none");
        });
      });
    }); //end of 2nd fetch section
  };

  for (var i = 0; i < type.length; i++) {
    _loop(i);
  }
});