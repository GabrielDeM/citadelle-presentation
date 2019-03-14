exports.isValidJson = string => {
  if (/^[\],:{}\s]*$/.test(string
    .replace(/\\["\\\/bfnrtu]/g, '@')
    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
    .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

    return true
  }
  return false
}
