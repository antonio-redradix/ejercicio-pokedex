const template = document.querySelector('.pokedex_card')

let cardData = []

// pinta todos los pokemons de cardData
function renderPokemons(){
    cardData.forEach(data => {
        addCard(data)
    })
}

function addCard(data){
    const card = template.cloneNode(true)
    document.querySelector('.pokedex_cards-container').appendChild(card)
    card.classList.remove('none')

    let nameNode = card.querySelector('.pokedex_card-dates-title')
    nameNode.innerHTML = data.name

    let imgNode = card.querySelector('.pokedex_card-img')
    imgNode.src = data.sprites.front_default

    let idNode = card.querySelector('.pokedex_card-img-counter-span')
    idNode.innerHTML = data.id

    let typeNode = card.querySelector('.pokedex_card-pill')
    let typeContainer = card.querySelector('.pokedex_card-pills-container')
    data.types.forEach(type => {
        let clone = typeNode.cloneNode(true)
        clone.innerHTML = type.type.name
        typeContainer.appendChild(clone)
    })
    typeContainer.children[0].remove()

    return card
}

export function main(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
        .then(response => response.json())
        .then(data => {
            for(let pokemon of data.results){
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        cardData.push(pokemonData)
                        if(cardData.length === data.results.length){
                            // ordenarlo antes de renderizar los pokemon
                            
                            renderPokemons()
                        }
                    })
            }
        })

}


