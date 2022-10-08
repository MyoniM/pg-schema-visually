import React from 'react';

import Xarrow, { Xwrapper } from 'react-xarrows';

// components
import TableCard from './tableCard';

export default function Visualizer() {
  return (
    <Xwrapper>
      <TableCard id={'elem1'} />
      <TableCard id={'elem2'} />
      <TableCard id={'elem3'} />
      <Xarrow start={'elem1'} end="elem2" color="aquamarine" dashness={true} path="grid" strokeWidth={3} showHead={false} />
      <Xarrow start={'elem1'} end="elem3" color="aquamarine" dashness={true} path="grid" strokeWidth={3} showHead={false} />
    </Xwrapper>
  );
}
