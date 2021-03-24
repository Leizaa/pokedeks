import React from "react";
import { Card, Image, Label } from "semantic-ui-react";
import _ from "lodash";

function PokeCard({ poke }) {
  const getTypes = (types) => {
    var pokeTypes = [];
    types.forEach((type) => {
      pokeTypes.push(<Label>{type.type.name}</Label>);
    });
    return pokeTypes;
  };

  const getImg = (sprites) => {
    return _.get(sprites, "other.official-artwork.front_default");
  };

  const detailLink = "/detail?id=" + poke.id;
  return (
    <a href={detailLink}>
      <Card>
        <Image src={getImg(poke.sprites)} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{poke.name}</Card.Header>
          <Card.Meta>{getTypes(poke.types)}</Card.Meta>
        </Card.Content>
      </Card>
    </a>
  );
}

export default PokeCard;
