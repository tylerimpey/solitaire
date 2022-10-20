import { atom } from "recoil";
import { memoize } from "lodash";

const objectWithId = memoize((id, defaultValue = {}) =>
  atom({
    key: `${id}`,
    default: defaultValue,
  })
);

export default objectWithId;
