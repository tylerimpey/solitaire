import { Placeholder } from "../../style/style-guide";
import styled from "styled-components";
import { Card } from "../../primitives/Card";

const Container = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 20px;
  min-height: 400px;

  .front > .front {
    top: 15px;
  }

  .back {
    > .front,
    > .back {
      top: 8px;
    }
  }
`;

const Stack = styled.div`
  ${Placeholder}

  ${Card} {
    display: inline-block;
  }
`;

const Style = {
  Container,
  Stack,
};

export default Style;
