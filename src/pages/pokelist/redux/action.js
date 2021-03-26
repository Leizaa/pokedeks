import axios from "axios";
import apiConstant from "../../../util/api-constant";
import request from "../../../util/request";
import actionType from "./action-type";
import _ from "lodash";

const getListAction = {
  get: (offset) => (dispatch) => {
    dispatch(request.obj(actionType.GET_POKEMON_LIST_REQUEST));

    let url = apiConstant.API_URL + "?limit=30";
    if (!_.isUndefined(offset) && !_.isEmpty(offset)) {
      url = offset;
    }
    return axios
      .get(url)
      .then(async (response) => {
        let urls = response.data.results;
        let pokeList = [];
        let prev = response.data.previous;
        let next = response.data.next;

        return _.map(urls, async (url) => {
          dispatch(request.obj(actionType.GET_POKEMON_LIST_REQUEST));

          return axios.get(url.url).then((response) => {
            const data = response.data;
            pokeList.push(data);

            const output = {
              previous: prev,
              next: next,
              pokeList: pokeList,
            };

            return dispatch(
              request.obj(actionType.GET_POKEMON_LIST_SUCCESS, {
                output,
              })
            );
          });
        });
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

export default getListAction;
