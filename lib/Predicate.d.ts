export declare type predicate = (...args: any[]) => boolean;
declare const AND: (...predicates: ((...args: any[]) => boolean)[]) => (...args: any[]) => boolean;
declare const OR: (...predicates: ((...args: any[]) => boolean)[]) => (...args: any[]) => boolean;
declare const NOT: (predicate: (...args: any[]) => boolean) => (...args: any[]) => boolean;
declare const EVERY: (...predicates: ((...args: any[]) => boolean)[]) => (...args: any[]) => boolean;
declare const SOME: (...predicates: ((...args: any[]) => boolean)[]) => (...args: any[]) => boolean;
declare const ANY: (...predicates: ((...args: any[]) => boolean)[]) => (...args: any[]) => boolean;
declare const XOR: (p1: (...args: any[]) => boolean, p2: (...args: any[]) => boolean) => (...args: any[]) => boolean;
export declare type ChainablePredicateProducer = (predicate: predicate) => ChainablePredicate & predicate;
export interface ChainablePredicate {
    AND: ChainablePredicateProducer;
    OR: ChainablePredicateProducer;
    XOR: ChainablePredicateProducer;
    NOT: ChainablePredicateProducer;
}
declare let Predicate: ChainablePredicateProducer;
export { AND, OR, NOT, XOR, EVERY, SOME, ANY, Predicate };
