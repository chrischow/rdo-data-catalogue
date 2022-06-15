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
          for (let i=0; i < expandedData.length; i++) {
            expandedData[i][`${column}_Id`] = expandedData[i][column].Id;
            expandedData[i][`${column}_Title`] = expandedData[i][column].Title;
            delete expandedData[i][column];
          }
        });
      }
      callback(expandedData);
    }
  });
  
  return output.value;
}