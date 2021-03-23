import axios from "axios";
import apiConstant from "../../../../util/api-constant";
import request from "../../../../util/request";
import actionType from "./action-type";

const getListAction = {
  get: (offset) => (dispatch) => {
    dispatch(request.obj(actionType.GET_POKEMON_LIST_REQUEST));

    let url = apiConstant.API_URL + "?limit=5";
    if (offset >= 0) {
      url = url + "&offset=" + offset;
    }
    return axios
      .get(url)
      .then((response) => {
        let urls = response.data.results;
        let pokeList = getPokeList(urls);

        let output = {
          previous: response.data.previous,
          next: response.data.next,
          pokeList: pokeList,
        };
        // console.log(output);

        return dispatch(
          request.obj(actionType.GET_POKEMON_LIST_SUCCESS, {
            output,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        return dispatch(
          request.obj(actionType.GET_POKEMON_LIST_FAILURE, {
            errorMessage: "Failed to get list",
          })
        );
      });
  },
};

const getPokeList = (urls) => {
  let gets = [];
  let output = [];
  urls.forEach((url) => {
    const get = axios.get(url.url);
    gets.push(get);
  });
  axios.all(gets).then(
    axios.spread((...responses) => {
      responses.forEach((res) => {
        // console.log(res.data);
        output.push(res.data);
      });
    })
  );
  return output;
};

export default getListAction;
