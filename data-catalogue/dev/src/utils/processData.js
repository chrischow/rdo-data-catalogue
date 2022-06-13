// Callback to process tables w/ domains
export function processMetadata(tables, metadataCallback, tableCallback) {
  if (tables.length == 0) {
    return
  }
  const newMetadata = {}
  let currentDataset;
  for (let i=0; i < tables.length; i++) {
    currentDataset = tables[i].datasetTitle;
    if (currentDataset in newMetadata) {
      newMetadata[currentDataset].nTables ++;
    } else {
      newMetadata[currentDataset] = {
        datasetId: tables[i].datasetId,
        datasetTitle: tables[i].datasetTitle,
        useCases: tables[i].datasetUseCases,
        owner: tables[i].datasetOwner,
        pointOfContact: tables[i].datasetPoc,
        dataDomain: tables[i].dataDomain,
        nTables: 1
      }
    }
  }
  metadataCallback(newMetadata);
  if (tableCallback) {
    tableCallback(tables);
  }
};