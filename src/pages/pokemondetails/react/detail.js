import React from "react";
import { connect } from "react-redux";
import detailAction from "../redux/action";
import { pokemonDetailSelector } from "../redux";
import { PropTypes } from "prop-types";

class detail extends React.Component {
  state = {};

  componentDidMount() {
    const search = this.props.location.search;
    const pokeId = new URLSearchParams(search).get("id");
    console.log(this.props);
    this.props.getDetail(pokeId);
  }

  render() {
    return <div>detail</div>;
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
