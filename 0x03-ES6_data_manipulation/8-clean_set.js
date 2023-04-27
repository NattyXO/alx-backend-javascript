export default function cleanSet(set, startString) {
  let str = '';
  for (const val of set) {
    if (val.startsWith(startString)) {
      str += val.slice(startString.length) + '-';
    }
  }
  return str.slice(0, -1);
}
