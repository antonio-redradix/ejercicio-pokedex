import '../scss/main.scss';

const template = document.querySelector('.card')

let cardData = []

// pinta todos los pokemons de cardData

function renderPokemons(){
    cardData.forEach(data => {
        addCard(data)
    })
}

function addCard(data){
    const card = template.cloneNode(true)
    document.querySelector('.main-container').appendChild(card)
    card.classList.remove('card--hidden')

    let nameNode = card.querySelector('.card__name')
    nameNode.innerHTML = data.name

    let imgNode = card.querySelector('.card__asset')
    imgNode.src = data.sprites.front_default

    let idNode = card.querySelector('.card__id')
    idNode.innerHTML = data.id

    let typeContainer = card.querySelector('.card__types')
    let typeNode = card.querySelector('.card__tag')
    
    data.types.forEach(type => {
        let clone = typeNode.cloneNode(true)
        clone.innerHTML = type.type.name
        typeContainer.appendChild(clone)
        clone.classList.remove('card__tag--hidden');
    })

    return card
}


fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
.then(response => response.json())
    .then(data => {
    for(let pokemon of data.results){
        fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
                cardData.push(pokemonData)
                if(cardData.length === data.results.length){
                    // Ordenamos por id los pokemon antes de mostrarlos
                    for(let i of cardData) {
                        const order = (a,b) => {
                            if(a.id > b.id) {
                                return 1
                            }
                            else {
                                return -1
                            }
                        }
                        
                        cardData.sort(order);
                    }

                    renderPokemons();
                }
            })
    }
})

// Filtrado de pokemons
let searchInput = document.querySelector('#search');

const searchPokemon = () => {
    let searchInputValue = searchInput.value
    console.log(searchInputValue);
}

searchInput.onkeyup = searchPokemon;