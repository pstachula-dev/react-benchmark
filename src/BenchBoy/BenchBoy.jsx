import react, { useEffect, useState, useRef, Profiler } from 'react';
import { avg, results, benchmarkName, sum, getRandomArgs } from '../utils/helpers';
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
    const [contentSize, setContentSize] = useState(0);
    const [argumentsSize, setArgumentsSize] = useState(0);

    const onClickRender = () => {
        Object.keys(results).forEach(key => results[key] = []);
        setIsLoading(true)
        setRenderNodes(true)
        setRenderCounter(0);
    };

    useEffect(() => {
        if (!isLoading) return
        
        setTimeout(() => {
          if (renderCounter < renderNumber - 1) {
            setRenderCounter(renderCounter + 1);
          } else {
            console.log(results);
            setIsLoading(false);
          }
        }, 10);
    }, [renderCounter, isLoading, renderNumber]);

    const onTreeDepthChange = ({ target }) => setTreeDepth(parseInt(target.value));
    const onRenderNumberChange = ({ target }) => setRenderNumber(parseInt(target.value));
    const onSetContentSize = ({ target }) => setContentSize(parseInt(target.value));
    const onArgumentsNumberChange = ({ target }) => setArgumentsSize(parseInt(target.value));
    console.log(results);
    
    return <>
        <h2>Settings</h2>

        <div className="settings">
            <div>
                <label>Tree depth: {treeDepth}</label>
                <input type="range" value={treeDepth} step="10" max="1000" onChange={onTreeDepthChange} />
            </div>
            <div>
                <label>Renders : {renderNumber}</label>
                <input type="range" value={renderNumber} step="10" max="1000" onChange={onRenderNumberChange} />
            </div>
            <div>
                <label>Node content : {contentSize}</label>
                <input type="range" value={contentSize} step="1" max="10" onChange={onSetContentSize} />
            </div>
            <div>
                <label>Arguments size : {argumentsSize}</label>
                <input type="range" value={argumentsSize} step="1" max="100" onChange={onArgumentsNumberChange} />
            </div>
        </div>

        <p>Loading: {isLoading ? '⏳' : '✔️'}</p>
        <button onClick={onClickRender}>Render x{renderNumber}</button>
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
                <Tress renderCounter={treeDepth} contentSize={contentSize} {...getRandomArgs(argumentsSize)} />
            </Profiler>                
            <Profiler id={benchmarkName.bigTreeMemo} onRender={onRenderCallback}>
                <TressMemo renderCounter={treeDepth} contentSize={contentSize} {...getRandomArgs(argumentsSize)} />
            </Profiler>                
        </div>}
    </>;
}

export default BenchUI;