import reducer from "../../../../util/reducer-util";
import actionType from "./action-type";
import apiData from "../../../../util/api-data";
import _ from "lodash";

const initialState = apiData.list();

const getPokemonListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_POKEMON_LIST_REQUEST:
      return reducer.createApiDataStateOnStart(state);
    case actionType.GET_POKEMON_LIST_SUCCESS:
      return reducer.createApiDataStateOnSuccess(
        state,
        preprocessResponse(action)
      );
    case actionType.GET_POKEMON_LIST_FAILURE:
      return reducer.createApiDataStateOnFailure(state, action);

    default:
      return state;
  }
};

const getPokeTypes = (types) => {
  let pokeTypes = [];
  types.forEach((type) => {
    pokeTypes.push(type.type.name);
  });
  return pokeTypes;
};

const preprocessResponse = (action) => {
  let pokeDetails = [];
  let rawPokeList = action.payload.output.pokeList;
  console.log(
    action,
    typeof action.payload.output.pokeList,
    action.payload.output.pokeList.length
  );
  console.log(rawPokeList.length);
  rawPokeList.forEach((pokeDetail) => {
    let pokeName = pokeDetail.name;
    let pokeTypes = getPokeTypes(pokeDetail.types);
    let poke = {
      pokeName,
      pokeTypes,
    };
    console.log(poke);
    pokeDetails.push(poke);
  });
  console.log(pokeDetails);

  let shrinked = {
    next: action.payload.output.next,
    previous: action.payload.output.previous,
    pokeList: pokeDetails,
  };

  let data = {
    data: shrinked,
  };

  let output = {
    payload: data,
  };
  console.log(output);
  return output;
};

export default getPokemonListReducer;
