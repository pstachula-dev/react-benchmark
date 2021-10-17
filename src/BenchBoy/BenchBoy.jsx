import react, { useEffect, useState, useRef, Profiler } from 'react';
import { avg, results, benchmarkName, sum } from '../utils/helpers';
import { Tress, TressMemo } from '../Tress/Tress';

const onRenderCallback = (
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
) => {
    results[id].push(actualDuration);
}

const BenchUI = () => {
    const [renderCounter, setRenderCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [renderNodes, setRenderNodes] = useState(false);
    const perfTimeEndRef = useRef(0);

    // Settings
    const [treeDepth, setTreeDepth] = useState(100);
    const [renderNumber, setRenderNumber] = useState(10);

    const onClickRender = () => {
        Object.keys(results).forEach(key => results[key] = []);
        setIsLoading(true)
        setRenderNodes(true)
    };

    useEffect(() => {
        if (isLoading) {
            setRenderCounter(0);
            perfTimeEndRef.current = performance.now();
            
        }
    }, [isLoading]);

    useEffect(() => {
        if (!isLoading) return
        
        setTimeout(() => {
          if (renderCounter < renderNumber - 1) {
            setRenderCounter(renderCounter + 1);
          } else {
            console.log(results);
            setIsLoading(false);
          }
        });
    }, [renderCounter, isLoading, renderNumber]);

    const onTreeDepthChange = ({ target }) => setTreeDepth(target.value);
    const onRenderNumberChange = ({ target }) => setRenderNumber(target.value);
    
    return <>
        <h2>Settings</h2>

        <div>
            <label>Tree depth: {treeDepth}</label>
            <input type="range" step="10" max="1000" onChange={onTreeDepthChange} />
        </div>
        <div>
            <label>Renders : {renderNumber}</label>
            <input type="range" step="10" max="1000" onChange={onRenderNumberChange} />
        </div>

        <p>Loading: {isLoading ? '⏳' : '✔️'}</p>
        <button onClick={onClickRender}>Render</button>
        <br />
        <table>
            <thead>
                <tr>
                    <th>Name</th><th>Result</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(results).map(key => {
                    return <tr key={key}><td>{key}</td><td>{sum(results[key])}ms</td></tr>
                })}                
            </tbody>
        </table>    

        {renderNodes && <div key={isLoading}>
            <Profiler id={benchmarkName.bigTree} onRender={onRenderCallback}>
                <Tress renderCounter={treeDepth} />
            </Profiler>                
            <Profiler id={benchmarkName.bigTreeMemo} onRender={onRenderCallback}>
                <TressMemo renderCounter={treeDepth} />
            </Profiler>                
        </div>}
    </>;
}

export default BenchUI;