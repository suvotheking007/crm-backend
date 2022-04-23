exports.removeObjectField = (arr, filter) => {
  return arr.map((el) => {
    return filter(el);
  });
};
