export type Observer<EventData> = (eventData: EventData) => void;

export interface Observable<EventData> {
    add(observer: Observer<EventData>): void;
    remove(observer: Observer<EventData>): void;
}

export type Emitter<EventData> = (eventData: EventData) => void;

export function createObservable<EventData>(): [Observable<EventData>, Emitter<EventData>] {
    const observers: Set<Observer<EventData>> = new Set();

    return [
        {
            add(observer: Observer<EventData>): void {
                observers.add(observer);
            },
            remove(observer: Observer<EventData>): void {
                observers.delete(observer);
            },
        },
        (eventData: EventData) => observers.forEach((observer) => observer(eventData)),
    ];
}

// Observable that will never be called. Can be used for stubs
export const voidObservable = createObservable<any>()[0];
