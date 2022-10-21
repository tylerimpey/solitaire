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
  finish: [],
  desk: [],
};

const useBoard = () => {
  const [board, setBoard] = useState<IBoard>({ ...freshBoard });
  const drop = useRecoilValue(objectWithId("drop", {}));

  /** @description Flips a card in the current location. */
  const flipLocationTopCard = (update: IBoard, location: string) => {
    if (/^stack-\d+$/.test(location)) {
      const whichStack = parseInt(location.split("-")[1]);
      if (update.desk[whichStack].length > 0) {
        const card: ICard = update.desk[whichStack].pop()!;
        card.facingUp = true;
        card.classes = ["front", `card--${card.type}--${card.number}`];
        update.desk[whichStack].push(card);
      }
    }

    return update;
  };

  /** @description Deals cards from the deck to the face up section. */
  const dealHand = () => {
    const update = { ...board };

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
  const resetGame = () => {
    const update: IBoard = {
      ...freshBoard,
      finish: _.map(_.range(0, 4), () => []),
      desk: _.map(_.range(0, 7), () => []),
      pile: [],
      deal: [],
    };

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

    update.pile = update.pile.sort(() => (Math.random() > 0.5 ? 1 : -1));

    for (let i = 0; i < 7; i++) {
      for (let j = i; j < 7; j++) {
        const card: ICard = update.pile.shift()!;
        card.currentLocation = `stack-${j}`;

        if (j === i) {
          card.facingUp = true;
          card.classes = ["front", `card--${card.type}--${card.number}`];
        } else {
          card.classes = ["back"];
        }

        update.desk[j].push(card);
      }
    }

    console.log(`PLAYLOG: The game board has been reset.`);

    document.getElementById("win-canvas")?.remove();
    return setBoard(update);
  };

  /** @description Gets locations that a card is eligible to move to based on suit and value. */
  const getAvailableDestinations = (card: ICard) => {
    const destinations = [];

    // checking the finish piles for each card
    for (let i = 0; i < 4; i++) {
      if (card.number === 1 && board.finish[i].length === 0) {
        destinations.push(`finish-${i}`);
      } else if (board.finish[i].length > 0) {
        const lastCard: ICard = board.finish[i].at(-1)!;
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
      if (board.desk[i].length === 0 && card.number === 13) {
        destinations.push(`stack-${i}`);
      } else if (board.desk[i].length > 0) {
        const lastCard: ICard = board.desk[i].at(-1)!;
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
      update.desk[whichStack].push(card);
    } else if (from === "deal" && /^finish-\d+$/.test(to)) {
      const whichFinish = parseInt(to.split("-")[1]);
      const card: ICard = update.deal.pop()!;
      card.currentLocation = to;
      update.finish[whichFinish].push(card);

      gameFinish();
    } else if (/^stack-\d+$/.test(from) && /^stack-\d+$/.test(to)) {
      const fromStack = parseInt(from.split("-")[1]);
      const toStack = parseInt(to.split("-")[1]);
      const card: ICard = update.desk[fromStack].pop()!;
      card.currentLocation = to;
      update.desk[toStack].push(card);

      flipLocationTopCard(update, from);
    } else if (/^stack-\d+$/.test(from) && /^finish-\d+$/.test(to)) {
      const fromStack = parseInt(from.split("-")[1]);
      const toFinish = parseInt(to.split("-")[1]);
      const card: ICard = update.desk[fromStack].pop()!;
      card.currentLocation = to;
      update.finish[toFinish].push(card);

      flipLocationTopCard(update, from);
      gameFinish();
    }

    console.log(`PLAYLOG: Moved card from ${from} to ${to}.`);

    return setBoard(update);
  };

  /** @description Checks if the game is finished and initializes the win animation. */
  const gameFinish = () => {
    for (const finish of board.finish) {
      if (finish.length < 13) return;
    }

    win();
  };

  /** @description The win animation. */
  const win = () => {
    const element = document.getElementById("solitaire-board");
    const {
      width,
      height,
      left: canvasLeft,
      top: canvasTop,
    } = element!.getBoundingClientRect();
    const image = document.createElement("img");
    image.src = "https://cdn.pr0xy.io/friday-beers/website/cards.png";
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "win-canvas");
    canvas.style.position = "absolute";
    canvas.style.top = "2px";
    canvas.width = width;
    canvas.height = height;
    element?.appendChild(canvas);

    console.log("PLAYLOG: You've won!");

    const context = canvas.getContext("2d");
    let card = 52;
    const particles: any = [];

    const cardWidth = 71;
    const cardHeight = 96;

    const drawCard = (x: any, y: any, spriteX: any, spriteY: any) => {
      context?.drawImage(
        image,
        spriteX,
        spriteY,
        cardWidth,
        cardHeight,
        x,
        y,
        cardWidth,
        cardHeight
      );
    };

    class Particle {
      update: any;

      constructor(id: any, x: any, y: any, sx: any, sy: any) {
        if (sx === 0) sx = 2;
        const spriteX = (id % 4) * cardWidth;
        const spriteY = Math.floor(id / 4) * cardHeight;

        // initial position of the card
        drawCard(x, y, spriteX, spriteY);

        this.update = () => {
          x += sx;
          y += sy;

          // is particle out of canvas
          if (x < -cardWidth || x > canvas.width + cardWidth) {
            const index = particles.indexOf(this);
            particles.splice(index, 1);
            return false;
          }

          // bounce from floor
          if (y > canvas.height - cardHeight) {
            y = canvas.height - cardHeight;
            sy = -sy * 0.85;
          }
          sy += 0.98;

          drawCard(Math.floor(x), Math.floor(y), spriteX, spriteY);
          return true;
        };
      }
    }

    const throwCard = (x: number, y: number) => {
      if (card < 1) return;
      card--;
      const particle = new Particle(
        card,
        x,
        y,
        Math.floor(Math.random() * 6 - 3) * 2,
        -Math.random() * 16
      );

      // const particle = new Particle(card, x, y, 0, 0);
      particles.push(particle);
    };

    let throwInterval: Array<any> = [];
    for (let i = 0; i < 4; i++) {
      const finishElement = document.getElementById(`finish-${i}`);
      const { left, top } = finishElement!.getBoundingClientRect();
      throwInterval[i] = setInterval(function () {
        throwCard(left - canvasLeft, top - canvasTop);
      }, 500);
    }

    setInterval(function () {
      let i = 0,
        l = particles.length;
      while (i < l) {
        particles[i].update() ? i++ : l--;
      }
      // clearInterval(updateInterval)
    }, 1000 / 60);
  };

  /** @description Initializing the game board. */
  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** @description When `drop` is updated, it implies a card was moved. */
  useEffect(() => {
    if (drop?.card) moveCard(drop.from, drop.destination, drop.card);
  }, [drop]);

  return { board, dealHand, moveCard, resetGame };
};

export default useBoard;
