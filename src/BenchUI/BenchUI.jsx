import react, { useEffect, useState, Profiler } from "react";
import { results, benchmarkName, sum, getRandomArgs } from "../utils/helpers";
import { Tress, TressMemo } from "../Tress/Tress";

const onRenderCallback = (
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime // when React committed this update
) => {
  results[id].push(actualDuration);
};

const BenchUI = () => {
  const [renderCounter, setRenderCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [renderNodes, setRenderNodes] = useState(false);

  // Settings
  const [treeDepth, setTreeDepth] = useState(1);
  const [renderNumber, setRenderNumber] = useState(1);
  const [contentSize, setContentSize] = useState(0);
  const [argumentsSize, setArgumentsSize] = useState(0);
  const [deepCompare, setDeepCompare] = useState(false);

  const onClickRender = () => {
    Object.keys(results).forEach((key) => (results[key] = []));
    setIsLoading(true);
    setRenderNodes(true);
    setRenderCounter(0);
  };

  useEffect(() => {
    if (!isLoading) return;

    setTimeout(() => {
      if (renderCounter < renderNumber - 1) {
        setRenderCounter(renderCounter + 1);
      } else {
        setIsLoading(false);
      }
    });
  }, [renderCounter, isLoading, renderNumber]);

  const onTreeDepthChange = ({ target }) =>
    setTreeDepth(parseInt(target.value, 10));
  const onRenderNumberChange = ({ target }) =>
    setRenderNumber(parseInt(target.value, 10));
  const onSetContentSize = ({ target }) =>
    setContentSize(parseInt(target.value, 10));
  const onArgumentsNumberChange = ({ target }) =>
    setArgumentsSize(parseInt(target.value, 10));
  const onDeepCompareChange = ({ target }) => setDeepCompare(!deepCompare);

  return (
    <>
      <h2>Settings</h2>

      <div className="settings">
        <div>
          <label>Tree depth: {treeDepth}</label>
          <input
            type="range"
            value={treeDepth}
            step="1"
            max="1000"
            onChange={onTreeDepthChange}
          />
        </div>
        <div>
          <label>Render size: {renderNumber}</label>
          <input
            type="range"
            value={renderNumber}
            step="1"
            max="100"
            onChange={onRenderNumberChange}
          />
        </div>
        <div>
          <label>Content size : {contentSize}</label>
          <input
            type="range"
            value={contentSize}
            step="1"
            max="10"
            onChange={onSetContentSize}
          />
        </div>
        <div>
          <label>Arguments size : {argumentsSize}</label>
          <input
            type="range"
            value={argumentsSize}
            step="1"
            max="1000"
            onChange={onArgumentsNumberChange}
          />
        </div>
        <div>
          <label>Compare deep</label>
          <input
            type="radio"
            checked={deepCompare === true}
            onClick={onDeepCompareChange}
          />
        </div>
      </div>

      <hr />

      <p>
        <button onClick={onClickRender}>Render x{renderNumber}</button>
        <span> Loading: {isLoading ? "⏳" : "✔️"}</span>
      </p>

      <hr />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(results).map((key) => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{sum(results[key])}ms</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <hr />

      {renderNodes && (
        <div key={isLoading}>
          <Profiler id={benchmarkName.bigTree} onRender={onRenderCallback}>
            <Tress
              renderCounter={treeDepth}
              contentSize={contentSize}
              {...getRandomArgs(argumentsSize, deepCompare)}
            />
          </Profiler>
          <Profiler id={benchmarkName.bigTreeMemo} onRender={onRenderCallback}>
            <TressMemo
              renderCounter={treeDepth}
              contentSize={contentSize}
              {...getRandomArgs(argumentsSize, deepCompare)}
            ></TressMemo>
          </Profiler>
        </div>
      )}
    </>
  );
};

export default BenchUI;
