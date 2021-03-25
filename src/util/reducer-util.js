import Immutable from "immutable";
import _ from "lodash";

const reducer = {
  resetApiDataState: (state) => {
    return state.merge({
      isFetching: false,
      errorMessage: "",
      validationError: Immutable.Map(),
    });
  },

  createApiDataStateOnStart: (state) => {
    return state.merge({
      isFetching: true,
      errorMessage: "",
      validationError: Immutable.Map(),
    });
  },

  createApiDataStateOnSuccess: (state, action) => {
    return state.merge({
      isFetching: false,
      errorMessage: "",
      validationError: Immutable.Map(),
      data: Immutable.fromJS(action.payload.data),
      total: Immutable.fromJS(_.get(action, "payload.data.total", 0)),
      success: true,
    });
  },

  createApiDataStateOnFailure: (state, action) => {
    return state.merge({
      isFetching: false,
      errorMessage: _.get(action, "payload.errorMessage", "Terjadi Kesalahan"),
      validationError: Immutable.Map(),
      success: false,
    });
  },
};

export default reducer;
