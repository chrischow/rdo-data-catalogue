import $ from 'jquery';
import { config } from '../config';

// Configs
const apiUrl = config.apiUrl;

// Generic query
export function getListItems(listId, selectStr, filterStr, expandStr, callback) {
  const output = $.ajax({
    url: `${apiUrl}web/Lists(guid'${listId}')/items?` +
      `$select=${selectStr}` +
      `${expandStr ? '&$expand=' + expandStr : ''}` +
      `${filterStr ? '&$filter=' + filterStr : ''}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json; odata=nometadata'
    },
    async: true,
    success: data => {
      const expandedData = [...data.value];
      const expandColumns = expandStr.split(',');
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
      callback(expandedData);
    }
  });
  
  return output.value;
}