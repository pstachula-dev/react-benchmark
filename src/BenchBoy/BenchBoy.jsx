import react, { useEffect, useState,useRef } from 'react';
import { onNextFrame } from '../utils/helpers';

const TREE_DEPTH = 1000;
const RENDER_NUMBER = 10;

const LoveTress = ({ renderCounter = 15 }) => {    
    return renderCounter 
        ? <span>Recursive tree <LoveTress renderCounter={renderCounter - 1} /></span> 
        : null;
}

const Benchmark = () => {
    const t1 = performance.now();

    useEffect(() => {        
        onNextFrame(() => {
            const t2 = performance.now();
            const perfTime = t2 - t1;
            console.log('perf2', perfTime);
        })
    }, [])
    
    return <LoveTress renderCounter={TREE_DEPTH} />
}

const BenchBoy = ({ }) => {
    const [renderCounter, setRenderCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const onClickRender = () => {
        setIsLoading(true);
        setRenderCounter(0);
    }

    useEffect(() => {
        setTimeout(() => {
          if (renderCounter < RENDER_NUMBER - 1) {
            setRenderCounter(renderCounter + 1);
          } else {
            setIsLoading(false);
          }
        });
      }, [renderCounter]);
    
    return (
        <div>
            <button onClick={onClickRender}>Render</button>
            <Benchmark key={renderCounter} />
        </div>
    )
}

export default BenchBoy;