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

// Join functions
export function leftJoin(left, right, left_on, right_on) {
  const data = left.map(leftRow => ({
    ...right.find(rightRow => leftRow[left_on] === rightRow[right_on]),
    ...leftRow
  }));
  return data;
}

export function innerJoin(left, right, left_on, right_on) {
  // Get matching keys
  const leftFk = left.map(row => row[left_on]);
  const rightPk = right.map(row => row[right_on]);
  const commonKeys = leftFk.filter(value => rightPk.includes(value));

  const leftFiltered = left.filter(row => commonKeys.includes(row[left_on]));
  let output = [];

  leftFiltered.forEach(leftRow => {
    right.forEach(rightRow => {
      if (leftRow[left_on] === rightRow[right_on]) {
        output.push({
          ...rightRow,
          ...leftRow
        });
      }
    });
  });

  return output;
}