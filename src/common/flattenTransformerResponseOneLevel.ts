const flattenTransformerResponseOneLevel = <T>(value: T | Array<T>) => {
  return Array.isArray(value) ? value.flat() : (value as T);
};

export { flattenTransformerResponseOneLevel };
