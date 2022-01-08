module.exports = () => {
  var dateObj = new Date();
  return `${dateObj.getUTCFullYear()}-${dateObj.getUTCMonth() + 1}-${dateObj.getUTCDate()}_${dateObj.getUTCHours()}_${dateObj.getUTCMinutes()}_${dateObj.getUTCSeconds()}_${(new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)}`;
}