import { createContext, useState } from 'react';

import Split from 'react-split';

// components
import Navbar from './components/navbar';
import Editor from './components/editor';
import Visualizer from './components/visualizer';

export const CodeContext = createContext<any>(null);

function App() {
  const [viewData, setViewData] = useState({
    successfulViewData: {},
  });

  console.log('App rebuilding');

  return (
    <div className="wrapper">
      <Navbar />
      <CodeContext.Provider value={{ viewData, setViewData }}>
        <Split
          style={{ display: 'flex' }}
          sizes={[40, 60]}
          minSize={450}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
        >
          <div className="editor-view">
            <Editor />
          </div>
          <Visualizer />
        </Split>
      </CodeContext.Provider>
    </div>
  );
}

export default App;
