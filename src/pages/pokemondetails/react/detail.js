import React from "react";
import { connect } from "react-redux";
import detailAction from "../redux/action";
import { pokemonDetailSelector } from "../redux";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  Label,
} from "semantic-ui-react";
import _ from "lodash";

const style = {
  paddingBottom: "1em",
};

const cotainerStyle = {
  height: "100%",
};

const contentStyle = {
  height: "93%",
};

const imageStyle = {
  margin: "auto",
};

const getPokemonTypes = (pokeList) => {
  let a = [];
  if (typeof pokeList !== "undefined") {
    pokeList.toJS().forEach((poke) => {
      a.push(<Label>{poke.type.name}</Label>);
    });
  }
  return a;
};

const getPokemonAbilities = (abilities) => {
  let abil = [];
  if (typeof abilities !== "undefined") {
    abilities.toJS().forEach((ability) => {
      abil.push(ability.ability.name);
    });
  }
  return abil.join(", ");
};

class detail extends React.Component {
  componentDidMount() {
    const search = this.props.location.search;
    const pokeId = new URLSearchParams(search).get("id");
    this.props.getDetail(pokeId);
  }

  render() {
    return (
      <Container style={cotainerStyle}>
        <Container style={contentStyle}>
          <Container>
            <Image
              style={imageStyle}
              src={this.props.detailPokemon.getIn(["data", "defaultImage"])}
              size="medium"
              rounded
            />
          </Container>
          <Container textAlign="center" style={style}>
            <Header size="large" textAlign="center">
              {this.props.detailPokemon.getIn(["data", "name"])}
            </Header>
            {getPokemonTypes(this.props.detailPokemon.getIn(["data", "types"]))}
          </Container>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <p>Weight</p>
              </Grid.Column>
              <Grid.Column>
                <p>{this.props.detailPokemon.getIn(["data", "weight"])}</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <p>Height</p>
              </Grid.Column>
              <Grid.Column>
                <p>{this.props.detailPokemon.getIn(["data", "height"])}</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <p>Abilities</p>
              </Grid.Column>
              <Grid.Column>
                <p>
                  {getPokemonAbilities(
                    this.props.detailPokemon.getIn(["data", "abilities"])
                  )}
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Button positive fluid attached="bottom">
          Catch!
        </Button>
      </Container>
    );
  }
}

detail.propTypes = {
  detailPokemon: PropTypes.instanceOf(Object).isRequired,
  getDetail: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => ({
  detailPokemon: pokemonDetailSelector.pokemonDetail(state),
});

export default connect(mapStateToProp, {
  getDetail: detailAction.get,
})(detail);
