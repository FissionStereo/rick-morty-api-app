const contenedor = document.getElementById("contenedor");
const inputBuscar = document.getElementById("buscar");
const btnBuscar = document.getElementById("btnBuscar");

const API_URL = "https://rickandmortyapi.com/api/character";

async function obtenerPersonajes(nombre = "") {

  contenedor.innerHTML = `
    <div class="loading">
      Cargando personajes...
    </div>
  `;

  try {

    let url = API_URL;

    if (nombre !== "") {
      url = `${API_URL}/?name=${nombre}`;
    }

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    mostrarPersonajes(datos.results);

  } catch (error) {

    contenedor.innerHTML = `
      <p class="error">
        No se encontraron personajes
      </p>
    `;

  }

}

function mostrarPersonajes(personajes) {

  contenedor.innerHTML = "";

  personajes.forEach(personaje => {

    const card = document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
      <img src="${personaje.image}" alt="${personaje.name}">

      <div class="contenido-card">

        <h2>${personaje.name}</h2>

        <p><strong>Estado:</strong> ${personaje.status}</p>

        <p><strong>Especie:</strong> ${personaje.species}</p>

      </div>
    `;

    contenedor.appendChild(card);

  });

}

btnBuscar.addEventListener("click", () => {

  const nombre = inputBuscar.value.trim();

  obtenerPersonajes(nombre);

});

inputBuscar.addEventListener("keypress", (e) => {

  if (e.key === "Enter") {

    obtenerPersonajes(inputBuscar.value.trim());

  }

});

obtenerPersonajes();