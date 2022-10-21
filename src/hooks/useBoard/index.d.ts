export interface ICard {
  type: "s" | "h" | "d" | "c";
  number: number;
  facingUp: boolean;
  classes: string[];
  currentLocation: string;
}

export interface IBoard {
  types: ["c", "d", "h", "s"];
  colors: { c: string; d: string; h: string; s: string };
  finish: Array<Array<ICard>>;
  desk: Array<Array<ICard>>;
  pile: Array<ICard>;
  deal: Array<ICard>;
}
