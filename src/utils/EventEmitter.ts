// Add type safety
type EventMap = {
  [key: string]: any[];
};

type EventKey<T extends EventMap> = keyof T & string;
type EventReceiver<T extends any[]> = (...args: T) => void;

export class EventEmitter<T extends EventMap> {
  private listeners = new Map<keyof T, Set<EventReceiver<any>>>();

  on<K extends EventKey<T>>(event: K, listener: EventReceiver<T[K]>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    
    const eventListeners = this.listeners.get(event)!;
    eventListeners.add(listener as EventReceiver<any>);
    
    return () => {
      this.off(event, listener);
    };
  }

  off<K extends EventKey<T>>(event: K, listener: EventReceiver<T[K]>): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(listener as EventReceiver<any>);
    }
  }

  emit<K extends EventKey<T>>(event: K, ...args: T[K]): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((listener) => {
        listener(...args);
      });
    }
  }
} 