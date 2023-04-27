export default function cleanSet(set, startString) {
  if (typeof startString !== 'string' || startString === '') {
    return '';
  }
  const strings = [];
  for (const item of set) {
    if (item.startsWith(startString)) {
      strings.push(item.slice(startString.length));
    }
  }
  return strings.join('-');
}

