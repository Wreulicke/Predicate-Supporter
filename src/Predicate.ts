export type predicate = (...args: any[]) => boolean

const AND = (...predicates: predicate[]) =>
  (...args: any[]) => predicates.every(predicate => predicate(...args));
const OR = (...predicates: predicate[]) =>
  (...args: any[]) => predicates.some(predicate => predicate(...args));

const NOT = (predicate: predicate) => (...args: any[]) => !predicate(...args);

const EVERY = AND;

const SOME = OR;

const ANY = OR;

const XOR = (p1: predicate, p2: predicate) => (...args: any[]) => p1(...args) && !p2(...args) || !p1(...args) && p2(...args);

export type ChainablePredicateProducer=(predicate: predicate) => ChainablePredicate & predicate;

export interface ChainablePredicate {
  AND: ChainablePredicateProducer;
   OR: ChainablePredicateProducer;
  XOR: ChainablePredicateProducer;
  NOT: ChainablePredicateProducer;
}

let Predicate: ChainablePredicateProducer = function(predicate: predicate) {
  function IPredicate(...args: any[]){
    return predicate(...args);
  }

  Object.defineProperty(IPredicate, 'AND', {
    value: function(...predicates: predicate[]) {
      return Predicate(AND(IPredicate, ...predicates));
    }
  });

  Object.defineProperty(IPredicate, 'OR', {
    value: function(...predicates: predicate[]) {
      return Predicate(OR(IPredicate, ...predicates));
    }
  });

  Object.defineProperty(IPredicate, 'NOT', {
    value: function() {
      return Predicate(NOT(IPredicate));
    }
  });

  Object.defineProperty(IPredicate, 'XOR', {
    value: function(predicate: predicate) {
      return Predicate(XOR(IPredicate, predicate));
    }
  });

  return <ChainablePredicate & predicate> IPredicate;
};

export {
  AND,
  OR,
  NOT,
  XOR,
  EVERY,
  SOME,
  ANY,
  Predicate
};
