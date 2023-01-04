'use strict';

const contenedor = document.querySelector('#app');
const servidor = 'https://pokeapi.co/api/v2/';

//Agregamos al boton
let btnHome = document.querySelector('button');

btnHome.addEventListener('click', () => {
    //Salimos de la carpeta views y vamos a index.html
    window.location.href = '../index.html';

})

const nombre = localStorage.getItem('pokeNombre');
console.log(nombre, 'nombre');
//Creamos la url con la que haremos el fetch
const pokeUrl = servidor + 'pokemon/' + nombre;
console.log(pokeUrl, 'pokeUrl');

//Hacemos el fetch
fetch(pokeUrl)
.then( resp => { return resp.json() })
.then (respuestaJSON => {
    console.log(respuestaJSON, 'respuestaJSON');
    let datos = respuestaJSON;
    console.log(datos, 'datos');
    //llamamos la funcion infoPokemonDetalle y le pasamos los datos del pokemon
    pokeInfoDetalle(datos);
})

function pokeInfoDetalle(datos) {

    let html = '';
    html += `<div class="infoPokemon">
                <figure>
                <img src="${datos.sprites.other.dream_world.front_default}" alt="Pokemon ${datos.name}"></img>
                </figure>
                <div class="infoPokemonText">
                <h2>${datos.name.charAt(0).toUpperCase() + datos.name.slice(1)}</h2>
                <div class="pokeUl">
                <ul>
                <li><strong>Altura</strong> : ${datos.height} pies.</li>
                <li><strong>Peso</strong> : ${datos.weight} kg.</li>
                <li><strong>Tipo</strong> : ${datos.types[0].type.name}.</li>
                <li><strong>Habilidades</strong> : ${datos.abilities[0].ability.name}.</li>
                <li><strong>Stats</strong> : ${datos.stats[0].base_stat}.</li>
                <li><strong>Movimientos</strong> : ${datos.moves[0].move.name}.</li>
                </ul>
                </div>
                </div>
                </div>`; 
                contenedor.innerHTML = html;          
};