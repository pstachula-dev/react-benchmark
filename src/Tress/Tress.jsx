import { memo } from "react";
import { getNodes } from '../utils/helpers';

const Tress = ({ renderCounter, contentSize, ...rest }) => {    
    return renderCounter 
        ? <span>
            Tree {getNodes(contentSize)} <Tress renderCounter={renderCounter - 1} contentSize={contentSize} {...rest} />
        </span> 
        : null;
}

const TressMemo = memo(({ renderCounter, contentSize, ...rest }) => {  
    console.log('render');
    return renderCounter 
        ? <span>
            Tree {getNodes(contentSize)} <TressMemo renderCounter={renderCounter - 1} contentSize={contentSize} {...rest} />
        </span> 
        : null;
})

export { Tress, TressMemo };
