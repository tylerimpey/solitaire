import { atom } from "recoil";
import { memoize } from "lodash";

const booleanWithId = memoize((id, defaultValue = false) =>
  atom({
    key: `${id}`,
    default: defaultValue,
  })
);

export default booleanWithId;
