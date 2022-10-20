import { css } from "styled-components";

export const WindowsGreyBackground = "";
export const WindowsWhiteBorder = "";
export const WindowsBlackBorder = "";
export const WindowsGreyBorder = "";
export const WindowsGreyText = "";

export const Divider = css`
  content: "";
  width: 3px;
  background: rgb(202, 198, 203);
  box-shadow: rgb(128 128 136) -1px -1px 0px inset,
    rgb(255 255 255) 1px 1px 0px inset;
`;

export const InnyButton = css`
  background-color: rgb(202, 198, 203);
  background-image: linear-gradient(
      45deg,
      rgb(239, 238, 240) 25%,
      transparent 25%,
      transparent 75%,
      rgb(239, 238, 240) 75%,
      rgb(239, 238, 240)
    ),
    linear-gradient(
      45deg,
      rgb(239, 238, 240) 25%,
      transparent 25%,
      transparent 75%,
      rgb(239, 238, 240) 75%,
      rgb(239, 238, 240)
    );
  background-size: 2px 2px;
  background-position: 0px 0px, 1px 1px;

  box-shadow: white -1px -1px 0px 0px inset, rgb(70 65 71) 1px 1px 0px 0px inset,
    rgb(222 220 222) -2px -2px 0px 0px inset,
    rgb(202 198 203) 2px 2px 0px 0px inset;
`;

export const OutyButton = css`
  background: rgb(202, 198, 203);
  box-shadow: rgb(70 65 71) -1px -1px 0px 0px inset, white 1px 1px 0px 0px inset,
    rgb(160 153 161) -2px -2px 0px 0px inset,
    rgb(222 220 222) 2px 2px 0px 0px inset;
`;

export const CustomScrollbar = css`
  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-track {
    background-image: linear-gradient(
        45deg,
        #dedcde 25%,
        transparent 0,
        transparent 75%,
        #dedcde 0,
        #dedcde
      ),
      linear-gradient(
        45deg,
        #dedcde 25%,
        transparent 0,
        transparent 75%,
        #dedcde 0,
        #dedcde
      );
    background-position: 0 0, -1px -1px;
    background-size: 2px 2px;
    image-rendering: pixelated;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cac6cb;
    border-color: #cac6cb #464147 #464147 #cac6cb;
    border-style: solid;
    border-width: 1px;
    box-shadow: inset 1px 1px 0 0 #fff, inset -1px -1px 0 0 #a099a1;
    height: 16px;
    width: 16px;
    z-index: 1;
  }

  ::-webkit-scrollbar-thumb:hover {
  }

  ::-webkit-scrollbar-button {
    background-color: #cac6cb;
    background-position: 50%;
    background-repeat: no-repeat;
    border-color: #cac6cb #464147 #464147 #cac6cb;
    border-style: solid;
    border-width: 1px;
    box-shadow: inset 1px 1px 0 0 #fff, inset -1px -1px 0 0 #a099a1;
    image-rendering: pixelated;
    height: 16px;
    width: 16px;
  }

  ::-webkit-scrollbar-button:vertical:start:increment,
  ::-webkit-scrollbar-button:vertical:end:decrement,
  ::-webkit-scrollbar-button:horizontal:start:increment,
  ::-webkit-scrollbar-button:horizontal:end:decrement {
    display: none;
  }

  ::-webkit-scrollbar-button:single-button:vertical:decrement {
    background-image: url(https://pr0xy.imgix.net/friday-beers/website/test-triangle.png);
    background-size: 40% 30%;
    background-position: center 5px;
    background-repeat: no-repeat;
  }

  ::-webkit-scrollbar-button:single-button:vertical:increment {
    background-image: url(https://pr0xy.imgix.net/friday-beers/website/test-triangle.png?flip=v);
    background-size: 40% 30%;
    background-position: center 5.5px;
  }
`;

export const Placeholder = css`
  min-width: 71px;
  min-height: 96px;
  position: relative;

  &:before {
    z-index: 0;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;

    width: 71px;
    height: 95px;

    border: 1px dotted rgba(0, 0, 0, 0.25);
    border-radius: 4px;

    background-size: 4px 4px;
    background-image: linear-gradient(
        45deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 44.9%,
        rgba(0, 0, 0, 0.25) 45%,
        rgba(0, 0, 0, 0.25) 55%,
        rgba(0, 0, 0, 0) 55.1%,
        rgba(0, 0, 0, 0)
      ),
      linear-gradient(
        -45deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 44.9%,
        rgba(0, 0, 0, 0.25) 45%,
        rgba(0, 0, 0, 0.25) 55%,
        rgba(0, 0, 0, 0) 55.1%,
        rgba(0, 0, 0, 0)
      );
  }
`;
