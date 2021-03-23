import { combineReducers } from "redux";
import getPokemonListReducer from "./listname/get-pokemon-list";

export default combineReducers({
  pokemonList: getPokemonListReducer,
});

const pokemonListSelector = {
  pokemonList: (state) => state.screen.list.pokemonList,
};

export { pokemonListSelector };
