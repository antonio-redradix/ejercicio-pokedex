const template = document.querySelector('.card')

function addCard(data){
    const card = template.cloneNode(true)
    document.querySelector('.container').appendChild(card)
    card.classList.remove('hidden')

    // rellenar
    let nameNode = card.querySelector('.name-pokemon')
    nameNode.innerHTML = data.name

    let imgNode = card.querySelector('.card-img')
    imgNode.src = data.sprites.front_default

    console.log('id', data.id)
    let idNode = card.querySelector('.card-id')
    idNode.innerHTML = data.id

    let typeNode = card.querySelector('.type-pokemon')
    let typeContainer = card.querySelector('.types-pokemon')
    data.types.forEach(type => {
        let clone = typeNode.cloneNode(true)
        clone.innerHTML = type.type.name
        typeContainer.appendChild(clone)
    })
    typeContainer.children[0].remove()

    return card
}

export function main(){
    fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur/')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            addCard(data)
        })
}
