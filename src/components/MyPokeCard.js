import React from "react";
import { Button, Card, Image, Label } from "semantic-ui-react";

function MyPokeCard({ poke, handleOnClick }) {
  const getTypes = (types) => {
    var pokeTypes = [];
    types.forEach((type) => {
      pokeTypes.push(<Label>{type.type.name}</Label>);
    });
    return pokeTypes;
  };

  return (
    <Card>
      <Image src={poke.defaultImage} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{poke.nickname}</Card.Header>
        <Card.Meta>
          <span>{poke.name}</span>
        </Card.Meta>
        <Card.Meta>{getTypes(poke.types)}</Card.Meta>
      </Card.Content>
      <Card.Content extra textAlign="center">
        <Button
          basic
          color="red"
          size="mini"
          onClick={() => handleOnClick(poke)}
        >
          Release
        </Button>
      </Card.Content>
    </Card>
  );
}

export default MyPokeCard;
