const replaceAll = (str, toReplace, replaceBy) => {
  const newStr = str.replace(toReplace, replaceBy);
  const regex = new RegExp(toReplace);
  if(regex.test(newStr)) return replaceAll(newStr, toReplace, replaceBy);
  return newStr;
}

exports.replaceAll = replaceAll;

const upperCaseFirst = string => {
  return string.charAt(0).toUpperCase() + string.substr(1);
}

exports.upperCaseFirst = upperCaseFirst;

const lowerCaseFirst = string => {
  return string.charAt(0).toLowerCase() + string.substr(1);
}

exports.lowerCaseFirst = lowerCaseFirst;
