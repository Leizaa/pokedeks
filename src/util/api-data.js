import { Record, List, Map } from "immutable";

const ApiData = Record({
  isFetching: false,
  isUpdating: false,
  data: null,
  total: 0,
  errorMessage: "",
  validationError: Map(),
  success: false,
});

const list = () =>
  new ApiData({
    data: List([]),
  });

const map = () =>
  new ApiData({
    data: Map({}),
  });

const bool = () =>
  new ApiData({
    data: false,
  });

const create = (apiData) => new ApiData(apiData);

const data = {
  list,
  map,
  create,
  bool,
};

export default data;
