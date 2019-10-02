type Pick<T, U extends keyof T> = { [key in U]: T[U] };

export function pick<T, U extends keyof T>(source: T, keys: U[]): Pick<T, U> {
  return Object.fromEntries(Object.entries(source).filter(
    ([key]) => keys.includes(key as U)
  )) as Pick<T, U>;
}
