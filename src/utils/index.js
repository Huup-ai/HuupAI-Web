export const flattenObject = (ob) => {
  const result = {};

  for (const i in ob) {
    if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
      const temp = flattenObject(ob[i]);
      for (const j in temp) {
        result[i + "_" + j] = temp[j];
      }
    } else {
      result[i] = ob[i];
    }
  }

  return result;
};
