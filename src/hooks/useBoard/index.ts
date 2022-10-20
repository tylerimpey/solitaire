import { useEffect, useState } from "react";
import { IBoard, ICard } from "./index.d";
import _ from "lodash";
import { useRecoilValue } from "recoil";
import objectWithId from "../../state/atoms/objectWithId";

const freshBoard: IBoard = {
  types: ["c", "d", "h", "s"],
  colors: { c: "black", d: "red", h: "red", s: "black" },
  pile: [],
  deal: [],
  finish: [{ cards: [] }, { cards: [] }, { cards: [] }, { cards: [] }],
  desk: [
    { cards: [] },
    { cards: [] },
    { cards: [] },
    { cards: [] },
    { cards: [] },
    { cards: [] },
    { cards: [] },
  ],
};

const useBoard = () => {
  const [board, setBoard] = useState<IBoard>(freshBoard);
  const drop = useRecoilValue(objectWithId("drop", {}));

  /** @description Flips a card in the current location. */
  const flipLocationTopCard = (update: IBoard, location: string) => {
    if (/^stack-\d+$/.test(location)) {
      const whichStack = parseInt(location.split("-")[1]);
      if (update.desk[whichStack].cards.length > 0) {
        const card: ICard = update.desk[whichStack].cards.pop()!;
        card.facingUp = true;
        card.classes = ["front", `card--${card.type}--${card.number}`];
        update.desk[whichStack].cards.push(card);
      }
    }

    return update;
  };

  /** @description Deals cards from the deck to the face up section. */
  const dealHand = () => {
    const update = { ...board };

    console.log(update.pile);

    if (update.pile.length === 0) {
      update.pile = update.deal.map((card) => {
        return {
          ...card,
          facingUp: false,
          classes: ["back"],
          currentLocation: "pile",
        };
      });
      update.deal = [];

      console.log(`PLAYLOG: The pile has been reset.`);

      return setBoard(update);
    }

    const toPlace = update.pile
      .splice(0, Math.min(3, update.pile.length))
      .map((card) => {
        return {
          ...card,
          facingUp: true,
          classes: ["front", `card--${card.type}--${card.number}`],
          currentLocation: "deal",
        };
      });

    update.deal.push(...toPlace);

    console.log(`PLAYLOG: Dealer dealt ${toPlace.length} cards.`);

    return setBoard(update);
  };

  /** @description Resets the game board to a fresh game. */
  const resetGame = (update: any) => {
    update.pile = update.pile.sort(() => (Math.random() > 0.5 ? 1 : -1));

    for (let i = 0; i < 7; i++) {
      for (let j = i; j < 7; j++) {
        const card = update.pile.shift();
        card.currentLocation = `stack-${j}`;

        if (j === i) {
          card.facingUp = true;
          card.classes = ["front", `card--${card.type}--${card.number}`];
        } else {
          card.classes = ["back"];
        }

        update.desk[j].cards.push(card);
      }
    }

    console.log(`PLAYLOG: The game board has been reset.`);

    return setBoard(update);
  };

  /** @description Gets locations that a card is eligible to move to based on suit and value. */
  const getAvailableDestinations = (card: ICard) => {
    const destinations = [];

    // checking the finish piles for each card
    for (let i = 0; i < 4; i++) {
      if (card.number === 1 && board.finish[i].cards.length === 0) {
        destinations.push(`finish-${i}`);
      } else if (board.finish[i].cards.length > 0) {
        const lastCard: ICard = board.finish[i].cards.at(-1)!;
        if (
          lastCard.number + 1 === card.number &&
          lastCard.type === card.type
        ) {
          destinations.push(`finish-${i}`);
        }
      }
    }

    // checking the desk piles for each card
    for (let i = 0; i < 7; i++) {
      if (board.desk[i].cards.length === 0 && card.number === 13) {
        destinations.push(`stack-${i}`);
      } else if (board.desk[i].cards.length > 0) {
        const lastCard: ICard = board.desk[i].cards.at(-1)!;
        if (
          lastCard.number - 1 === card.number &&
          board.colors[lastCard.type] !== board.colors[card.type]
        ) {
          destinations.push(`stack-${i}`);
        }
      }
    }

    return destinations;
  };

  /** @description Moves a card from one pile to another. */
  const moveCard = (from: string, to: string, card: ICard) => {
    const destinations = getAvailableDestinations(card);
    const update = { ...board };

    if (!destinations.includes(to)) return;

    if (from === to) {
      return;
    } else if (from === "deal" && /^stack-\d+$/.test(to)) {
      const whichStack = parseInt(to.split("-")[1]);
      const card: ICard = update.deal.pop()!;
      card.currentLocation = to;
      update.desk[whichStack].cards.push(card);
    } else if (from === "deal" && /^finish-\d+$/.test(to)) {
      const whichFinish = parseInt(to.split("-")[1]);
      const card: ICard = update.deal.pop()!;
      card.currentLocation = to;
      update.finish[whichFinish].cards.push(card);
    } else if (/^stack-\d+$/.test(from) && /^stack-\d+$/.test(to)) {
      const fromStack = parseInt(from.split("-")[1]);
      const toStack = parseInt(to.split("-")[1]);
      const card: ICard = update.desk[fromStack].cards.pop()!;
      card.currentLocation = to;
      update.desk[toStack].cards.push(card);

      flipLocationTopCard(update, from);
    } else if (/^stack-\d+$/.test(from) && /^finish-\d+$/.test(to)) {
      const fromStack = parseInt(from.split("-")[1]);
      const toFinish = parseInt(to.split("-")[1]);
      const card: ICard = update.desk[fromStack].cards.pop()!;
      card.currentLocation = to;
      update.finish[toFinish].cards.push(card);

      flipLocationTopCard(update, from);
    }

    console.log(`PLAYLOG: Moved card from ${from} to ${to}.`);

    return setBoard(update);
  };

  /** @description Initializing the game board. */
  useEffect(() => {
    const update = { ...freshBoard };

    // creating the cards
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 13; j++) {
        update.pile.push({
          type: board.types[i],
          number: j,
          facingUp: false,
          classes: ["back"],
          currentLocation: "pile",
        });
      }
    }

    resetGame(update);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** @description When `drop` is updated, it implies a card was moved. */
  useEffect(() => {
    if (drop?.card) moveCard(drop.from, drop.destination, drop.card);
  }, [drop]);

  return { board, dealHand, moveCard };
};

export default useBoard;
