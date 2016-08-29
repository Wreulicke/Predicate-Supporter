export declare type PromisePredicate = ((...args: any[]) => Promise<boolean>) | ((...args: any[]) => boolean);
declare const AND: (first: ((...args: any[]) => Promise<boolean>) | ((...args: any[]) => boolean), ...predicates: (((...args: any[]) => Promise<boolean>) | ((...args: any[]) => boolean))[]) => (...args: any[]) => Promise<{}>;
declare const OR: (first: ((...args: any[]) => Promise<boolean>) | ((...args: any[]) => boolean), ...predicates: (((...args: any[]) => Promise<boolean>) | ((...args: any[]) => boolean))[]) => (...args: any[]) => Promise<{}>;
declare const NOT: (predicate: ((...args: any[]) => Promise<boolean>) | ((...args: any[]) => boolean)) => (...args: any[]) => Promise<{}>;
declare const XOR: (p1: ((...args: any[]) => Promise<boolean>) | ((...args: any[]) => boolean), p2: ((...args: any[]) => Promise<boolean>) | ((...args: any[]) => boolean)) => (...args: any[]) => Promise<{}>;
export declare type ChainablePromisePredicateProducer = (predicate: PromisePredicate) => ChainablePromisePredicate & PromisePredicate;
export interface ChainablePromisePredicate {
    AND: ChainablePromisePredicateProducer;
    OR: ChainablePromisePredicateProducer;
    XOR: ChainablePromisePredicateProducer;
    NOT: ChainablePromisePredicateProducer;
}
declare let Predicte: ChainablePromisePredicateProducer;
export { AND, OR, NOT, XOR, Predicte };
