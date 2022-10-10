import { useContext } from 'react';

import Xarrow, { Xwrapper } from 'react-xarrows';

// components
import TableCard from './tableCard';
import ErrorView from './errorView';

import { CodeContext } from '../App';
import { generateViewData } from '../utils/generateViewData';

export default function Visualizer() {
  const { code } = useContext(CodeContext);

  const { viewData, errorMessage } = generateViewData(code);

  if (errorMessage != null) return <ErrorView message={errorMessage} />;
  console.log(viewData);

  return (
    <Xwrapper>
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          backgroundColor: 'red',
          position: 'relative',
        }}
      >
        <div className="visualizer-view">
          {Object.keys(viewData).map((tableName) => {
            return <TableCard key={tableName} tableName={tableName} tableData={viewData[tableName]} />;
          })}
        </div>
        {Object.keys(viewData).map((tableName) => {
          return viewData[tableName]['refs'].map((referencedTableName: string, idx: number) => {
            return (
              <Xarrow
                key={tableName + idx}
                start={referencedTableName}
                end={tableName}
                color="grey"
                dashness={true}
                path="grid"
                curveness={0.1}
                strokeWidth={2}
                showHead={false}
              />
            );
          });
        })}
      </div>
    </Xwrapper>
  );
}
