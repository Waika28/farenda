export function replaceItemByIndex(arr, index, newItem) {
  if (index < 0 || index >= arr.length) {
    return arr;
  }

  const newArr = [...arr];

  newArr[index] = newItem;

  return newArr;
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp.seconds * 1000)
  return date.toLocaleString()
}
