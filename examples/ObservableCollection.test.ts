import { Collection } from './ObservableCollection';

describe('Collection', () => {
    it('can add and remove elements', () => {
        const collection = new Collection();
        expect(collection.allItems()).toEqual([]);

        collection.add('abc');
        expect(collection.allItems()).toEqual(['abc']);

        collection.add('def');
        expect(collection.allItems()).toEqual(['abc', 'def']);

        collection.add('ghi');
        expect(collection.allItems()).toEqual(['abc', 'def', 'ghi']);

        collection.remove('def');
        expect(collection.allItems()).toEqual(['abc', 'ghi']);
    });

    it('will send onAdd and onRemove events', () => {
        const collection = new Collection();
        expect(collection.allItems()).toEqual([]);

        const onAddHandler = jest.fn();
        const onRemoveHandler = jest.fn();

        collection.onAdd.add(onAddHandler);
        collection.onRemove.add(onRemoveHandler);

        collection.add('abc');
        expect(onAddHandler.mock.calls.length).toBe(1);
        expect(onAddHandler.mock.calls[0][0]).toEqual({itemId: 'abc'});

        collection.add('def');
        expect(onAddHandler.mock.calls.length).toBe(2);
        expect(onAddHandler.mock.calls[1][0]).toEqual({itemId: 'def'});

        collection.remove('abc');
        expect(onRemoveHandler.mock.calls.length).toBe(1);
        expect(onRemoveHandler.mock.calls[0][0]).toEqual({itemId: 'abc'});
    });
});
