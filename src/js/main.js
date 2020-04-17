// Punto de entrada de SCSS

import '../scss/main.scss';

// Declaración de las variables necesarias

let pokedex = document.createElement('section');

let mainContainer = document.querySelector('.main-container');

mainContainer.appendChild(pokedex);

pokedex.classList.add('pokedex');

let card = document.querySelector('.card');

let tagContainer = card.querySelector('.card__types');

let tag = card.querySelector('.card__tag');

// Función que pinta la card del Pokemon

const paintPokemon = () => {
    let clone = card.cloneNode(true);
    pokedex.appendChild(clone);
    clone.classList.remove('card--hidden');
}

// Conectamos con la API y mostramos los datos

const connectApi = () => {
    let url = `https://pokeapi.co/api/v2/pokemon/bulbasaur`;

    fetch(url)
    .then(response => {
        response.json()
        .then(data => {
            
            card.querySelector('#cardAsset').setAttribute('src', data.sprites.front_default);
            card.querySelector('#cardId').innerHTML = data.id;
            card.querySelector('#cardName').innerHTML = data.name;

            data.types.forEach(type =>{
                let clone = tag.cloneNode(true);
                clone.innerHTML = type.type.name;
                tagContainer.appendChild(clone);
                clone.classList.remove('card__tag--hidden');
            });

            paintPokemon();
        })
    })

}

connectApi();