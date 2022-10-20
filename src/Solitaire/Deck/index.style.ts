import styled from "styled-components";
import { Card } from "../../primitives/Card";
import { Placeholder } from "../../style/style-guide";

const Container = styled.div`
  padding: 20px;

  display: flex;
  gap: 20px;
`;

const Pile = styled.div`
  width: 71px;
  height: 96px;
  border: 1px dotted;
  border-radius: 4px;
  cursor: pointer;
  background-image: radial-gradient(
    green 30%,
    white 30.1%,
    white 40%,
    green 40.1%,
    green 100%
  );
  background-size: 90px 90px;
  background-position: center;
  background-repeat: no-repeat;

  ${Card} + ${Card} {
    margin-top: 4px;
    margin-left: 2px;

    + ${Card} {
      margin-left: 4px;
      margin-top: 8px;
    }
  }
`;

const Deal = styled.div`
  ${Placeholder}

  ${Card}:not(:last-child) {
    pointer-events: none;
  }

  ${Card}:last-child {
    left: 20px;
  }

  ${Card}:last-child {
    left: 20px;
  }

  ${Card}:nth-last-child(2) {
    left: 10px;
  }

  ${Card}:first-child {
    left: 0;
  }

  ${Card}:first-child + ${Card}:last-child {
    left: 10px;
  }
`;

const Style = {
  Container,
  Pile,
  Deal,
};

export default Style;
