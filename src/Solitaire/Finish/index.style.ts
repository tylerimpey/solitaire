import styled from "styled-components";
import { Placeholder } from "../../style/style-guide";

const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
`;

const Ace = styled.div`
  ${Placeholder}
`;

const Style = {
  Container,
  Ace,
};

export default Style;
