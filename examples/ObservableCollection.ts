import {
    createObservable,
    Emitter,
    Observable,
} from '../src/Observable';

export interface ItemEvent {
    itemId: string;
}

export class Collection {
    onAdd: Observable<ItemEvent>;
    private emitAdd: Emitter<ItemEvent>;

    onRemove: Observable<ItemEvent>;
    private emitRemove: Emitter<ItemEvent>;

    private items: string[] = [];

    constructor() {
        [this.onAdd, this.emitAdd] = createObservable();
        [this.onRemove, this.emitRemove] = createObservable();
    }

    add(itemId: string): void {
        this.items.push(itemId);

        this.emitAdd({ itemId })
    }

    remove(itemId: string): void {
        const index = this.items.indexOf(itemId);

        if (index === -1) {
            return;
        }

        this.items.splice(index, 1);

        this.emitRemove({ itemId })
    }

    allItems(): string[] {
        return this.items;
    }
}
