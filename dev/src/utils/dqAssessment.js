export const checkCompleteness = (val) => {
  return (val == null || val === '') ? 0 : 1;
};

export const checkInt = (val) => {
  return (Number.isInteger(Number(val))) ? 1 : 0;
};

export const checkFloat = (val) => {
  return (Number(val) == val && Number(val) % 1 !== 0) 
    ? 1 
    : checkInt(val);
};

export const checkDate = (val) => {
  const date = Date.parse(val);
  return isNaN(date) ? 0 : 1;
};

export const checkBool = (val) => {
  return (typeof val === 'boolean' || val === 'true' || val ==='false') ? 1 : 0;
};

export const checkString = (val) => {
  const others = checkBool(val) + checkDate(val) + checkFloat(val) + checkInt(val);
  return others > 0 ? 0 : 1;
};

export const checkColumnNaming = (val) => {
  let score = 0;
  
  // Starting char is a letter
  var re = new RegExp('^[a-zA-Z]');
  if (re.test(val)) {
    score += 1;
  };

  // Only a-z, A-Z, 0-9, and underscores
  re = new RegExp('^[a-zA-Z0-9_]+$');
  if (re.test(val)) {
    score += 1
  }

  return score;
};



// Data Quality Rules
export const greaterThanOrEqualTo = (data, val) => {
  const score = data.reduce((a, b) => {
    return a + (Number(b) >= Number(val) ? 1 : 0);
  }, 0) / data.length * 100;

  return score;
};

export const lessThanOrEqualTo = (data, val) => {
  const score = data.reduce((a, b) => {
    return a + (Number(b) <= Number(val) ? 1 : 0);
  }, 0) / data.length * 100;

  return score;
};

export const between = (data, val1, val2) => {
  const score = data.reduce( (a,b) => {
    return a + (Number(b) >= Number(val1) && Number(b) <= Number(val2) ? 1 : 0);
  }, 0 ) / data.length * 100;

  return score;
};

export const contains = (data, val) => {
  var score;
  if (val.includes(';')) {
    var arrStr = val.replace('; ', ';');
    arrStr = arrStr.replace(' ;', ';');
    let arr = arrStr.split(';');
    arr = arr.filter(elem => elem !== null && elem !== '');
    score = data.reduce( (a,b) => {
      return a + (arr.includes(b) ? 1 : 0);
    }, 0 ) / data.length * 100;
  } else {
    score = data.reduce( (a,b) => {
      return a + (b == val ? 1 : 0);
    }, 0 ) / data.length * 100;
  }
  return score
};

export const doesNotContain = (data, val) => {
  var score;
  if (val.includes(';')) {
    var arrStr = val.replace('; ', ';');
    arrStr = arrStr.replace(' ;', ';');
    const arr = arrStr.split(';');
    score = data.reduce( (a,b) => {
      return a + (!arr.includes(b) ? 1 : 0);
    }, 0 ) / data.length * 100;
  } else {
    score = data.reduce( (a,b) => {
      return a + (b == val ? 0 : 1);
    }, 0 ) / data.length * 100;
  }
  return score
};

export const equalTo = (data, val) => {
  const score = data.reduce( (a,b) => {
    return a + (b == val ? 1 : 0);
  }, 0 ) / data.length * 100;

  return score;
};

export const notEqualTo = (data, val) => {
  const score = data.reduce( (a,b) => {
    return a + (b != val ? 1 : 0);
  }, 0 ) / data.length * 100;

  return score;
};

export const dqRules = {
  greaterThanOrEqualTo,
  lessThanOrEqualTo,
  between,
  contains,
  doesNotContain,
  equalTo,
  notEqualTo
};