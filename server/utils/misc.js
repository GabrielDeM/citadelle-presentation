exports.inArray = (needle, haystack, objectPath = null) => {
  var length = haystack.length;
  for (var i = 0; i < length; i++) {
      if(objectPath) {
          if(haystack[i][objectPath] == needle) return haystack[i];
      } else {
          if(haystack[i] == needle) return true;
      }
  }
  return false;
}


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
