export interface LooseObject {
  [key: string]: any;
}

export const generateViewData = (code: string): { viewData: any; errorMessage: any } => {
  try {
    code = code.trim();
    if (code.length === 0) return { viewData: {}, errorMessage: null };

    const tables = code.split('TABLE');

    const viewData: LooseObject = {};

    tables.forEach((table) => {
      table = table.trim();
      if (table.length === 0) return;

      const record = table.split('{');
      const tableName = record[0].trim();
      if (tableName == undefined) throw new SyntaxError(`Invalid Syntax`);

      // add only if tableName not in viewData
      if (!Object.hasOwn(viewData, tableName)) {
        viewData[tableName] = { columns: [], refs: [], referencedCols: [] };
      }

      // get every args passed to Table
      const args = record[1].split('\n');
      args.forEach((arg) => {
        // return if arg is not valid
        arg = arg.trim();
        if (arg.length === 0 || arg === '}') return;

        // individual arg props
        const props = arg.split(/\s+/);
        // if there is a third param and it is not an array
        // that means the user wrote another table column on the same line so throw an Error
        if (props.length > 2) {
          if (props[2][0] !== '[') {
            throw new SyntaxError(
              `"expected '[' but found ${props[2]}"
                    \n\n Hints: \n Did you forget to add table columns on a new line? \n If you want to add more properties for a column, write like '[more props]'`
            );
          }
          // if user wrote a valid dependency array
          // the user might have wrote a dep arr with to many spaces
          // if the last prop ends up being a ']' we take the prop before it else
          // we take the last prop
          // we then split with '.' and take the left elem(referenced table name)
          let referencedTable: string;
          let referencedCol: string;
          const lastPropIdx = props.length - 1;

          if (props[lastPropIdx] === ']') {
            const referenceInfo = getReferenceInfo(props[lastPropIdx - 1]);
            referencedTable = referenceInfo[0];
            referencedCol = referenceInfo[1];
          } else {
            const referenceInfo = getReferenceInfo(props[lastPropIdx]);
            referencedTable = referenceInfo[0];
            referencedCol = referenceInfo[1];
          }

          // push the referenced table name to the current table's ref array
          viewData[tableName]['refs'].push(referencedTable);
          // push the referenced column name to the referenced table's referencedCols array
          // check first if the referenced table has already been parsed
          // if not, create a new record
          if (!Object.hasOwn(viewData, referencedTable)) {
            viewData[referencedTable] = { columns: [], refs: [], referencedCols: [] };
          }
          viewData[referencedTable]['referencedCols'].push(referencedCol);
        }

        viewData[tableName]['columns'].push(props);
      });
    });

    return { viewData, errorMessage: null };
  } catch (error) {
    if (error instanceof SyntaxError) return { viewData: null, errorMessage: error.message };
    return { viewData: null, errorMessage: 'Invalid Syntax' };
  }
};

const getReferenceInfo = (prop: string) => {
  const dotIdx = prop.indexOf('.');
  if (dotIdx === -1) {
    throw new SyntaxError(
      `"expected '.(column name)' but found ']' or ' ' " \n\n Hints: \n Did you forget to add '.(column name)' after specifying table name?`
    );
  }
  if (dotIdx === 0) {
    throw new SyntaxError(
      `"expected '.(column name)' but found ' ' " \n\n Hints: \n Did you forget to add '.(column name)' after specifying table name?`
    );
  }
  const tableNameSplit = prop.split('.')[0];
  let colSplit = prop.split('.')[1];

  // colSplit might have a succeeding ']' if there is no space after table.col
  const lastIdx = colSplit.length - 1;
  if (colSplit[lastIdx] === ']') colSplit = colSplit.substring(0, lastIdx);

  // get 'ref:' if it exists and throw error
  const refIdx = tableNameSplit.indexOf('ref:');

  if (refIdx !== -1) {
    throw new SyntaxError(`"expected ' ' but found '${tableNameSplit[refIdx + 4]}' " \n\n Hints: \n Did you forget to add ' ' after 'ref:'?`);
  }

  // return the referenced table name, the referenced column
  return [tableNameSplit, colSplit];
};
