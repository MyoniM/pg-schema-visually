export interface LooseObject {
  [key: string]: any;
}

export const generateViewData = (ast: any[]) => {
  const viewData: LooseObject = {};

  ast.forEach((node) => {
    // the node can be of type 'comment' or 'table_definition'
    if (node.type !== 'table_definition') return;

    const table = node;
    const tableName = table.table_name;

    // add only if tableName not in viewData
    if (!Object.hasOwn(viewData, tableName)) {
      Object.defineProperty(viewData, tableName, { value: { columns: [], refs: [], referencedCols: [] }, enumerable: true });
    }

    // table_props passed to the Table
    const tableProps = table.table_props;

    tableProps.forEach((prop: any) => {
      viewData[tableName]['columns'].push({
        columnName: prop.prop_name.text,
        columnType: prop.prop_type.text,
        isReferring: prop.prop_reference.length !== 0,
      });

      if (prop.prop_reference.length !== 0) {
        const referencedTable = prop.prop_reference[0];
        const referencedTableName = referencedTable.referenced_table.text;
        const referencedTableCol = referencedTable.referenced_table_col.text;

        // push the referenced table name to the current table's ref array
        viewData[tableName]['refs'].push(referencedTableName);

        // push the referenced column name to the referenced table's referencedCols array
        // check first if the referenced table has already been parsed
        // if not, create a new record
        if (!Object.hasOwn(viewData, referencedTableName)) {
          Object.defineProperty(viewData, referencedTableName, { value: { columns: [], refs: [], referencedCols: [] }, enumerable: true });
        }
        viewData[referencedTableName]['referencedCols'].push(referencedTableCol);
      }
    });
  });

  return viewData;
};
