import reducer from "../../../../util/reducer-util";
import actionType from "./action-type";
import apiData from "../../../../util/api-data";

const initialState = apiData.list();

const getPokemonImageListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_POKEMON_IMAGE_LIST_REQUEST:
      return reducer.createApiDataStateOnStart(state);
    case actionType.GET_POKEMON_IMAGE_LIST_SUCCESS:
      return reducer.createApiDataStateOnSuccess(
        state,
        preprocessResponse(action)
      );
    case actionType.GET_POKEMON_IMAGE_LIST_FAILURE:
      return reducer.createApiDataStateOnFailure(state, action);

    default:
      return state;
  }
};

const preprocessResponse = (action) => {
  let data = {
    data: action.payload.response.data,
  };

  let output = {
    payload: data,
  };
  console.log(output);
  return output;
};

export default getPokemonImageListReducer;
