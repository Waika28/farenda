export function replaceItemByIndex(arr, index, newItem) {
  if (index < 0 || index >= arr.length) {
    return arr;
  }

  const newArr = [...arr];

  newArr[index] = newItem;

  return newArr;
}
