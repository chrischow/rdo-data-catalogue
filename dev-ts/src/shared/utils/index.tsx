import axios from 'axios';
import { config } from '../../config';

// Interfaces
export interface DatasetSchema {
  Id: number;
  Title: string;
  useCases: string;
  owner: string;
  pointOfContact: string;
  dataDomain: string;
  nTables?: number;
}

export interface TableSchema {
  Id: number;
  Title: string;
  tableDescription: string;
  updateFrequency: string;
  site: string;
  guid0: string;
  parentDataset_Id: number;
  parentDataset_Title: string;
}

export interface ColumnSchema {
  Id: number;
  Title: string;
  columnDescription: string;
  dataType: string;
  businessRules: string;
  isPrimaryKey: number;
  isForeignKey: number;
  codeTable: string;
  relatedFactTable: string;
  parentTable_Id: number;
  parentTable_Title: string;
  businessTerm: BusinessTermSchema[]
}

export interface BusinessTermSchema {
  Id: number;
  Title: string;
  definition: string;
  businessRules: string;
  Source: string;
}

export function constructUrl(listId: string, selectStr: string, expandStr?: string, filterStr?: string): string {
  return `${config.apiUrl}web/Lists(guid'${listId}')/items?` +
    `$select=${selectStr}` +
    `${expandStr ? '&$expand=' + expandStr : ''}` +
    `${filterStr ? '&$filter=' + filterStr : ''}`;
}

export function constructQueryFn(url: string) {
  return async () => {
    const { data } = await axios.get(url, {
      headers: {
        'Accept': 'application/json; odata=nometadata'
      }
    });
    return data.value;
  };
}

// Filter functions
export function filterDatasets(datasetArray: DatasetSchema[], keywords: string) {
  return datasetArray.filter((dataset: DatasetSchema) => {
    return dataset.Title.toLowerCase().includes(keywords) ||
      (dataset && dataset.useCases.toLowerCase().includes(keywords))
  });
};

export function filterTables(tablesArray: TableSchema[], keywords: string) {
  return tablesArray.filter((table: TableSchema) => {
    return table.Title.includes(keywords) ||
      (table.tableDescription && table.tableDescription.toLowerCase().includes(keywords)) ||
      (table.updateFrequency && table.updateFrequency.toLowerCase().includes(keywords))
  });
};

export function filterColumns(columnsArray: ColumnSchema[], keywords: string) {
  return columnsArray.filter((column: ColumnSchema) => {
    return column.Title.toLowerCase().includes(keywords) ||
      (column.columnDescription && column.columnDescription.toLowerCase().includes(keywords)) ||
      (column.dataType && column.dataType.toLowerCase().includes(keywords)) ||
      (column.businessRules && column.businessRules.toLowerCase().includes(keywords))
  });
};

export function filterTerms(termsArray: BusinessTermSchema[], keywords: string) {
  return termsArray.filter((term: BusinessTermSchema) => {
    return term.Title.toLowerCase().includes(keywords) ||
      (term.definition && term.definition.toLowerCase().includes(keywords)) ||
      (term.businessRules && term.businessRules.toLowerCase().includes(keywords)) ||
      (term.Source && term.Source.toLowerCase().includes(keywords))
  });
};