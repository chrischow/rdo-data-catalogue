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

// Filter functions
export function filterDatasets(datasetArray, keywords){
  return datasetArray.filter(dataset => {
    return dataset.Title.toLowerCase().includes(keywords) || 
      (dataset && dataset.useCases.toLowerCase().includes(keywords))
  });
};

export function filterTables(tablesArray, keywords){
  return tablesArray.filter(table => {
    return table.Title.includes(keywords) ||
      (table.tableDescription && table.tableDescription.toLowerCase().includes(keywords)) ||
      (table.updateFrequency && table.updateFrequency.toLowerCase().includes(keywords))
  });
};

export function filterColumns(columnsArray, keywords){
  return columnsArray.filter(column => {
    return column.Title.toLowerCase().includes(keywords) ||
      (column.columnDescription && column.columnDescription.toLowerCase().includes(keywords)) ||
      (column.dataType && column.dataType.toLowerCase().includes(keywords)) ||
      (column.businessRules && column.businessRules.toLowerCase().includes(keywords))
  });
};

export function filterTerms(termsArray, keywords){
  return termsArray.filter(term => {
    return term.Title.toLowerCase().includes(keywords) ||
      (term.definition && term.definition.toLowerCase().includes(keywords)) ||
      (term.businessRules && term.businessRules.toLowerCase().includes(keywords)) ||
      (term.Source && term.Source.toLowerCase().includes(keywords))
  });
};