import { createContext, useState } from 'react';

import Split from 'react-split';

// components
import Navbar from './components/navbar';
import Editor from './components/editor';
import Visualizer from './components/visualizer';

export const CodeContext = createContext<any>(null);

function App() {
  const [collapsedIdx, setCollapsedIdx] = useState<number>(1);

  const [viewData, setViewData] = useState({
    successfulViewData: {},
    darkSide: false,
  });

  console.log('App rebuilding');

  return (
    <div className="wrapper">
      <CodeContext.Provider value={{ viewData, setViewData }}>
        <Navbar />
        <Split
          style={{ display: 'flex' }}
          sizes={[25, 75]}
          minSize={-1}
          expandToMin={false}
          collapsed={collapsedIdx}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
        >
          <div className="editor-view">
            <div
              className="editor-view-btn"
              onClick={() => {
                if (collapsedIdx === 0) setCollapsedIdx(1);
                else setCollapsedIdx(0);
              }}
            >
              {collapsedIdx == 1 ? '<' : '>'}
            </div>
            <Editor />
          </div>
          <div>
            <Visualizer />
          </div>
        </Split>
      </CodeContext.Provider>
    </div>
  );
}

export default App;
