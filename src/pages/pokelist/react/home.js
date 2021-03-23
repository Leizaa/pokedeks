import React from "react";
import { Container, Grid, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import PokeCard from "../../../components/PokeCard";
import PropTypes from "prop-types";
import { pokemonListSelector } from "../redux";
import getListAction from "../redux/listname/action";
import { connect } from "react-redux";
import { propsActionIsSuccess } from "../../../util/state";

const bulba = {
  id: 1,
  name: "bulbasaur",
  types: [
    {
      slot: 1,
      type: {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/",
      },
    },
    {
      slot: 2,
      type: {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/",
      },
    },
  ],
  sprites: {
    others: {
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      },
    },
  },
};

const pokeList = [bulba, bulba, bulba];

const formatPokeList = (pokeList) => {
  var innerArray = [];
  var outerArray = [];
  for (var i = 0; i < pokeList.length; i++) {
    if (i % 2 === 0) {
      innerArray.push(pokeList[i]);
    } else {
      innerArray.push(pokeList[i]);
      outerArray.push(innerArray);
      innerArray = [];
    }
  }
  if (innerArray.length > 0) {
    outerArray.push(innerArray);
  }
  return outerArray;
};

const getColumns = (pokeList) => {
  let a = [];
  pokeList.forEach((poke) => {
    a.push(
      <Grid.Column>
        <PokeCard poke={poke} />
      </Grid.Column>
    );
  });
  return a;
};

const getRows = (params) => {
  let a = [];
  params.forEach((param) => {
    a.push(<Grid.Row columns={2}>{getColumns(param)}</Grid.Row>);
  });
  return a;
};

const formatedPokeList = formatPokeList(pokeList);

class home extends React.Component {
  componentDidMount() {
    this.props.getList(0);
  }

  state = {
    next: "",
    previous: "",
    pokeNames: [],
    pokeImageURLs: [],
  };

  processResponse(reponse) {
    if (reponse.getIn(["data", "previous"]) !== null) {
      this.state.previous = reponse.getIn(["data", "previous"]);
    }
    this.state.next = reponse.getIn(["data", "next"]);
    let pokeNameMap = reponse.getIn(["data", "results"]);
    pokeNameMap.toJS().forEach((pokeName) => {
      this.state.pokeNames.push(pokeName.name);
      this.state.pokeImageURLs.push(pokeName.url);
    });
    console.log(this.state.pokeNames);
    console.log(this.state.pokeImageURLs);
    console.log(this.state.next);
    console.log(this.state.previous);
  }

  componentDidUpdate(prevProps) {
    // const fetchDataSuccess = propsActionIsSuccess(
    //   this.props,
    //   prevProps,
    //   "listPokemon"
    // );
    // if (fetchDataSuccess) {
    //   this.processResponse(this.props.listPokemon);
    // }
  }

  render() {
    return (
      <Container>
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Header size="huge">Pokedeks</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid padded>{getRows(formatedPokeList)}</Grid>
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
