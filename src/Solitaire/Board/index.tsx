import Style from "./index.style";
import Toolbar from "../Toolbar";
import Deck from "../Deck";
import useBoard from "../../hooks/useBoard";
import Desk from "../Desk";
import Finish from "../Finish";

function Solitaire() {
  const { board, dealHand, resetGame } = useBoard();

  return (
    <Style.StyledBoard>
      <Toolbar resetGame={resetGame} />
      <Style.DividerElement />
      <Style.Felt id="solitaire-board">
        <Style.TopSection>
          <Deck board={board} dealHand={dealHand} />
          <Finish board={board} />
        </Style.TopSection>
        <Desk board={board} />
      </Style.Felt>
    </Style.StyledBoard>
  );
}

export default Solitaire;
