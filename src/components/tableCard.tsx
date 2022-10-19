import { useXarrow } from 'react-xarrows';
import Draggable from 'react-draggable';

// styles
import classes from './tableCard.module.css';

import { LooseObject } from '../utils/generateViewData';

interface IProps {
  checked: boolean;
  darkSide: boolean;
  tableName: string;
  tableData: LooseObject;
  scale: number;
  onMove: () => void;
  onStop: () => void;
}

function TableCard({ checked, darkSide, tableName, tableData, scale, onMove, onStop }: IProps) {
  useXarrow();

  const cardStyles = {
    cardHeader: darkSide ? classes.cardHeaderDark : classes.cardHeaderLight,
    cardBody: darkSide ? classes.cardWrapperDark : classes.cardWrapperLight,
    cardColHighlight: darkSide ? classes.highlightDark : classes.highlightLight,
    cardColHighlightMore: darkSide ? classes.highlightMoreDark : classes.highlightMoreLight,
    cardRefCount: darkSide ? classes.refCountDark : classes.refCountLight,
  };

  return (
    <Draggable scale={scale} onDrag={onMove} onStop={onStop}>
      <div id={tableName} className={`${classes.cardWrapper} ${cardStyles['cardBody']} card`}>
        <h3 className={cardStyles['cardHeader']}>{tableName}</h3>

        {tableData['columns'].map((column: any, idx: number) => {
          const filterCheck = (tableData['referencedCols'] as string[]).filter((col: string) => col === column.columnName);
          const isReferenced = filterCheck.length !== 0;
          const referenceCount = filterCheck.length;

          // if this col is referenced or referer and the user checked Highlight toggle
          const shouldHighlight = (isReferenced || column.isReferring) && checked;

          return (
            <div key={column.columnName + idx}>
              <div className={`${classes.column} ${shouldHighlight && cardStyles['cardColHighlight']}`}>
                <p className={`${shouldHighlight && cardStyles['cardColHighlightMore']}`}>
                  {column.columnName}
                  {isReferenced && <span className={`${classes.refCount} ${cardStyles['cardRefCount']}`}>{'x' + referenceCount}</span>}
                </p>
                <p>{column.columnType}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Draggable>
  );
}

export default TableCard;
