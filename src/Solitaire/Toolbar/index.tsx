import { useState } from "react";
import Style from "./index.style";

const View = (props: any) => {
  return (
    <Style.Button
      onClick={() => props.setSelected(!props.selected)}
      className={props.selected && props.lastHovered === "view" ? "active" : ""}
      onMouseEnter={() => props.setLastHovered("view")}
    >
      <p className="menu">Game</p>
      <Style.Menu>
        <Style.LineItem onClick={() => props.handleChangeLevel("beginner")}>
          Beginner
        </Style.LineItem>
        <Style.LineItem onClick={() => props.handleChangeLevel("intermediate")}>
          Intermediate
        </Style.LineItem>
        <Style.LineItem onClick={() => props.handleChangeLevel("expert")}>
          Expert
        </Style.LineItem>
        <Style.Separator />
        <Style.LineItem onClick={props.freshBoard}>New Game</Style.LineItem>
      </Style.Menu>
    </Style.Button>
  );
};

const Help = (props: any) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <Style.Button
      onClick={() => props.setSelected(!props.selected)}
      className={props.selected && props.lastHovered === "help" ? "active" : ""}
      onMouseEnter={() => props.setLastHovered("help")}
    >
      <p className="menu">Help</p>
      <Style.Menu>
        <Style.LineItem
          onMouseEnter={() => setRevealed(true)}
          onMouseLeave={() => setRevealed(false)}
        >
          About
        </Style.LineItem>
        <Style.Separator />
        <Style.LineItem className="inactive">Help Center</Style.LineItem>
        <Style.LineItem className="inactive">Support</Style.LineItem>
        {revealed && (
          <Style.AboutMenu>
            <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
              How to Play
            </p>
            <p>
              Kegsweeper is a Minesweeper adaptation, emulating the original
              algorithms that made popularized the original game.
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Left click</span> to test
              your luck. If you hit a Keg, you lose!
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Right click</span> to flag
              Kegs. Try to flag all of the kegs and reveal the rest of the tiles
              - that's how you win!
            </p>
          </Style.AboutMenu>
        )}
      </Style.Menu>
    </Style.Button>
  );
};

const Toolbar = ({ handleChangeLevel, freshBoard }: any) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [lastHovered, setLastHovered] = useState<string | null>(null);

  const props = {
    selected,
    setSelected,
    lastHovered,
    setLastHovered,
    handleChangeLevel,
    freshBoard,
  };

  return (
    <Style.ToolbarElement>
      <View {...props} />
      <Help {...props} />
    </Style.ToolbarElement>
  );
};

export default Toolbar;
