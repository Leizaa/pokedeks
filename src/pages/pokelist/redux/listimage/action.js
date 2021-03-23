import axios from "axios";
import request from "../../../../util/request";
import actionType from "./action-type";

const getImageListAction = {
  get: (URLs) => (dispatch) => {
    dispatch(request.obj(actionType.GET_POKEMON_IMAGE_LIST_REQUEST));

    let axiosURLs = [];
    URLs.forEach((url) => {
      axiosURLs.push(axios.get(url));
    });

    return axios
      .all(axiosURLs)
      .then(
        axios.spread((...response) => {
          console.log(response);
          return dispatch(
            request.obj(actionType.GET_POKEMON_LIST_SUCCESS, {
              response,
            })
          );
        })
      )
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

export default getImageListAction;
