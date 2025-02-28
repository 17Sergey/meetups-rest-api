export function omitObjectKeys<
  T extends Record<string, any>,
  K extends keyof T,
>(obj: T, keysToOmit: K[]) {
  let accum = {} as { [K in keyof typeof obj]: (typeof obj)[K] };

  return Object.keys(obj).reduce((acc, key) => {
    if (!keysToOmit.includes(key as K)) {
      acc[key as K] = obj[key];
    }
    return acc;
  }, accum);
}
