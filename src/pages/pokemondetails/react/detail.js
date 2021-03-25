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
  Input,
  Label,
  Modal,
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
  if (!_.isUndefined(abilities) && !_.isEmpty(abilities)) {
    abilities.toJS().forEach((ability) => {
      abil.push(ability.ability.name);
    });
  }
  return abil.join(", ");
};

class detail extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      failed: false,
      saved: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showFailedCatch = this.showFailedCatch.bind(this);
    this.hideFailedCatch = this.hideFailedCatch.bind(this);
    this.showSavedModal = this.showSavedModal.bind(this);
    this.hideSavedModal = this.hideSavedModal.bind(this);
  }

  nickname = "";

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showFailedCatch = () => {
    this.setState({ failed: true });
  };

  hideFailedCatch = () => {
    this.setState({ failed: false });
  };

  showSavedModal = () => {
    this.setState({ saved: true });
  };

  hideSavedModal = () => {
    this.setState({ saved: false });
  };

  submit = () => {
    if (!_.isEmpty(this.nickname)) {
      let catchedPoke = {
        nickname: this.nickname,
        name: this.props.detailPokemon.getIn(["data", "name"]),
        defaultImage: this.props.detailPokemon.getIn(["data", "defaultImage"]),
        types: this.props.detailPokemon.getIn(["data", "types"]),
      };
      let catchedList = JSON.parse(localStorage.getItem("catched"));
      if (_.isNull(catchedList)) {
        catchedList = [];
      }
      catchedList.push(catchedPoke);
      localStorage.setItem("catched", JSON.stringify(catchedList));
      console.log(JSON.parse(localStorage.getItem("catched")));
      this.nickname = "";
      this.hideModal();
      this.showSavedModal();
    }
  };

  catchAtemp = () => {
    let seed = Math.floor(Math.random() * 10);
    if (seed % 2 == 0) {
      this.showModal();
    } else {
      this.showFailedCatch();
    }
  };

  getNickname = (nickname) => {
    this.nickname = nickname.target.value;
    console.log("nickname", this.nickname);
  };

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
        <Button positive fluid attached="bottom" onClick={this.catchAtemp}>
          Catch!
        </Button>

        <Modal size="mini" dimmer="blurring" open={this.state.show}>
          <Modal.Header>Success</Modal.Header>
          <Modal.Content>
            <p>Please input nickname</p>
            <Input
              fluid
              focus
              placeholder="jhon doe"
              onChange={this.getNickname.bind(this)}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={this.submit}>
              submit
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal size="mini" dimmer="blurring" open={this.state.failed}>
          <Modal.Header>Failed</Modal.Header>
          <Modal.Content>
            <p>Failed to catch pokemon!</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={this.hideFailedCatch}>
              Okay
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal size="mini" dimmer="blurring" open={this.state.saved}>
          <Modal.Header>Success</Modal.Header>
          <Modal.Content>
            <p>Pokemon saved to My Pokemon List!</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={this.hideSavedModal}>
              Okay
            </Button>
            <a href="/owned">
              <Button negative>Go to My Poke List</Button>
            </a>
          </Modal.Actions>
        </Modal>
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
