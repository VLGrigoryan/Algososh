export interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): void;
    clear(): void;
    getHead(): number;
    getTail(): number;
    getSize(): number;
    getQueue(): Array<T | undefined>;
    getLength(): number;
    isEmpty(): boolean;
  }
  