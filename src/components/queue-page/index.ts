import { IQueue } from "../../types/queue";

export class Queue<T> implements IQueue<T> {
    private container: (T | undefined)[];
    private head = 0;
    private tail = 0;
    private length = 0;
  
    constructor(private readonly size: number) {
      this.container = Array(size);
    }
  
    private isFull(): boolean {
      return this.length >= this.size;
    }
  
    enqueue(item: T): void {
      if (this.isFull()) {
        console.error("Maximum length exceeded");
        return;
      }
      this.container[this.tail % this.size] = item;
      this.tail++;
      this.length++;
    }
  
    dequeue(): void {
      if (this.isEmpty()) {
        console.error("No elements in the queue");
        return;
      }
      this.container[this.head % this.size] = undefined;
      this.length--;
      this.head++;
    }
  
    isEmpty(): boolean {
      return this.length === 0;
    }
  
    clear(): void {
      this.head = 0;
      this.tail = 0;
      this.length = 0;
      this.container = Array(this.size);
    }
  
    getHead(): number {
      return this.head;
    }
  
    getTail(): number {
      return this.tail;
    }
  
    getSize(): number {
      return this.size;
    }
  
    getQueue(): Array<T | undefined> {
      return [...this.container];
    }
  
    getLength(): number {
      return this.length;
    }
  }
  