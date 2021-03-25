import React from "react";
import { Button, Container, Grid, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import PokeCard from "../../../components/PokeCard";
import PropTypes from "prop-types";
import { pokemonListSelector } from "../redux";
import getListAction from "../redux/listname/action";
import { connect } from "react-redux";
import _ from "lodash";

const getColumns = (pokeList) => {
  return (
    <Grid.Column>
      <PokeCard poke={pokeList} />
    </Grid.Column>
  );
};

class home extends React.Component {
  constructor() {
    super();
    this.state = {
      windowWidth: window.innerWidth,
    };
  }

  pokeList = [];

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.props.getList();
  }

  handleResize = (e) => {
    console.log(window.innerWidth);
    this.setState({ windowWidth: window.innerWidth });
  };

  getRows = () => {
    let a = [];
    let column = [];
    let newList = this.props.listPokemon.getIn(["data", "pokeList"]);
    if (!_.isUndefined(newList) && !_.isEmpty(newList)) {
      if (_.isUndefined(this.pokeList) || _.isEmpty(this.pokeList)) {
        this.pokeList = newList.toJS();
      } else {
        let length = newList.toJS().length;
        let newPoke = newList.toJS()[length - 1];
        let lastPoke = this.pokeList[this.pokeList.length - 1];
        if (newPoke.id !== lastPoke.id) {
          this.pokeList.push(newPoke);
        }
      }
    }
    // let merged = [...this.pokeList, ...newList];
    console.log(this.pokeList.length);

    let calc = 5;
    if (this.state.windowWidth < 450) calc = 2;
    if (!_.isUndefined(this.pokeList) && !_.isEmpty(this.pokeList)) {
      for (let i = 0; i < this.pokeList.length; i++) {
        if (i % calc === 0 && i !== 0) {
          a.push(
            <Grid.Row stackable columns={calc}>
              {column}
            </Grid.Row>
          );
          column = [];
        }
        column.push(getColumns(this.pokeList[i]));
      }
      if (column.length > 0) {
        a.push(
          <Grid.Row stackable columns={calc}>
            {column}
          </Grid.Row>
        );
      }
    }
    return a;
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

  handleLoadMore = () => {
    console.log("load more called");
    let nextUrl = this.props.listPokemon.getIn(["data", "next"]);
    this.props.getList(nextUrl);
  };

  render() {
    return (
      <Container textAlign="center">
        <Grid padded>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header size="huge" floated="left">
                Pokedex
              </Header>
            </Grid.Column>
            <Grid.Column>
              <a href="/owned">
                <Button floated="right" positive basic>
                  Go to My Poke
                </Button>
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid padded>{this.getRows()}</Grid>
        <Button basic positive onClick={this.handleLoadMore}>
          Load more
        </Button>
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
