import React from "react";
import { Card, Image } from "semantic-ui-react";

function PokeCard({ poke }) {
  const getTypes = (types) => {
    var pokeTypes = [];
    types.forEach((type) => {
      pokeTypes.push(type.type.name);
    });
    return pokeTypes.join(", ");
  };

  const detailLink = "/detail?id=" + poke.id;
  return (
    <a href={detailLink}>
      <Card>
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          wrapped
          ui={false}
        />
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
