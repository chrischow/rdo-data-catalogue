import $ from 'jquery';

// Configs
const apiUrl = 'http://127.0.0.1:5000/ravenpoint/_api/';

// READ
export function getDatasets(listId, dataDomain, callback) {

  let queryFilter = '';

  if (dataDomain) {
    queryFilter = `&$filter=dataDomain eq '${dataDomain}'`;
  }

  $.ajax({
    url: `${apiUrl}web/Lists(guid'${listId}')/items?$select=*${queryFilter}`,
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json; odata=nometadata'
    },
    async: true,
    success: (data) => {
      var rawData = data.value;
      rawData = rawData.map((entry) => {
        return {
          Id: entry.Id,
          datasetTitle: entry.datasetTitle,
          useCases: entry.useCases,
          owner: entry.owner,
          pointOfContact: entry.pointOfContact,
          dataDomain: entry.dataDomain
        };
      });

      callback(rawData);
    },
    error: (error) => console.log(JSON.stringify(error))
  });
}


// Get tables
export function getTablesByDomain(listId, dataDomain, callback) {
  const queryFilter = `&$filter=parentDatasetID/dataDomain eq '${dataDomain}'&$expand=parentDatasetID`;
  const lookup_columns = 'parentDatasetID/Id,parentDatasetID/datasetTitle,parentDatasetID/useCases,parentDatasetID/owner,parentDatasetID/pointOfContact,parentDatasetID/dataDomain'

  $.ajax({
    url: `${apiUrl}web/Lists(guid'${listId}')/items?$select=Id,tableTitle,${lookup_columns}${queryFilter}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json; odata=nometadata'
    },
    async: true,
    success: (data) => {
      var rawData = data.value;
      rawData = rawData.map((entry) => {
        return {
          Id: entry.Id,
          tableTitle: entry.tableTitle,
          datasetId: entry.parentDatasetID.Id,
          datasetTitle: entry.parentDatasetID.datasetTitle,
          datasetUseCases: entry.parentDatasetID.useCases,
          datasetOwner: entry.parentDatasetID.owner,
          datasetPoc: entry.parentDatasetID.pointOfContact,
          dataDomain: entry.parentDatasetID.dataDomain
        };
      });
      callback(rawData);
    }
  });
}

export function getTablesByDataset(listId, datasetId, callback) {
  const queryFilter = `&$filter=parentDatasetID/Id eq '${datasetId}'&$expand=parentDatasetID`;
  const lookup_columns = 'parentDatasetID/Id,parentDatasetID/datasetTitle,parentDatasetID/dataDomain,parentDatasetID/useCases,parentDatasetID/owner,parentDatasetID/pointOfContact'

  $.ajax({
    url: `${apiUrl}web/Lists(guid'${listId}')/items?$select=*,${lookup_columns}${queryFilter}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json; odata=nometadata'
    },
    async: true,
    success: (data) => {
      var rawData = data.value;
      rawData = rawData.map((entry) => {
        return {
          Id: entry.Id,
          tableTitle: entry.tableTitle,
          tableDescription: entry.tableDescription,
          site: entry.site,
          guid: entry.guid,
          updateFrequency: entry.updateFrequency,
          datasetId: entry.parentDatasetID.Id,
          datasetTitle: entry.parentDatasetID.datasetTitle,
          datasetUseCases: entry.parentDatasetID.useCases,
          datasetOwner: entry.parentDatasetID.owner,
          datasetPoc: entry.parentDatasetID.pointOfContact,
          dataDomain: entry.parentDatasetID.dataDomain
        };
      });
      callback(rawData);
    }
  });
}