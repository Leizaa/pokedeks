import { combineReducers } from "redux";
import getPokemonListReducer from "./get-pokemon-list";

export default combineReducers({
  pokemonList: getPokemonListReducer,
});

const pokemonListSelector = {
  pokemonList: (state) => state.screen.list.pokemonList,
};

export { pokemonListSelector };
