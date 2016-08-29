function promisify<T>(item: Promise<T> | T) {
  if (item instanceof Promise)return item;
  return Promise.resolve(item);
}

const pipe = Function.prototype.call.bind(Promise.prototype.then);

export function flow<T, R>(item: T, ...funcs: any[]) {
  return <Promise<R>>funcs.reduce(pipe, promisify(item));
}