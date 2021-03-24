import React from "react";
import { Button, Container, Grid, Header } from "semantic-ui-react";
import MyPokeCard from "../../../components/MyPokeCard";
import _ from "lodash";

const getColumns = (poke) => {
  return (
    <Grid.Column>
      <MyPokeCard poke={poke} />
    </Grid.Column>
  );
};

class mypoke extends React.Component {
  constructor() {
    super();
    this.state = {
      windowWidth: window.innerWidth,
    };
  }

  getRows = () => {
    let a = [];
    let column = [];
    var pokeList = JSON.parse(localStorage.getItem("catched"));
    let calc = 5;
    if (this.state.windowWidth < 450) calc = 2;
    if (!_.isUndefined(pokeList) && !_.isEmpty(pokeList)) {
      for (let i = 0; i < pokeList.length; i++) {
        if (i % calc === 0 && i !== 0) {
          a.push(<Grid.Row columns={calc}>{column}</Grid.Row>);
          column = [];
        }
        column.push(getColumns(pokeList[i]));
      }
      if (column.length > 0) {
        a.push(<Grid.Row columns={calc}>{column}</Grid.Row>);
      }
    }
    return a;
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = (e) => {
    console.log(window.innerWidth);
    this.setState({ windowWidth: window.innerWidth });
  };

  render() {
    return (
      <Container textAlign="center">
        <Grid padded>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header size="huge" floated="left">
                My Pokemon
              </Header>
            </Grid.Column>
            <Grid.Column>
              <a href="/">
                <Button floated="right" positive basic>
                  Go to Pokemon List
                </Button>
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid padded>{this.getRows()}</Grid>
      </Container>
    );
  }
}

export default mypoke;
