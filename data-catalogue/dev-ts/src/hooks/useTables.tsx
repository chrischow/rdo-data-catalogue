import { useQuery } from "react-query";
import { config } from "../config";
import { constructUrl, constructQueryFn, TableSchema } from "../utils/utils";

// Get all tables
/**
 * 
 * @returns Array of table objects
 */
export const useTables = () => {
  const url: string = constructUrl(
    config.tableListId,
    'Id,Title,tableDescription,updateFrequency,site,guid0,parentDataset/Id,parentDataset/Title',
    'parentDataset',
    ''
  );
  
  return useQuery(['tables'], constructQueryFn(url), {
    onSuccess: (data: any) => {
      const expandedData = [...data];
      if (!(expandedData[0]['parentDataset'] instanceof Array)) {
        for (const element of expandedData) {
          element['parentDataset_Id'] = element['parentDataset'].Id;
          element['parentDataset_Title'] = element['parentDataset'].Title;
          delete element['parentDataset'];
        }
        return expandedData;
      }
      return data;
    },
    staleTime: 2 * 60 * 1000
  });
}

export const useTable = (tableId: number) => {
  const allTables = useTables();
  return allTables.isSuccess ? allTables.data.find((table: TableSchema) => {
    return table.Id === tableId;
  }) : null;
};

export const useTableByDataset = (datasetId: number) => {
  const allTables = useTables();
  const tables: TableSchema[] = allTables.isSuccess ? allTables.data.filter((table: TableSchema) => {
    return table.parentDataset_Id === datasetId;
  }) : [];
  return {tables: tables, tablesIsSuccess: allTables.isSuccess}
}