import styled from "styled-components";
import { InnyButton } from "../../style/style-guide";

const StyledBoard = styled.div`
  background-color: #cac6cb;
  margin-bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;

  div.force-center {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Felt = styled.div`
  ${InnyButton}
  min-width: 660px;
  background: green;
  margin: 4px;
`;

const DividerElement = styled.div`
  border-bottom: 1px solid #fff;
  border-top: 1px solid #808088;
  height: 1px;
`;

const TopSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Style = {
  DividerElement,
  StyledBoard,
  Felt,
  TopSection,
};

export default Style;
