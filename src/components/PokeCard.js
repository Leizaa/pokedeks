import React from "react";
import { Card, Image } from "semantic-ui-react";
import _ from "lodash";

function PokeCard({ poke }) {
  console.log(poke);
  const getTypes = (types) => {
    var pokeTypes = [];
    types.forEach((type) => {
      pokeTypes.push(type.type.name);
    });
    return pokeTypes.join(", ");
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
          <Card.Meta>
            <span>{getTypes(poke.types)}</span>
          </Card.Meta>
        </Card.Content>
      </Card>
    </a>
  );
}

export default PokeCard;
