import Style from "./index.style";
import _ from "lodash";

import MoveableCard, { Card } from "../../primitives/Card";

const Deck = ({ board, dealHand }: any) => (
  <Style.Container>
    <Style.Pile onClick={dealHand}>
      {_.map(board.pile, (card: any) => {
        return (
          <Card
            className={card.classes?.join(" ")}
            key={`card-${card.type}-${card.number}`}
          />
        );
      })}
    </Style.Pile>
    <Style.Deal>
      {_.map(board.deal, (card: any) => {
        return (
          <MoveableCard
            {...card}
            key={`card-${card.type}-${card.number}`}
            location={card.currentLocation}
          />
        );
      })}
    </Style.Deal>
  </Style.Container>
);

export default Deck;
