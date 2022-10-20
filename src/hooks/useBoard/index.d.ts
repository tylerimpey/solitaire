export interface ICard {
  type: "s" | "h" | "d" | "c";
  number: number;
  facingUp: boolean;
  classes: string[];
  currentLocation: string;
}

export interface IPile {
  cards: Array<ICard>;
}

export interface IBoard {
  types: ["c", "d", "h", "s"];
  colors: { c: string; d: string; h: string; s: string };
  finish: Array<IPile>;
  desk: Array<IPile>;
  pile: Array<ICard>;
  deal: Array<ICard>;
}
