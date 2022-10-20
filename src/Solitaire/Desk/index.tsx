import useAbsoluteHover from "../../hooks/useAbsoluteHover";
import MoveableCard, { Card } from "../../primitives/Card";
import Style from "./index.style";
import { useEffect } from "react";
import _ from "lodash";
import { useSetRecoilState } from "recoil";
import stringWithId from "../../state/atoms/stringWithId";

const Stack = ({ stack, index }: any) => {
  const [ref, isHovered]: any = useAbsoluteHover();
  const setDestination = useSetRecoilState(stringWithId("destination", null));

  useEffect(() => {
    if (isHovered) {
      setDestination(`stack-${index}`);
    } else {
      setDestination(null);
    }
  }, [isHovered]);

  return (
    <Style.Stack id={`stack-${index}`} ref={ref}>
      {stack.cards.length > 0 && (
        <RecursiveCard deck={stack.cards} stack={index} />
      )}
    </Style.Stack>
  );
};

const RecursiveCard = ({ deck, stack }: any) => {
  if (deck.length === 1) {
    return <MoveableCard {...deck[0]} location={`stack-${stack}`} />;
  }

  const card = deck[0];
  const newDeck = deck.slice(1);

  return (
    <Card
      className={card.classes?.join(" ")}
      key={`card-${card.type}-${card.number}`}
    >
      {newDeck.length > 0 && <RecursiveCard deck={newDeck} stack={stack} />}
    </Card>
  );
};

const Desk = ({ board }: any) => {
  return (
    <Style.Container>
      {_.map(board.desk, (stack, index) => {
        return <Stack key={`stack-${index}`} stack={stack} index={index} />;
      })}
    </Style.Container>
  );
};

export default Desk;
