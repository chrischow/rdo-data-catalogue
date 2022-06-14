import $ from 'jquery';

// Configs
const apiUrl = 'http://127.0.0.1:5000/ravenpoint/_api/';

// Generic query
export function getListItems(listId, selectStr, filterStr, expandStr, callback) {
  const output = $.ajax({
    url: `${apiUrl}web/Lists(guid'${listId}')/items?` +
      `$select=${selectStr}` +
      `${filterStr ? '&$filter=' + filterStr : ''}` +
      `${expandStr ? '&$expand=' + expandStr : ''}`,
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