import reducer from "../../../util/reducer-util";
import actionType from "./action-type";

const getPokemonDetailsReducer = (state = null, action) => {
  switch (action.type) {
    case actionType.GET_POKEMON_DETAIL_REQUEST:
      return reducer.createApiDataStateOnStart(state);
    case actionType.GET_POKEMON_DETAIL_SUCCESS:
      return reducer.createApiDataStateOnSuccess(state, action);
    case actionType.GET_POKEMON_DETAIL_FAILURE:
      return reducer.createApiDataStateOnFailure(state, action);

    default:
      return state;
  }
};

export default getPokemonDetailsReducer;
