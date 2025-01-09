# Pokémon App
## Descripción
Esta aplicación utiliza la PokéAPI para mostrar una lista de Pokémons, gestionar favoritos y ver información detallada de cada Pokémons. El objetivo principal fue implementar una solución limpia, eficiente y escalable mas allá de que el proyecto en si es pequeño.

## Tecnologías Utilizadas
- Vite con Vue 3: Elegí Vite por su rapidez y simplicidad en el desarrollo frente a Vue CLI, lo que mejora la experiencia durante el desarrollo y la carga inicial del proyecto.
- TailwindCSS: Para estilos rápidos y consistentes, asegurando una interfaz visual atractiva y responsiva.
- Axios: Para realizar las peticiones a la PokéAPI.
- Pinia: Para el manejo del estado global, asegurando un flujo de datos claro y predecible.
- JavaScript: Para la lógica de la aplicación.

## Estructura del Proyecto
El proyecto está organizado en componentes reutilizables y modulares para facilitar el mantenimiento y la escalabilidad los cuales son:
### components/layout:
- HomePage.vue: Pantalla inicial con una bienvenida y un botón para navegar a la lista de Pokémon.
- PokemonList.vue: Es la pantalla principal que muestra la lista de Pokémons o favoritos, dependiendo del estado global showFavorites. Este componente, al montarse, invoca la función fetchPokemons() del store únicamente si la lista global pokemonList está vacía.
Decidí cargar toda la lista de Pokémon al inicio para evitar múltiples llamadas a la API mientras el usuario navega. Luego, a través del getter pokemonsToDisplay, se muestra un subconjunto de 20 Pokémon, que aumenta progresivamente al hacer scroll en la lista.
### components/buttons:
- BaseButton.vue: Botón reutilizable para múltiples funciones.
- FavoriteButton.vue: Botón marca marcar o desmarcar favoritos, tanto en la lista como en la card especifica.
### components/ui:
- Loader.vue: Animación de carga mientras se obtienen los datos de la API.
- NotFound.vue: Componente que se muestra si no hay Pokémons encontrados o falla la api.
- PokemonCard.vue y PokemonDetailCard.vue: Componentes para mostrar información de un Pokémon.
- FooterList.vue: Componente de footer para la lista donde se encuentran los botones para ver todos los Pokémons o los favoritos.
- SearchInput.vue: Barra de búsqueda para filtrar Pokémons.



## Estructura del Store (Pinia 🍍):

### Estado (state):
- pokemonList: Lista de todos los Pokémon obtenidos de la API.
- pokemonFavorites: Lista de Pokémon marcados como favoritos (guardada en localStorage).
- showFavorites: Bandera para alternar entre la lista completa y los favoritos.
- isLoading: Indicador de carga para mostrar el loader mientras se obtienen datos.
- searchPokemon: Cadena utilizada para filtrar Pokémon por nombre.
- selectedPokemon: Objeto con información detallada del Pokémon seleccionado.
- urlGetPokemons: URL base para la PokéAPI.
- visibleCount: Número de Pokémon visibles en la lista (implementación de "cargar más").
- error: Bandera para detectar errores durante la obtención de datos.

### Acciones (actions):
- fetchPokemons():
Obtiene la lista completa de Pokémon desde la PokéAPI, marcando los que ya están en la lista de favoritos.
- selectPokemon(pokemonName):
Obtiene la información detallada de un Pokémon específico y la guarda en el estado.
- toggleFavorite(pokemon):
Agrega o elimina un Pokémon de la lista de favoritos, actualizando tanto el estado como el almacenamiento local.
- toggleShowFavorites(show):
Alterna entre mostrar la lista completa y los favoritos.
- loadMorePokemons():
Incrementa el número de Pokémon visibles en la lista.
- clearSelectedPokemon():
Limpia la información del Pokémon seleccionado.

### Getters (getters):
- filteredPokemons: Retorna los Pokémon según el término de búsqueda.
- filteredFavorites: Filtra los Pokémon favoritos según el término de búsqueda.
pokemonsToDisplay: Retorna la lista de Pokémon a mostrar, dependiendo de si se están viendo todos o solo los favoritos, respetando el límite de visualización definido por visibleCount.
