import { combineReducers } from "redux";
import getPokemonDetailsReducer from "./get-pokemon-detail";

export default combineReducers({
  pokemonDetail: getPokemonDetailsReducer,
});

const pokemonDetailSelector = {
  pokemonDetail: (state) => state.screen.pokemon.detail.pokemonDetail,
};

export { pokemonDetailSelector };
