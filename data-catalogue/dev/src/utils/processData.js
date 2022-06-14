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