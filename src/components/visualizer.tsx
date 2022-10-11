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
  const [checked, setChecked] = useState<boolean>(false);
  const [, setRerender] = useState({});

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
                        checked={checked}
                        darkSide={viewData['darkSide']}
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
              color={!checked ? '#72737a' : viewData['darkSide'] ? 'aquamarine' : '#316896'}
              dashness={true}
              path="grid"
              curveness={0.1}
              strokeWidth={checked ? 2 : 1}
              showHead={false}
              // labels={
              //   checked
              //     ? {
              //         middle: <p className="tag">1 - n</p>,
              //       }
              //     : {}
              // }
              zIndex={-99}
            />
          );
        });
      })}
    </>
  );
}
