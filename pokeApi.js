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
    return fetch(url)
        .then((res) => res.json())
}

myFetch('https://pokeapi.co/api/v2/generation/1/')
    .then(function (data) {
        let type = data.pokemon_species;
        //console.log(data);
        for (let i = 0; i < type.length; i++) {
            let eSection = $('<section>');
            let mySlice = (type[i].url).slice(42, -1);

            function imgId(idNum) {
                if (+idNum < 10) {
                    return "00" + idNum;
                } else if (+idNum < 100) {
                    return "0" + idNum;
                } else {
                    return idNum;
                }
            }
            let pokeID = imgId(mySlice);

            eSection.addClass("pokemonClass shading")
            eSection.attr('data-id', type[i].name);
            eSection.attr('data-url', type[i].url);

            //2nd Fetch
            myFetch(type[i].url)
                .then(function (newData2) {
                    let myString = ` est une évolution de <span data-parent-url="${type[i].url}">${type[i].name}</span> `
                    eSection.html(
                        `<h2 class="cap-first" >${type[i].name}</h2> 
                        <img class="my-img" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeID}.png"
                        alt = "${type[i].name}">
                        <p>${newData2.evolves_from_species? 
                            newData2.evolves_from_species.name + myString: "Orginal Pokemon"}</p>
                        <p>${"Nom Français: " + newData2.names[4].name}</p>
                        <p class="close-btn"><strong>Plus d'informations</strong></a>
                        `);
                    $('#pokemon').append(eSection);

                    /**
                     * click function popout model
                     */
                    $(eSection).click(function (e) {
                        e.stopPropagation();
                        let eTar = e.target;
                        let myModel = $('#myModel');
                        myModel.removeClass("d-none").addClass("d-full");
                        $(myModel).html(`
                        <div class="popout shading"> 
                            <h2 class="cap-first" >${type[i].name}</h2> 
                            <img class="my-img" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeID}.png"
                            alt = "${type[i].name}">
                            <p>${newData2.evolves_from_species? 
                                newData2.evolves_from_species.name + myString: "Orginal Pokemon"}</p>
                            <p>${"Nom Français: " + newData2.names[4].name}</p>
                            <p><strong>Fun Fact: </strong>${newData2.flavor_text_entries[0].flavor_text}</p>
                            <div class="close-btn"><strong>X</strong></div>
                        </div>
                        `);
                        $('.close-btn').click(function () {

                            myModel.removeClass("d-full").addClass("d-none");
                        })

                    })

                })
            //end of 2nd fetch

        }
    })