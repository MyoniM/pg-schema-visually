import { useContext, useState } from 'react';

import Xarrow, { Xwrapper } from 'react-xarrows';
import { TransformWrapper, TransformComponent } from '@myonim/react-zoom-pan-pinch';

// components
import TableCard from './tableCard';
import ErrorView from './errorView';
import ToggleSwitch from './toggleSwitch';

import { CodeContext } from '../App';

// styles
import classes from './visualizer.module.css';

export default function Visualizer() {
  const [isMoveable, setIsMoveable] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(true);
  const [rerender, setRerender] = useState({});

  const { viewData } = useContext(CodeContext);

  const onMove = () => {
    setIsMoveable(true);
    forceRerender();
  };

  const onStop = () => {
    setIsMoveable(false);
    forceRerender();
  };

  const forceRerender = () => setRerender({});

  const successfulViewData = viewData.successfulViewData;
  const errorMessage = viewData.errorMessage;

  return (
    <>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        disabled={isMoveable}
        doubleClick={{ disabled: true }}
        limitToBounds={false}
        onPanning={forceRerender}
        onWheel={forceRerender}
      >
        {({ state }) => (
          <>
            {/* show error overlay while preserving view structure */}
            {errorMessage && <ErrorView message={errorMessage} />}

            <div className={classes.hoveringMenu}>
              <p>
                Zoom <span>x{state.scale.toPrecision(1)}</span>
              </p>

              <div className={classes.highlight}>
                Highlight
                <ToggleSwitch checked={checked} onChange={setChecked} />
              </div>
            </div>
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
      {Object.keys(successfulViewData).map((tableName) => {
        return successfulViewData[tableName]['refs'].map((referencedTableName: string, idx: number) => {
          return (
            <Xarrow
              key={tableName + idx}
              start={referencedTableName}
              end={tableName}
              color={!checked ? 'grey' : 'aquamarine'}
              dashness={true}
              path="grid"
              curveness={0.1}
              strokeWidth={2}
              showHead={false}
              zIndex={-99}
            />
          );
        });
      })}
    </>
  );
}
