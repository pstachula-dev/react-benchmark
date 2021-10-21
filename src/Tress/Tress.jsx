import { memo } from "react";
import { getNodes } from "../utils/helpers";

const Tress = ({ renderCounter, contentSize, children, ...rest }) => {
  return renderCounter ? (
    <span>
      Tree {getNodes(contentSize)} {children}
      <Tress
        renderCounter={renderCounter - 1}
        contentSize={contentSize}
        children={children}
        {...rest}
      />
    </span>
  ) : null;
};

const TressMemo = memo(({ renderCounter, contentSize, children, ...rest }) => {
  return renderCounter ? (
    <span>
      Memo {getNodes(contentSize)} {children}
      <TressMemo
        renderCounter={renderCounter - 1}
        contentSize={contentSize}
        children={children}
        {...rest}
      />
    </span>
  ) : null;
});

export { Tress, TressMemo };
