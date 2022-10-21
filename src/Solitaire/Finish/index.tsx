import _ from "lodash";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import useAbsoluteHover from "../../hooks/useAbsoluteHover";
import { Card } from "../../primitives/Card";
import stringWithId from "../../state/atoms/stringWithId";
import Style from "./index.style";

const Stack = ({ stack, index }: { stack: Array<any>; index: any }) => {
  const [ref, isHovered]: any = useAbsoluteHover();
  const setDestination = useSetRecoilState(stringWithId("destination", null));

  useEffect(() => {
    if (isHovered) {
      setDestination(`finish-${index}`);
    } else {
      setDestination(null);
    }
  }, [isHovered]);

  return (
    <Style.Ace id={`finish-${index}`} ref={ref}>
      {stack.length > 0 && <Card className={stack.at(-1).classes.join(" ")} />}
    </Style.Ace>
  );
};

const Finish = ({ board }: any) => {
  return (
    <Style.Container>
      {_.map(board.finish, (stack, index) => {
        return <Stack key={`finish-${index}`} stack={stack} index={index} />;
      })}
    </Style.Container>
  );
};

export default Finish;
