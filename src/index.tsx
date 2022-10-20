import { createRoot } from "react-dom/client";
import Solitaire from "./Solitaire/Board";
import { RecoilRoot } from "recoil";

import "./style/config.scss";

const root = createRoot(document.getElementById("root")!);

root.render(
  <RecoilRoot>
    <Solitaire />
  </RecoilRoot>
);
