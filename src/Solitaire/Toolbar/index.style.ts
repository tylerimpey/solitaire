import styled from "styled-components";

const ToolbarElement = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 24px;
  width: 100%;

  p.menu {
    font-family: Verdana, Helvetica, sans-serif !important;
    padding: 0 6px;
    font-weight: 200;
    color: black;
    font-size: 0.75rem;
    margin: 0;
  }
`;

const Menu = styled.div`
  min-width: 100px;

  position: absolute;
  z-index: 100;

  display: none;
  transform: translateX(4px);

  padding: 2px;
`;

const Button = styled.div`
  height: 24px;
  display: flex;
  align-items: center;

  &:hover {
    color: white;
    background: #266ebb;
    cursor: pointer;

    p.menu {
      color: white;
    }
  }

  &.active {
    ${Menu} {
      display: block;
    }
  }
`;

const LineItem = styled.p`
  margin: 0;
  font-family: Verdana, Helvetica, sans-serif !important;
  padding: 1px 18px;
  font-weight: 200;
  color: black;
  font-size: 11px;
  line-height: 1.25rem;
  margin: 0;

  &:not(.inactive):hover {
    color: white;
    background: #266ebb;
    cursor: pointer;
  }

  &.inactive {
    color: #a099a1;
    text-shadow: 1px 1px 0 white;
  }
`;

const Separator = styled.div`
  margin: 2px 3px;
  height: 1px;
  border-top: 1px solid rgb(128, 128, 136);
  border-bottom: 1px solid rgb(255, 255, 255);
`;

// ${OutyButton};
const AboutMenu = styled.div`
  padding: 2px 3px;

  width: 200px;

  position: absolute;
  z-index: 100;

  transform: translateY(4px) translateX(100%);

  right: 0;
  top: 0;

  p {
    font-family: Verdana, Helvetica, sans-serif !important;
    padding: 0 6px;
    font-weight: 200;
    color: black;
    font-size: 0.65rem;
    line-height: 1rem;
    margin: 0;
    margin-bottom: 5px;
  }
`;

const Style = {
  ToolbarElement,
  Button,
  Menu,
  LineItem,
  Separator,
  AboutMenu,
};

export default Style;
