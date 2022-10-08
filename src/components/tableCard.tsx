import { useXarrow } from 'react-xarrows';
import Draggable from 'react-draggable';

// styles
import classes from './tableCard.module.css';

interface IProps {
  id: string;
}

function TableCard({ id }: IProps) {
  const updateXarrow = useXarrow();
  return (
    <Draggable bounds="parent" grid={[20, 20]} onDrag={updateXarrow} onStop={updateXarrow}>
      <div id={id} className={classes.cardWrapper}>
        <h3>TABLE NAME</h3>
      </div>
    </Draggable>
  );
}

export default TableCard;
