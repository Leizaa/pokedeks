import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import pokemonDetail from "./pages/pokemondetails/redux";
import _ from "lodash";

const composeEnhancers =
  _.toLower(process.env.NODE_ENV) === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(
  combineReducers(
    {
      initialState: {},
      screen: combineReducers({
        pokemon: combineReducers({
          detail: pokemonDetail,
        }),
      }),
    },
    applyMiddleware(thunkMiddleware)
  )
);

export default store;
