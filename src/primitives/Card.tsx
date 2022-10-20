import useMousePosition from "../hooks/useMousePosition";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import stringWithId from "../state/atoms/stringWithId";
import { ICard } from "../hooks/useBoard/index.d";
import _ from "lodash";
import objectWithId from "../state/atoms/objectWithId";

const SUITS = [
  { suit: "s", number: 4 },
  { suit: "d", number: 3 },
  { suit: "h", number: 1 },
  { suit: "c", number: 2 },
];

export const Card = styled.div`
  width: 71px;
  height: 96px;
  background: white;
  position: absolute;
  left: 0;
  top: 0;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid black;
  border-radius: 4px;
  user-select: none;
  margin: -1px;
  box-shadow: 1px -1px 0px black;

  &.back {
    background-position: 0 0;
    background-repeat: repeat;
    background-color: #02027f;
    background-size: 4px 4px;
    background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 44.9%,
        rgba(255, 255, 255, 1) 45%,
        rgba(255, 255, 255, 1) 55%,
        rgba(255, 255, 255, 0) 55.1%,
        rgba(255, 255, 255, 0)
      ),
      linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 44.9%,
        rgba(255, 255, 255, 1) 45%,
        rgba(255, 255, 255, 1) 55%,
        rgba(255, 255, 255, 0) 55.1%,
        rgba(255, 255, 255, 0)
      );
    box-shadow: inset 0 0 0 2px white;
  }

  &.front {
    cursor: grab;
    background-image: url(https://cdn.pr0xy.io/friday-beers/website/cards.png);

    ${_.map(SUITS, ({ suit, number }) => {
      const cardClasses = _.map(_.range(1, 14), (cardNumber) => {
        return `
          &.card--${suit}--${cardNumber} {
            background-position: -${71 * number - 71 + 1}px -${
          96 * cardNumber - 96 + 1
        }px;
          }
        `;
      });

      return cardClasses.join("\n");
    })}
  }

  &.moving {
    position: fixed;
    z-index: 1;
    cursor: grabbing;
    pointer-events: auto;
  }
`;

const MoveableCard = (card: ICard) => {
  const [moving, setMoving] = useState<boolean>(false);
  const { clientX, clientY } = useMousePosition();
  const [cardClass = [], setCardClass] = useState(card.classes);
  const ref = useRef<any>(null);
  const destination = useRecoilValue(stringWithId("destination", null));
  const setDrop = useSetRecoilState(
    objectWithId("drop", {
      startingLocation: null,
      destination: null,
      card: null,
    })
  );

  useEffect(() => {
    if (moving) {
      ref.current.style.left = `${clientX - 35.5}px`;
      ref.current.style.top = `${clientY - 48}px`;
    }
  }, [clientX, clientY]);

  const captureDrop = (event: any) => {
    event.preventDefault();
    if (moving) {
      // ensures that the card does not "blink" at its original location
      setTimeout(() => {
        setCardClass([...card.classes]);
        if (ref.current) {
          ref.current.style.left = "";
          ref.current.style.top = "";
          setMoving(false);
        }
      }, 50);

      if (card.currentLocation !== destination) {
        setDrop({
          from: card.currentLocation,
          destination,
          card,
        });
      }
    }
  };

  const captureMove = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.button !== 0) return;
    if (card.facingUp) {
      setCardClass([...cardClass, "moving"]);
      ref.current.style.left = `${clientX - 35.5}px`;
      ref.current.style.top = `${clientY - 48}px`;
      setMoving(true);
    }
  };

  return (
    <Card
      className={cardClass.join(" ")}
      onMouseDown={captureMove}
      ref={ref}
      onMouseUp={captureDrop}
    />
  );
};

export default MoveableCard;
