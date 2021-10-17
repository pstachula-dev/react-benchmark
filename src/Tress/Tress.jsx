import { memo } from "react";
import { getNodes } from '../utils/helpers';

const Tress = ({ renderCounter, contentSize = 0 }) => {    
    return renderCounter 
        ? <span>Tree {getNodes(contentSize)} {renderCounter} <Tress renderCounter={renderCounter - 1} /></span> 
        : null;
}

const TressMemo = memo(({ renderCounter, contentSize = 0 }) => {    
    return renderCounter 
        ? <span>Tree {getNodes(contentSize)} <TressMemo renderCounter={renderCounter - 1} /></span> 
        : null;
})

export { Tress, TressMemo };
