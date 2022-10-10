import { useContext, useState } from 'react';

import Xarrow, { Xwrapper } from 'react-xarrows';
import { TransformWrapper, TransformComponent } from '@myonim/react-zoom-pan-pinch';

// components
import TableCard from './tableCard';
import ErrorView from './errorView';

import { CodeContext } from '../App';

// styles
import classes from './visualizer.module.css';

export default function Visualizer() {
  const [isMoveable, setIsMoveable] = useState<boolean>(false);

  const { viewData } = useContext(CodeContext);

  const onMove = () => {
    setIsMoveable(true);
  };

  const onStop = () => {
    setIsMoveable(false);
  };

  const successfulViewData = viewData.successfulViewData;
  const errorMessage = viewData.errorMessage;

  return (
    <>
      <TransformWrapper initialScale={1} minScale={0.5} disabled={isMoveable} centerOnInit={false}>
        {({ zoomIn, zoomOut, state }) => (
          <>
            <div className={classes.hoveringMenu}>{state.scale}</div>
            <TransformComponent>
              <Xwrapper>
                <div className={classes.visualizerView}>
                  {Object.keys(successfulViewData).map((tableName) => {
                    return (
                      <TableCard
                        key={tableName}
                        tableName={tableName}
                        tableData={successfulViewData[tableName]}
                        scale={state.scale}
                        onMove={onMove}
                        onStop={onStop}
                      />
                    );
                  })}
                </div>
              </Xwrapper>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </>
  );
  // return (
  //   <Xwrapper>
  //     <div
  //       style={{
  //         height: '100%',
  //         width: '100%',
  //         display: 'flex',
  //         flexWrap: 'wrap',
  //         gap: '20px',
  //         backgroundColor: 'red',
  //         position: 'relative',
  //       }}
  //     >
  //       {/* show error overlay while preserving view structure */}
  //       {errorMessage && <ErrorView message={errorMessage} />}

  //       <div className="visualizer-view">
  //         {Object.keys(successfulViewData).map((tableName) => {
  //           return <TableCard key={tableName} tableName={tableName} tableData={successfulViewData[tableName]} />;
  //         })}
  //       </div>
  //       {Object.keys(successfulViewData).map((tableName) => {
  //         return successfulViewData[tableName]['refs'].map((referencedTableName: string, idx: number) => {
  //           return (
  //             <Xarrow
  //               key={tableName + idx}
  //               start={referencedTableName}
  //               end={tableName}
  //               color="grey"
  //               dashness={true}
  //               path="grid"
  //               curveness={0.1}
  //               strokeWidth={2}
  //               showHead={false}
  //             />
  //           );
  //         });
  //       })}
  //     </div>
  //   </Xwrapper>
  // );
}
