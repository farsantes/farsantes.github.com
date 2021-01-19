import { VueConstructor } from "vue";

// https://gist.github.com/ktsn/526ff676c5ce10d7de5c2ea4aebaea0a
export type VueInstance<T extends VueConstructor<any>> = T extends VueConstructor<infer R> ? R : never;

export type Props<T> = { readonly [K in keyof T]: () => T[K] };
