import Xarrow, { useXarrow } from 'react-xarrows';
import Draggable from 'react-draggable';

// styles
import classes from './tableCard.module.css';
import { LooseObject } from '../utils/generateViewData';

interface IProps {
  tableName: string;
  tableData: LooseObject;
}

function TableCard({ tableName, tableData }: IProps) {
  const updateXarrow = useXarrow();
  return (
    <Draggable bounds="parent" onDrag={updateXarrow} onStop={updateXarrow}>
      <div id={tableName} className={classes.cardWrapper}>
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
