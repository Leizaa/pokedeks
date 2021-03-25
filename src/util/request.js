const request = {
  start: (type) => (dispatch) => dispatch({ type }),

  success: (type, items, additional) => (dispatch) =>
    dispatch({ type, items, ...additional }),

  saveSuccess: (type, data) => (dispatch) => dispatch({ type, data }),

  obj: (type, obj) => (dispatch) => dispatch({ type, payload: obj }),

  requestError: (type, errorMessage) => (dispatch) =>
    dispatch({ type, errorMessage }),

  resetRequestState: () => (dispatch) => {
    return dispatch(exports.default.requestReset());
  },
};

export default request;
