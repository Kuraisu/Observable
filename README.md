# Observable

Simple observable pattern library.

## Examples

This module is really easy to use:

```typescript
import {createObservable} from '@kuraisu/observable';

const [onEvent, emitEvent] = createObservable();

onEvent.add((event) => { /* ... */ });

emitEvent('Hello there!');
```

### Observable in a class

Here is an example of a class that provides observables to it's consumers:

```typescript
import {
    createObservable,
    Emitter,
    Observable,
} from '@kuraisu/observable';

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
```

This class can be used like this:
```typescript
const collection = new Collection();

function onAddHandler(event: ItemAddEvent): void {
    // ...
}

function onRemoveHandler(event: ItemAddEvent): void {
    // ...
}

collection.onAdd.add(onAddHandler);
collection.onRemove.add(onRemoveHandler);

collection.add('abc');
// onAddHandler was called with { itemId: 'abc' } value

collection.add('def');
// onAddHandler was called with { itemId: 'def' } value

collection.remove('abc');
// onRemoveHandler was called with { itemId: 'abc' } value
```

