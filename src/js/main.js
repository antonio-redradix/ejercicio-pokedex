const template = document.querySelector('.card')

function addCard(id, name, types, urlImage){
    /*CONTROL GET DATA
    console.log('ID ',id)
    console.log('NAME ',id)
    console.log('TYPES ',types)
    console.log('IMAGE ',urlImage)
    */


    let clone = template.cloneNode(true)
    //id
    let codeCard = clone.querySelector('.code')
    codeCard.innerHTML = "ID/"+id
    //name
    let nameCard = clone.querySelector('.name-pokemon')
    nameCard.innerHTML = name
    //type
    let typeCard = clone.querySelector('.type')
    
    if(types.includes(',')){
        let typesPokemon = types.split(',')
        for (const key of typesPokemon) {
            let node = document.createElement('span');
            let nodeWithContent = node.innerHTML = key.toUpperCase()
            typeCard.appendChild(node)
        }
    }else{
        let node = document.createElement('span');
        let nodeWithContent = node.innerHTML = types.toUpperCase()
        typeCard.appendChild(node)
    }
    //image
    let imageCard = clone.querySelector('img')
    imageCard.setAttribute('src',urlImage)
    //show card clone
    clone.classList.remove('hidden')

    let containerCards = document.querySelector('#cards')
    containerCards.appendChild(clone)
    return clone
}

export function main(){
    // code goes here
    /*
    let card = addCard()
    addCard()
    addCard()
    */
    let limit = 10

    let urlList = 'https://pokeapi.co/api/v2/pokemon?limit='+limit
    let urlBase = 'https://pokeapi.co/api/v2/pokemon/'

    fetch(urlList)
    .then(response => {
        response.json()
        .then(data => {
            let listPokemons = data.results
            for(let i = 0; i < listPokemons.length; i++){

                urlBase = 'https://pokeapi.co/api/v2/pokemon/'+listPokemons[i].name+'/'

                fetch(urlBase)
                    .then(response => {
                        response.json()
                        .then(dataPokemon => {

                            console.log(dataPokemon)
                            let namePokemon = dataPokemon.name
                            let imagePokemon = dataPokemon.sprites.front_default
                            let idPokemon = dataPokemon.id
                            let typePokemon = dataPokemon.types //.type['name'] //array

                            let listTypeAux = []

                            if(typePokemon.length > 1){
                                for (const key of typePokemon) {
                                    listTypeAux.push(key.type['name'])
                                }
                            }else{
                                listTypeAux.push(typePokemon[0].type['name'])
                            }

                            let classPokemon = listTypeAux.join(',')
                            console.log(classPokemon)

                            addCard(idPokemon,namePokemon, classPokemon, imagePokemon)

                        })
                    })
            }
        })
    })
}