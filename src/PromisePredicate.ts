
export type PromisePredicate = ((...args: any[]) => Promise<boolean>)|((...args: any[]) => boolean)

const promisePredicate = (predicate: PromisePredicate) => {
  return function(...args: any[]){
    const result = predicate(...args);
    return typeof result === 'boolean' ?
      new Promise((resolve: any, reject: any) => result ? resolve(args) : reject(args))
      : new Promise((resolve: any, reject: any) => result.then((flag: boolean) => flag ? resolve(args) : reject(args), () => reject(args)));
  };
};

const AND = (first: PromisePredicate, ...predicates: PromisePredicate[]) =>
  (...args: any[]) => predicates.reduce((result, predicate) => result.then(() => promisePredicate(predicate)(...args)), promisePredicate(first)(...args));

const OR = (first: PromisePredicate, ...predicates: PromisePredicate[]) =>
  (...args: any[]) => predicates.reduce((result, predicate) => result.catch(() => promisePredicate(predicate)(...args)), promisePredicate(first)(...args));

const NOT = (predicate: PromisePredicate) => (...args: any[]) =>
  new Promise((resolve: any, reject: any) => promisePredicate(predicate)(...args).then(() => reject(args), () => resolve(args)));

const XOR = (p1: PromisePredicate, p2: PromisePredicate) => (...args: any[]) => OR(AND(p1, NOT(p2)), AND(NOT(p1), p2))(...args);

export type ChainablePromisePredicateProducer= (predicate: PromisePredicate) => ChainablePromisePredicate & PromisePredicate;

export interface ChainablePromisePredicate {
  AND: ChainablePromisePredicateProducer;
   OR: ChainablePromisePredicateProducer;
  XOR: ChainablePromisePredicateProducer;
  NOT: ChainablePromisePredicateProducer;
}


let Predicte: ChainablePromisePredicateProducer = function(predicate: PromisePredicate){
  const IPredicate = promisePredicate(predicate);

  Object.defineProperty(IPredicate, 'AND', {
    value: function(...predicates: PromisePredicate[] ){
      return Predicte(AND(IPredicate, ...predicates));
    }
  });

  Object.defineProperty(IPredicate, 'OR', {
    value: function(...predicates: PromisePredicate[] ){
      return Predicte(OR(IPredicate, ...predicates));
    }
  });

  Object.defineProperty(IPredicate, 'NOT', {
    value: function(){
      return Predicte(NOT(IPredicate));
    }
  });

  Object.defineProperty(IPredicate, 'XOR', {
    value: function (predicate: PromisePredicate) {
      return Predicte(XOR(IPredicate, predicate));
    }
  });

  return <ChainablePromisePredicate&PromisePredicate> IPredicate;
};

export {
  AND,
  OR,
  NOT,
  XOR,
  Predicte
};
