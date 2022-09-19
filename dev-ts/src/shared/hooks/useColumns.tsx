import { useQuery } from "react-query";
import { config } from "../../config";
import { constructUrl, constructQueryFn, ColumnSchema } from "../utils";

// Get all columns
/**
 * 
 * @returns Array of column objects
 */
export const useColumns = () => {
  const url: string = constructUrl(
    config.columnListId,
    'Id,Title,columnDescription,dataType,businessRules,isPrimaryKey,isForeignKey,codeTable,relatedFactTable,parentTable/Id,parentTable/Title,businessTerm/Id,businessTerm/Title',
    'parentTable,businessTerm',
    ''
  );
  
  return useQuery(['columns'], constructQueryFn(url), {
    onSuccess: (data: any) => {
      const expandedData = [...data];
      const expandColumns = ['parentTable', 'businessTerm'];
      if (expandColumns[0]) {
        expandColumns.forEach(column => {
          // Elevate single lookup fields only
          if (!(expandedData[0][column] instanceof Array)) {
            for (const element of expandedData) {
              element[`${column}_Id`] = element[column].Id;
              element[`${column}_Title`] = element[column].Title;
              delete element[column];
            }
          }
        });
      }
      return data;
    },
    staleTime: 2 * 60 * 1000
  });
};

// Get columns by table
export const useColumnsByTable = (tableId: number) => {
  const allColumns = useColumns();
  const columns: ColumnSchema[] = allColumns.isSuccess ? allColumns.data.filter((col: ColumnSchema) => {
    return col.parentTable_Id === tableId;
  }) : [];
  return {columns: columns, columnsIsSuccess: allColumns.isSuccess}
};

// Get columns by business term ID
export const useColumnsByTerm = (termId: number) => {
  const {data, isSuccess: columnsIsSuccess} = useColumns();
  const columns: ColumnSchema[] = columnsIsSuccess ? data.filter((col: ColumnSchema) => {
    const terms = col['businessTerm'];
    for (const term of terms) {
      if (term.Id === termId) {
        return true;
      }
    }
    return false;
  }) : [];
  return {columns: columns, columnsIsSuccess: columnsIsSuccess};
};