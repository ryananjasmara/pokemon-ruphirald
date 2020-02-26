## Pokemon Ruphirald
Live Preview : https://nervous-dijkstra-ceb92b.netlify.com/

## How To Install

1. Clone this project using `git clone` or else.
2. Then in the project directory, you can run `npm install` to install all needed dependency.
3. Finally you can run the project using `npm start`.

## This Project Using
1. ReactJS
2. reactstrap (styled components)
3. rematch (global state management)
4. react-router-dom
5. RESTful Pokémon API from https://pokeapi.co/

## Project Description
This project has 3 main pages namely : `HomePages`, `DetailPages` and `MyPokemonPages`. 

- `HomePages` 

Contain pokemons list from the API. Initially only 10 pokemons data will be displayed, but user can see more by pressing the <b>Load More</b> button as the system will fetch more data from the API.

- `DetailPages`

Contain detailed information about single pokemon (such as abilities or move or else). In this pages, user can catch that pokemon. It has <b>50% chance</b> to catch any pokemon. Catched pokemon will saved to both `global state` and `local storage` (incase if the pages reloaded, the data still saved).

- `MyPokemonPages`

Contain the list of catched pokemons. User can remove all catched pokemons by pressing the <b>Clear Data</b> button. It will clear all data from both `global state` and `local storage`.
