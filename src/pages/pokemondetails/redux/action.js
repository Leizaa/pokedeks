import axios from "axios";
import apiConstant from "../../../util/api-constant";
import request from "../../../util/request";
import actionType from "./action-type";

const getDetailAction = {
  get: (pokemonId) => (dispatch) => {
    dispatch(request.obj(actionType.GET_POKEMON_DETAIL_REQUEST));

    const url = apiConstant.API_URL + "/" + pokemonId;
    console.log(url);
    return axios
      .get(url)
      .then((response) => {
        console.log(response);
        return dispatch(
          request.obj(actionType.GET_POKEMON_DETAIL_SUCCESS, {
            response,
          })
        );
      })
      .catch(() => {
        return dispatch(
          request.obj(actionType.GET_POKEMON_DETAIL_FAILURE, {
            errorMessage: "Failed to get detail",
          })
        );
      });
  },
};

export default getDetailAction;
