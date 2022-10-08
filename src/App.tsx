import Split from 'react-split';

// components
import Navbar from './components/navbar';
import Editor from './components/editor';
import Visualizer from './components/visualizer';

function App() {
  return (
    <div className="wrapper">
      <Navbar />
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
        <div className="visualizer-view">
          <Visualizer />
        </div>
      </Split>
    </div>
  );
}

export default App;
