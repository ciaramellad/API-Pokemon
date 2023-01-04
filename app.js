'use strict';

const btn = document.querySelector('.pokeMostrar');
const contenedor = document.querySelector('#app');
const servidor = 'https://pokeapi.co/api/v2/';


btn.addEventListener('click', () => {
    console.log('click');
    let listaPokemon = servidor + 'pokemon?limit=102&offset=0';
    fetch(listaPokemon)
    .then( resp => {
        return resp.json() 
    })
    .then (respuestaJSON => {
        let datos = respuestaJSON.results;
        //Guardo los personajes en un array
        let nombrePokemon = [];
        for (let i = 0; i < datos.length; i++) {
            nombrePokemon.push(datos[i].name);
        }
        infoPokemon(nombrePokemon);
    })
    
})
    
    
//Funcion para obtener Info de cada pokemon
function infoPokemon(nombrePokemon) {
    for (let i = 0; i < nombrePokemon.length; i++) {
        let pokeUrl = servidor + 'pokemon/' + nombrePokemon[i];
        //traer la info .
        fetch(pokeUrl)
        .then( resp => {
            return resp.json()})
        .then (respuestaJSON => {
            console.log(respuestaJSON, 'respuestaJSON 2');
            let datos = respuestaJSON;
            console.log(datos, 'datos');
            //Renderizar datos
            pokeRender(datos);
        })
    }}
    
//Funcion para mostrar la info en el HTML
function pokeRender(datos) {
    let html = '';
    console.log(datos, 'datos 2');
    html += `<article class="pokeArticle" id="pokeArt">
                <div class="pokeCard">
                    <div class="datos">
                    <h3 class="TituloRamdom">${datos.name.charAt(0).toUpperCase() + datos.name.slice(1)}</h3>
                    <figure>
                    <img src="${datos.sprites.other.dream_world.front_default}" alt="${datos.name}">
                    </figure>
                    <a href="views/detalle.html" id="${datos.name} " class="pokeA">Ver detalles</a>
                    </div>
                </div>
            </article>`;
    contenedor.innerHTML += html;
    const pokeA = document.querySelectorAll('a');
    console.log(pokeA, 'a');

    for (let i = 0; i < pokeA.length; i++) {
        pokeA[i].addEventListener('click', (e) => {
            e.preventDefault();
            let pokeNombre = e.target.id;
            console.log(pokeNombre, 'pokeNombre');
            localStorage.setItem('pokeNombre', pokeNombre);
            window.location.href = 'views/detalle.html';
            guardarHistorial(pokeNombre);
        })
    }
}

