import React from "react";
import { Container, Grid, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import PokeCard from "../../../components/PokeCard";
import PropTypes from "prop-types";
import { pokemonListSelector } from "../redux";
import getListAction from "../redux/listname/action";
import { connect } from "react-redux";
import { propsActionIsSuccess } from "../../../util/state";
import _ from "lodash";

// const bulba = {
//   id: 1,
//   name: "bulbasaur",
//   types: [
//     {
//       slot: 1,
//       type: {
//         name: "grass",
//         url: "https://pokeapi.co/api/v2/type/12/",
//       },
//     },
//     {
//       slot: 2,
//       type: {
//         name: "poison",
//         url: "https://pokeapi.co/api/v2/type/4/",
//       },
//     },
//   ],
//   sprites: {
//     others: {
//       "official-artwork": {
//         front_default:
//           "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
//       },
//     },
//   },
// };

// const pokeList = [bulba, bulba, bulba];

// const formatPokeList = (pokeList) => {
//   var innerArray = [];
//   var outerArray = [];
//   for (var i = 0; i < pokeList.length; i++) {
//     if (i % 2 === 0) {
//       innerArray.push(pokeList[i]);
//     } else {
//       innerArray.push(pokeList[i]);
//       outerArray.push(innerArray);
//       innerArray = [];
//     }
//   }
//   if (innerArray.length > 0) {
//     outerArray.push(innerArray);
//   }
//   return outerArray;
// };

const getColumns = (pokeList) => {
  return (
    <Grid.Column>
      <PokeCard poke={pokeList} />
    </Grid.Column>
  );
};

// const formatedPokeList = formatPokeList(pokeList);

class home extends React.Component {
  componentDidMount() {
    this.props.getList(0);
  }

  getRows = () => {
    let a = [];
    let column = [];
    const pokeList = this.props.listPokemon.getIn(["data", "pokeList"]);
    if (!_.isUndefined(pokeList) && !_.isEmpty(pokeList)) {
      for (let i = 0; i < pokeList.toJS().length; i++) {
        if (i % 2 === 0 && i !== 0) {
          a.push(<Grid.Row columns={2}>{column}</Grid.Row>);
          column = [];
        }
        column.push(getColumns(pokeList.toJS()[i]));
      }
      if (column.length > 0) {
        a.push(<Grid.Row columns={2}>{column}</Grid.Row>);
      }
    }
    return a;
  };

  state = {
    next: "",
    previous: "",
    pokeList: [],
  };

  processResponseDetail(response) {
    let id = _.get(response, "data.id");
    let types = _.get(response, "data.types");
    let sprites = _.get(response, "data.sprites");
    let name = _.get(response, "data.name");
    let poke = {
      id,
      name,
      types,
      sprites,
    };
    console.log("detail", poke);
    this.state.pokeList.push(poke);
  }

  processResponse(response) {
    this.setState({
      // next: response.getIn(["data", "next"]),
      // previous: response.getIn(["data", "next"]),
      // pokeList: response.getIn(["data", "pokeList"]).toJS(),
    });
  }

  // componentDidUpdate(prevProps) {
  //   const fetchDataSuccess = propsActionIsSuccess(
  //     this.props,
  //     prevProps,
  //     "listPokemon"
  //   );
  //   if (fetchDataSuccess) {
  //     console.log("list poke prop", this.props.listPokemon);
  //     this.processResponse(this.props.listPokemon);
  //   }
  // }

  render() {
    console.log("render", this.state);
    return (
      <Container>
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Header size="huge">Pokedex</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid padded>{this.getRows()}</Grid>
      </Container>
    );
  }
}

home.propTypes = {
  listPokemon: PropTypes.instanceOf(Object).isRequired,
  getList: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => ({
  listPokemon: pokemonListSelector.pokemonList(state),
});

export default connect(mapStateToProp, {
  getList: getListAction.get,
})(home);
