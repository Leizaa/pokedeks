import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import pokemonDetail from "./pages/pokemondetails/redux";
import pokemonList from "./pages/pokelist/redux";
import _ from "lodash";

const store = createStore(
  combineReducers({
    initialState: {},
    screen: combineReducers({
      detail: pokemonDetail,
      list: pokemonList,
    }),
  }),
  applyMiddleware(thunkMiddleware)
);

export default store;
