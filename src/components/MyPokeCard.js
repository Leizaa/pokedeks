import React from "react";
import { Button, Card, Image, Label } from "semantic-ui-react";

// const releasePoke = (self) => {
//   var pokeList = JSON.parse(localStorage.getItem("catched"));
//   console.log("before", pokeList);
//   for (let i = 0; i < pokeList.length; i++) {
//     if (
//       pokeList[i].nickname === self.nickname &&
//       pokeList[i].name === self.name
//     ) {
//       pokeList.splice(i, i + 1);
//       break;
//     }
//   }
//   console.log("after", pokeList);
//   localStorage.setItem("catched", JSON.stringify(pokeList));
// };

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
