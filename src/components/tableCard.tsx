import Xarrow, { useXarrow } from 'react-xarrows';
import Draggable from 'react-draggable';

// styles
import classes from './tableCard.module.css';

import { LooseObject } from '../utils/generateViewData';

interface IProps {
  tableName: string;
  tableData: LooseObject;
  scale: number;
  onMove: () => void;
  onStop: () => void;
}

function TableCard({ tableName, tableData, scale, onMove, onStop }: IProps) {
  const _ = useXarrow();
  return (
    <Draggable scale={scale} onDrag={onMove} onStop={onStop}>
      <div id={tableName} className={`${classes.cardWrapper} card`}>
        <h3>{tableName}</h3>
        {tableData['columns'].map((column: string[], idx: number) => {
          return (
            <div key={column[0] + idx}>
              <div className={`${classes.column} ${column.length > 2 && classes.fk}`}>
                <p>{column[0]}</p>
                <p>{column[1]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Draggable>
  );
}

export default TableCard;
