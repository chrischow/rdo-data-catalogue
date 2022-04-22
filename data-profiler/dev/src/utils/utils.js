export const checkCompleteness = (val) => {
  return (val == null || val == '') ? 0 : 1;
}

export const checkInt = (val) => {
  return (Number.isInteger(Number(val))) ? 1 : 0;
}

export const checkFloat = (val) => {
  return (Number(val) == val && Number(val) % 1 !== 0) ? 1 : 0;
}

export const checkColumnNaming = (val) => {
  let score = 0;
  
  // Starting char is not a letter
  var re = new RegExp('^[a-zA-Z]');
  if (re.test(val)) {
    score += 1;
  };

  // Only a-z, A-Z, 0-9, and underscores
  re = new RegExp('^[a-zA-Z0-9-_]+$');
  if (re.test(val)) {
    score += 1
  }
  
  return score;
}