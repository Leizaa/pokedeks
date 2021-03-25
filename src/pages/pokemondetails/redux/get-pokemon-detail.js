import reducer from "../../../util/reducer-util";
import actionType from "./action-type";
import apiData from "../../../util/api-data";
import _ from "lodash";

const initialState = apiData.list();

const getPokemonDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_POKEMON_DETAIL_REQUEST:
      return reducer.createApiDataStateOnStart(state);
    case actionType.GET_POKEMON_DETAIL_SUCCESS:
      return reducer.createApiDataStateOnSuccess(
        state,
        processDataSuccess(action)
      );
    case actionType.GET_POKEMON_DETAIL_FAILURE:
      return reducer.createApiDataStateOnFailure(state, action);

    default:
      return state;
  }
};

const getDefaultImg = (data) => {
  return _.get(data, "sprites.other.official-artwork.front_default");
};

const processDataSuccess = (action) => {
  console.log(action.payload.response.data);

  const {
    id,
    name,
    types,
    height,
    weight,
    abilities,
  } = action.payload.response.data;

  let defaultImage = getDefaultImg(action.payload.response.data);
  let reducedDetail = {
    id,
    name,
    types,
    height,
    weight,
    abilities,
    defaultImage,
  };
  let data = {
    data: reducedDetail,
  };
  let output = {
    payload: data,
  };
  console.log(output);

  return output;
};

export default getPokemonDetailsReducer;
